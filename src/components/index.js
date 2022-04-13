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
import { useTitle } from "@vueuse/core";
import { sellTip } from "../utils/utils";

import { getAccountv2 as getAccountApi } from "../api/http";

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
} from "../api/server";

export default defineComponent({
  setup() {
    const drawerVisible = ref(false);
    const useForm = Form.useForm;
    const { t } = useI18n();
    const tronWeb = ref();
    const ownerAddress = ref();
    const formRef = ref();
    const activeKey = ref("1");
    const visible = ref(false);
    const soldVisible = ref(false);

    const spinning = ref(false);
    const currentType = ref();
    const config = ref({});
    const orderType = ref("a");

    const status = ref("home");

    const rent = ref({ platformSum: 0, sellerEarnings: 0 });

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
      visible.value = true;
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
        if (broastTx.result) return true;
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
      if (!tronWeb.value.isAddress(values.receiverAddress)) {
        message.warn(t("global.tronAddress"));
        return;
      }

      if (+needTrxCount.value > +accountResouce.value.balance) {
        message.warn(t("账户余额不足"));
        return;
      }
      try {
        spinning.value = true;
        const res = await transactionTrx(toSun(needTrxCount.value));
        if (res) {
          const formData = {
            ownerAddress: ownerAddress.value,
            receiverAddress: values.receiverAddress,
            commission: toSun(needTrxCount.value),
            frozenBalance: mathFloor(toSun(trxCount.value)),
            resource: values.resource,
            resourceValue: values.amount,
            unitPrice: values.unitPrice,
            duration: values.duration,
          };
          const ciphertext = AES.encrypt(
            JSON.stringify(formData),
            "TKnrLaQtu1MpmXvAKef66gRRCUKRD1vdMV"
          ).toString();
          const result = await freezeApi({
            data: ciphertext,
          });
          if (result.status === 200) {
            message.success(t("global.rent") + t("global.success"));
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
        visible.value = false;
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
      //此处需要调用查询订单接口确保数量
      try {
        spinning.value = true;
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
          const broastTx = await tronWeb.value.trx.sendRawTransaction(signedTx);
          if (broastTx.result) {
            // 出售后需要将收款地址和订单信息发送到后台给人家转钱
            await sellApi({
              _id: data._id,
              commission: data.aCommission,
              hash: broastTx.txid,
              ownerAddress: ownerAddress.value,
            });
            message.success(t("global.sell") + t("global.success"));
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
        spinning.value = false;
      }
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
      if (status.value === "date") {
        const { data } = await getOrderList({ status: 1, pageSize: 10 });
        tableData.value = data.results;
      } else {
        if (!ownerAddress.value) {
          message.warning("请链接你的钱包");
          return;
        }

        if (status.value === "myOrder") {
          const { data } = await getOrderList({
            receiverAddress: ownerAddress.value,
          });
          tableData.value = data.results;
        }
      }
    };

    // 计算需要用户支付多少TRX
    const needTrxCount = computed(() => {
      const res =
        +fromSun(formState.amount * formState.unitPrice * formState.duration) ||
        0;
      return res > 1 ? Math.ceil(res) : 1;
    });

    // 计算原价需要多少TRX
    const trxCount = computed(
      () => +(formState.amount / resourceCount()).toFixed(2)
    );

    // 节约
    const saveTrx = computed(() => {
      if (formState.resource === "ENERGY") {
        return +(
          (formState.amount / 100000) * 84 -
          formState.amount * (9 / 100000) * (formState.unitPrice / 30)
        ).toFixed(2);
      }
      return +(
        (3 * formState.amount) / 1000 -
        ((15 * formState.amount) / 10000) * (formState.unitPrice / 500)
      ).toFixed(2);
    });

    // 计算不同资源情况下用户能获得多少资源
    const resourceCount = () => {
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
    };

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
      await getAccount();
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
    };

    const undo = async (record) => {
      Modal.confirm({
        title: () => "确定撤销？",
        content: "此操作将扣除1TRX手续费",
        onOk: async () => {
          const res = await undoApi({ _id: record._id });
          message.info(res.message);
          orderTypeChange();
        },
      });
    };

    const mathFloor = (val = 0) => {
      return Math.floor(val / 1000000) * 1000000;
    };

    const changeStatus = (v) => {
      status.value = v;
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

    let timer = null;
    onMounted(() => {
      getConfig();
      getRentInfo();
      linkWallet();
      orderTypeChange();
      window.addEventListener("message", (e) => {
        if (e.data.message && e.data.message.action == "accountsChanged") {
          activeKey.value = "1";
          visible.value = false;
          soldVisible.value = false;
          linkWallet();
        }
      });
      useTitle(t("global.title"));
      timer = setInterval(() => {
        getAccount();
        orderTypeChange();
      }, 3 * 60 * 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    const uzipAddress = (str) => {
      if (!str) return "请链接钱包";
      return str.substr(0, 8) + "..." + str.substr(-4, 4);
    };

    const copyText = () => {
      message.info("敬请期待");
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
      activeKey,
      visible,
      formRef,
      submitFreeze,
      spinning,
      formState,
      validateInfos,
      config,
      saveTrx,
      submitSoldForm,
      soldVisible,
      needTrxCount,
      uzipAddress,
      linkWallet,
      rent,
      toLocaleString,
      currentType,
      orderType,
      orderTypeChange,
      undo,
      changeStatus,
      status,
    };
  },
});
