import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  onUnmounted,
  computed,
} from "vue";
import dayjs from "dayjs";
import { message, Form, Modal } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { AES } from "crypto-js";
import { useTitle, useMediaQuery, useClipboard } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";
import { sellTip, shardText } from "../utils/utils";

import { getAccountv2 as getAccountApi, searchAddress } from "../api/http";

import {
  freeze as freezeApi,
  getConfig as getConfigApi,
  getOrderList,
  sellApi,
  getOrderApi,
  undoApi,
  getOrderByIdWriting,
  getOrderByIdReWriting,
  getRentInfoApi,
  verifyRepeatApi,
  isBinding as isBindingApi,
  createBining,
} from "../api/server";

export default defineComponent({
  setup() {
    const drawerVisible = ref(false);
    const useForm = Form.useForm;
    const { t } = useI18n();
    const tronWeb = ref();
    const ownerAddress = ref();
    const formRef = ref();

    const isMobile = useMediaQuery("(max-width: 750px)");

    const spinning = ref(false);
    const currentType = ref();
    const config = ref({});

    const isBinding = ref(false);

    const router = useRouter();
    const route = useRoute();

    const status = ref("home");

    const rent = ref({ totalBandWidth: 0, totalEnergy: 0, totalTrx: 0 });

    // 账户资源
    const accountResouce = ref({});

    // 表单
    const formState = reactive({
      resource: "ENERGY",
      amount: 100000,
      duration: 3,
      unitPrice: 30,
      ownerAddress: undefined, // 代表当前地址或者自己的收款地址
      receiverAddress: undefined, // 代表需要接收资源的地址
    });

    // 表单规则
    const rulesRef = reactive({
      ownerAddress: [
        {
          required: true,
          message: t("tip.ownerAddress"),
        },
      ],
      receiverAddress: [
        {
          required: true,
          message: t("tip.receiverAddress"),
        },
      ],
      resource: [
        {
          required: true,
          message: t("tip.resource"),
        },
      ],
      amount: [
        {
          required: true,
          message: t("tip.amount"),
        },
      ],
      unitPrice: [
        {
          required: true,
          message: t("tip.unitPrice"),
        },
      ],
      duration: [
        {
          required: true,
          message: t("tip.duration"),
        },
      ],
    });

    // useForm
    const { resetFields, validate, validateInfos } = useForm(
      formState,
      rulesRef
    );

    // 表格数据
    const tableData = ref([]);

    // 打开租赁弹窗
    const leaseModal = () => {
      resetFields();
      formState.ownerAddress = ownerAddress.value;
      formState.receiverAddress = ownerAddress.value;
      getConfig();
    };

    // trx转账接口
    const transactionTrx = async (amount) => {
      try {
        const tx = await tronWeb.value.transactionBuilder.sendTrx(
          config.value.address,
          amount,
          ownerAddress.value
        );
        const signedTx = await tronWeb.value.trx.sign(tx);
        const broastTx = await tronWeb.value.trx.sendRawTransaction(signedTx);
        if (broastTx.result) return broastTx.txid;
        message.warning(broastTx.code);
        return false;
      } catch (error) {
        message.error(error);
        return false;
      }
    };

    // 提交租赁表单
    const submitFreeze = async () => {
      const values = await validate();
      console.log(values.receiverAddress);
      if (!tronWeb.value.isAddress(values.receiverAddress)) {
        message.warn(t("tip.tronAddress"));
        return;
      }

      const r = await searchAddress({ term: values.receiverAddress });
      if (r.length === 0) {
        message.warn(t("tip.activeAddress"));
        return;
      }

      if (+needTrxCount.value > +accountResouce.value.balance) {
        message.warn(t("账户余额不足"));
        return;
      }
      try {
        spinning.value = true;
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        const res = await transactionTrx(toSun(needTrxCount.value));
        if (res) {
          const formData = {
            ownerAddress: ownerAddress.value,
            receiverAddress: values.receiverAddress,
            commission: toSun(needTrxCount.value),
            frozenBalance: toSun(trxCount.value),
            resource: values.resource,
            resourceValue: values.amount,
            unitPrice: values.unitPrice,
            duration: values.duration,
            txid: res,
          };
          const ciphertext = AES.encrypt(
            JSON.stringify(formData),
            "tron-serve-aes"
          ).toString();
          const result = await freezeApi({
            data: ciphertext,
          });
          if (result.status === 200) {
            message.success(t("global.rent") + t("global.success"));
            window.location.reload();
          } else {
            message.warning(t("global.rent") + t("global.fail"));
          }
        } else {
          message.warning(t("global.rent") + t("global.fail"));
        }
      } catch (error) {
        message.warning(error || "冻结有误，请联系客服");
      } finally {
        getAccount();
        getRentInfo();
        spinning.value = false;
      }
    };

    // 提交出售表单
    const submitSoldForm = async (record) => {
      if (
        parseInt(record.frozenBalance) / 1000000 >
        accountResouce.value.balance
      ) {
        message.warning("账户余额不足");
        return;
      }

      const r = await verifyRepeatApi({
        resource: record.resource,
        sellerAddress: ownerAddress.value,
        receiverAddress: record.receiverAddress,
      });
      Modal.confirm({
        title: "确定出售？",
        content: r.message,
        onOk: async () => {
          try {
            spinning.value = true;
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            const { status } = await getOrderByIdWriting({
              _id: record._id,
            });
            if (status === 500) {
              message.warning("订单已被出售");
            } else {
              const { data } = await getOrderApi({ _id: record._id });
              if (data.status > 0) {
                message.warning("订单已被出售");
                return;
              }
              const signedTransaction =
                await tronWeb.value.transactionBuilder.freezeBalance(
                  data.frozenBalance,
                  3,
                  record.resource,
                  ownerAddress.value,
                  record.receiverAddress,
                  1
                );
              const signedTx = await tronWeb.value.trx.sign(signedTransaction);
              const broastTx = await tronWeb.value.trx.sendRawTransaction(
                signedTx
              );
              if (broastTx.result) {
                // 出售后需要将收款地址和订单信息发送到后台给人家转钱
                await sellApi({
                  _id: data._id,
                  commission: data.aCommission,
                  hash: broastTx.txid,
                  ownerAddress: ownerAddress.value,
                });
                message.success(t("global.sell") + t("global.success"));
                window.location.reload();
              } else {
                await getOrderByIdReWriting({ _id: record._id });
                message.warning(broastTx.code);
              }
            }
          } catch (error) {
            console.log(error);
            message.warning(error);
            await getOrderByIdReWriting({ _id: record._id });
          } finally {
            getAccount();
            getRentInfo();
            spinning.value = false;
          }
        },
      });
    };

    // 获取账户信息
    const getAccount = async () => {
      const res = await getAccountApi(ownerAddress.value);
      accountResouce.value = {
        ...res,
        frozenForEnergy: fromSun(res.frozenForEnergy),
        delegateFrozenForEnergy: fromSun(res.delegateFrozenForEnergy),
        frozenForBandWidth: fromSun(res.frozenForBandWidth),
        delegateFrozenForBandWidth: fromSun(res.delegateFrozenForBandWidth),
        totalFrozen: fromSun(res.totalFrozen), // 总的已质押
        balance: parseInt(fromSun(res.balance)), //可用trx
      };
    };

    // 获取平台详情
    const getRentInfo = async () => {
      const { data } = await getRentInfoApi();
      rent.value = data;
    };

    const orderTypeChange = async (v) => {
      tableData.value = [];
      if (status.value === "home") {
        const { data } = await getOrderList({
          status: 0,
          orderType: 0,
          currentType: currentType.value,
        });
        tableData.value = data.results;
        return;
      }
    };

    // 计算需要用户支付多少TRX
    const needTrxCount = computed(() => {
      let res = 0;
      if (formState.resource === "ENERGY") {
        res = +(
          (formState.amount / 100000) *
          (formState.unitPrice / 30) *
          9
        ).toFixed(2);
      } else {
        res = +(
          (formState.amount / 10000) *
          (formState.unitPrice / 500) *
          15
        ).toFixed(2);
      }
      return res > 1 ? res : 1;
    });

    // 计算原价需要多少TRX
    const trxCount = computed(
      () => +(formState.amount / resourceCount.value).toFixed(2)
    );

    // 节约
    const saveTrx = computed(() => {
      let res = 0;
      if (formState.resource === "ENERGY") {
        res = +(
          (formState.amount / 100000) * 84 -
          formState.amount * (9 / 100000) * (formState.unitPrice / 30)
        ).toFixed(2);
      } else {
        res = +(
          formState.amount * (3 / 1000) -
          formState.amount * (15 / 10000) * (formState.unitPrice / 500)
        ).toFixed(2);
      }
      return res > 1 ? res : 0;
    });

    // 计算不同资源情况下用户能获得多少资源
    const resourceCount = computed(() => {
      if (formState.resource === "ENERGY") {
        return +(
          accountResouce.value.bandwidth?.totalEnergyLimit /
          accountResouce.value.bandwidth?.totalEnergyWeight
        ).toFixed(2);
      }
      return +(
        accountResouce.value.bandwidth?.totalNetLimit /
        accountResouce.value.bandwidth?.totalNetWeight
      ).toFixed(2);
    });

    // 将sun转换成trx单位
    const fromSun = (val) => (val ? val / 1000000 : 0);

    // 将trx转换成sun单位
    const toSun = (val) => val * 1000000;

    // 将时间戳转换
    const timeFormat = (timestamp) =>
      dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");

    // 千分位
    const toLocaleString = (val) => val.toLocaleString();

    // 链接钱包
    const linkWallet = async () => {
      if (!window.tronWeb) {
        message.warning(t("tip.tip5"));
        return;
      }
      tronWeb.value = window.tronWeb;
      ownerAddress.value = window.tronWeb.defaultAddress.base58;
      formState.ownerAddress = ownerAddress.value;
      formState.receiverAddress = ownerAddress.value;
      window.sessionStorage.setItem("ownerAddress", ownerAddress.value);
      await getAccount();
      await isBindingFun(ownerAddress.value);
    };

    const isBindingFun = async (recommendedAddress) => {
      if (route.query.address) {
        const recommenderAddress = route.query.address;
        if (recommendedAddress === recommenderAddress) return;
        const isAddress = tronWeb.value.isAddress(recommenderAddress);
        if (isAddress) {
          const r = await searchAddress({ term: recommenderAddress });
          if (r.length === 0) {
            return;
          }
          const { data = false } = await isBindingApi({
            recommenderAddress,
            recommendedAddress,
          });
          isBinding.value = data;
          if (!data) {
            const res = await createBining({
              recommenderAddress,
              recommendedAddress,
            });
            console.log(res);
          }
        }
      }
    };

    const lang = computed(() => {
      return localStorage.getItem("language") || "zh";
    });

    const changeLang = (type) => {
      localStorage.setItem("language", type);
      location.reload();
    };

    // 获取配置
    const getConfig = async () => {
      const { data } = await getConfigApi();
      config.value = { ...data.config, address: data.address };
      window.sessionStorage.setItem("c", data.address);
      formState.amount = config.value.minEnergyNumber;
      formState.unitPrice = config.value.energyPrice;
    };

    const undo = async (record) => {
      Modal.confirm({
        title: () => "确定撤销？",
        content: "此操作将扣除1TRX手续费",
        onOk: async () => {
          const res = await undoApi({ _id: record._id });
          message.info(res.message);
          orderTypeChange();
          window.location.reload();
        },
      });
    };

    const mathFloor = (val = 0) => {
      return Math.floor(val / 1000000) * 1000000;
    };

    const changeStatus = (v) => {
      status.value = v;
      router.push(v);
      drawerVisible.value = false;
      orderTypeChange();
    };

    watch(
      () => formState.resource,
      (val) => {
        if (val === "ENERGY") {
          formState.amount = config.value.minEnergyNumber;
          formState.unitPrice = config.value.energyPrice;
        } else {
          formState.amount = config.value.minBandwidthNumber;
          formState.unitPrice = config.value.bandwidthPrice;
        }
      }
    );

    watch(
      () => route.path,
      (v) => {
        status.value = v.replace("/", "");
      }
    );

    let timer = null;
    onMounted(() => {
      status.value = route.path.replace("/", "");
      getConfig();
      getRentInfo();
      linkWallet();
      orderTypeChange();
      window.addEventListener("message", (e) => {
        if (e.data.message && e.data.message.action == "accountsChanged") {
          linkWallet();
        }
      });
      useTitle(t("global.title"));
      timer = setInterval(() => {
        getAccount();
        orderTypeChange();
      }, 2 * 60 * 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    const uzipAddress = (str) => {
      if (!str) return "请链接钱包";
      return str.substr(0, 8) + "..." + str.substr(-4, 4);
    };

    const copyText = () => {
      const { copy } = useClipboard({
        source: shardText(ownerAddress.value),
      });
      copy();
      message.info("复制成功，快去分享吧");
    };

    return {
      drawerVisible,
      copyText,
      changeLang,
      leaseModal,
      sellTip,
      tableData,
      accountResouce,
      ownerAddress,
      lang,
      formRef,
      submitFreeze,
      spinning,
      formState,
      validateInfos,
      config,
      saveTrx,
      submitSoldForm,
      needTrxCount,
      trxCount,
      uzipAddress,
      linkWallet,
      getConfig,
      getRentInfo,
      rent,
      toLocaleString,
      currentType,
      orderTypeChange,
      undo,
      changeStatus,
      status,
      t,
      isMobile,
    };
  },
});
