<template>
  <a-layout>
    <a-spin :spinning="spinning" tip="交易进行中，请稍后">
      <Header @change="linkWallet" />
      <a-layout-content class="layout">
        <TopCard
          :accountResouce="accountResouce"
          :ownerAddress="ownerAddress"
          :isMobile="isMobile"
        />

        <a-card class="card-box" size="small" v-if="isMobile">
          <div class="flex-wrap">
            <a-select
              style="width: 90px"
              v-model:value="lang"
              @change="changeLang"
            >
              <a-select-option value="zh">中文</a-select-option>
              <a-select-option value="en">En</a-select-option>
            </a-select>
            <a-space>
              <a-button
                type="primary"
                :disabled="!ownerAddress"
                @click="leaseModal"
              >
                <template #icon>
                  <ShoppingCartOutlined />
                </template>
                {{ $t("global.rent") }}
              </a-button>
              <a-button type="primary" @click="sellTip">
                <template #icon>
                  <SendOutlined />
                </template>
                {{ $t("global.sell") }}
              </a-button>
            </a-space>
          </div>
        </a-card>

        <a-card class="card-box" size="small">
          <template #title>
            <BarsOutlined />
            {{ $t("global.currentOrder") }}
          </template>
          <template #extra>
            <a-select
              v-model:value="currentType"
              @change="getCurrentOrders"
              allow-clear
              style="width: 160px"
            >
              <a-select-option value="unitPrice">{{
                $t("global.highestPrice")
              }}</a-select-option>
              <a-select-option value="aCommission">{{
                $t("global.earnings")
              }}</a-select-option>
            </a-select>
          </template>
          <a-table
            size="small"
            bordered
            rowKey="_id"
            :dataSource="tableData.currentOrderDataSource"
            :columns="tableData.currentOrderCounmns"
          />
        </a-card>

        <a-card class="card-box" size="small">
          <a-tabs v-model:activeKey="activeKey" @change="tabsChange">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <TransactionOutlined />
                  {{ $t("global.recentTrade") }}
                </span>
              </template>
              <a-table
                size="small"
                bordered
                rowKey="_id"
                :dataSource="tableData.recentDataSource"
                :columns="tableData.recentColumns"
              />
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span>
                  <FileSearchOutlined />
                  {{ $t("global.myFreezeList") }}
                </span>
              </template>
              <a-table
                size="small"
                bordered
                rowKey="receiverAddress"
                :dataSource="tableData.freezeDataSource"
                :columns="tableData.freezeColumns"
                :scroll="{ x: true }"
              />
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <span>
                  <BarsOutlined />
                  {{ $t("global.myOrder") }}
                </span>
              </template>
              <a-table
                size="small"
                bordered
                rowKey="_id"
                :dataSource="tableData.buyDataSource"
                :columns="tableData.buyColumns"
              />
            </a-tab-pane>
            <template #tabBarExtraContent v-if="!isMobile">
              <a-space>
                <a-button
                  type="primary"
                  :disabled="!ownerAddress"
                  @click="leaseModal"
                >
                  <template #icon>
                    <ShoppingCartOutlined />
                  </template>
                  {{ $t("global.rent") }}
                </a-button>
                <a-button type="primary" @click="sellTip">
                  <template #icon>
                    <SendOutlined />
                  </template>
                  {{ $t("global.sell") }}
                </a-button>
                <a-select
                  style="width: 90px"
                  v-model:value="lang"
                  @change="changeLang"
                >
                  <a-select-option value="zh">中文</a-select-option>
                  <a-select-option value="en">En</a-select-option>
                </a-select>
              </a-space>
            </template>
          </a-tabs>
        </a-card>
      </a-layout-content>

      <a-modal
        ref="formRef"
        v-model:visible="visible"
        :maskClosable="false"
        width="600px"
        :dialogStyle="{ top: '10px' }"
        @ok="submitFreeze"
        :okText="$t('global.placeOrder')"
        :cancelText="$t('global.cancel')"
        :title="$t('global.rent') + $t('global.resource')"
        :closable="false"
        :ok-button-props="{ loading: spinning, type: 'primary' }"
        :cancel-button-props="{ disabled: spinning }"
      >
        <a-form
          name="formState"
          :model="formState"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item
            :label="
              $t('global.receive') +
              $t('global.resource') +
              $t('global.address')
            "
            v-bind="validateInfos.receiverAddress"
          >
            <a-input
              v-model:value="formState.receiverAddress"
              :placeholder="$t('tip.tronAddress')"
              allow-clear
            />
          </a-form-item>

          <a-form-item
            :label="$t('global.resource') + $t('global.type')"
            v-bind="validateInfos.resource"
          >
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="ENERGY">{{ $t("global.energy") }}</a-radio>
              <a-radio value="BANDWIDTH">{{ $t("global.bandwidth") }}</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :label="
              $t('global.chooseBuy') +
              $t('global.resource') +
              $t('global.count')
            "
            v-bind="validateInfos.amount"
          >
            <a-input-number
              v-if="formState.resource === 'ENERGY'"
              :placeholder="
                $t('tip.pledgeEnergy', { amount: config.minEnergyNumber })
              "
              style="width: 300px"
              :precision="0"
              v-model:value="formState.amount"
              :min="config.minEnergyNumber"
            />
            <a-input-number
              v-else
              :placeholder="
                $t('tip.pledegBandWidth', { amount: config.minBandwidthNumber })
              "
              style="width: 300px"
              :precision="0"
              v-model:value="formState.amount"
              :min="config.minBandwidthNumber"
            />
          </a-form-item>

          <a-form-item
            :label="$t('global.priceDay', { way: '(sun)' })"
            v-bind="validateInfos.unitPrice"
          >
            <a-input-number
              style="width: 300px"
              :precision="0"
              v-if="formState.resource === 'ENERGY'"
              v-model:value="formState.unitPrice"
              :min="config.energyPrice"
              :max="280"
            />
            <a-input-number
              v-else
              style="width: 300px"
              :precision="0"
              v-model:value="formState.unitPrice"
              :min="config.bandwidthPrice"
              :max="1000"
            />
          </a-form-item>

          <a-form-item
            :label="$t('global.freeze') + t('global.time')"
            v-bind="validateInfos.duration"
          >
            <a-tooltip :title="$t('tip.freezeToolTip')">
              <a-input-number
                :placeholder="$t('tip.freezeTip')"
                style="width: 200px"
                :precision="0"
                disabled
                v-model:value="formState.duration"
                :min="3"
                :max="3"
              />
            </a-tooltip>
          </a-form-item>

          <div class="modal-info">
            <div>
              {{ $t("global.orderAmount") }}：{{ needTrxCount || 0 }} TRX
            </div>
            <div>
              {{ $t("global.yourBlance") }}：{{ accountResouce.balance || 0 }}
              TRX
            </div>
            <div>{{ $t("tip.tip1") }}：{{ saveTrx || 0 }} TRX</div>
          </div>
        </a-form>
      </a-modal>

      <a-modal
        ref="formRef"
        v-model:visible="soldVisible"
        :maskClosable="false"
        @ok="submitSoldForm"
        :okText="$t('global.sell')"
        :cancelText="$t('global.cancel')"
        :title="$t('global.sellResource')"
        :closable="false"
        :ok-button-props="{ loading: spinning, type: 'primary' }"
        :cancel-button-props="{ disabled: spinning }"
      >
        <a-form
          name="formState"
          :model="formState"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item
            :label="$t('global.resource') + $t('global.count')"
            v-bind="validateInfos.amount"
          >
            <a-input-number
              style="width: 100%"
              v-model:value="formState.amount"
              :precision="0"
              :min="0"
              allow-clear
              disabled
            />
          </a-form-item>

          <a-form-item
            :label="$t('global.yourAddress')"
            v-bind="validateInfos.ownerAddress"
          >
            <a-input
              v-model:value="formState.ownerAddress"
              :placeholder="$t('tip.tip2')"
              allow-clear
            />
          </a-form-item>

          <div class="modal-info">
            <div>
              {{ $t("global.freeze") }}：{{
                parseInt(tableInfo.frozenBalance) / 1000000
              }}
              TRX
            </div>
            <div>
              {{ $t("global.yourBlance") }}：{{ accountResouce.balance || 0 }}
              TRX
            </div>
            <div>
              {{ $t("global.freeze") + $t("global.time") }}： 3{{
                $t("global.days")
              }}
            </div>
            <div>
              {{ $t("global.income") }}：{{ tableInfo.aCommission / 1000000 }}
              TRX
            </div>
          </div>
        </a-form>
      </a-modal>
    </a-spin>
  </a-layout>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import {
  ref,
  reactive,
  onMounted,
  computed,
  watch,
  getCurrentInstance,
  onUnmounted,
} from "vue";
import dayjs from "dayjs";
import { message, Form, Modal } from "ant-design-vue";
import { AES } from "crypto-js";

import TopCard from "./components/TopCard.vue";
import Header from "./components/Header.vue";

import { megeKeySame, sellTip } from "./utils/utils";

import {
  ShoppingCartOutlined,
  SendOutlined,
  FileSearchOutlined,
  TransactionOutlined,
  BarsOutlined,
} from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";

import { useMediaQuery, useTitle } from "@vueuse/core";

import {
  getAccountv2 as getAccountApi,
  getAccountResource as getAccountResourceApi,
} from "./api/http";

import {
  freeze as freezeApi,
  getConfig as getConfigApi,
  getOrderList,
  sellApi,
  getOrderApi,
  undoApi,
  getOrderByIdWriting,
  getOrderByIdReWriting,
} from "./api/server";

const { t } = useI18n();
const useForm = Form.useForm;

const isMobile = useMediaQuery("(max-width: 750px)");
const tronWeb = ref(null);
const ownerAddress = ref();
const formRef = ref();
const activeKey = ref("1");
const visible = ref(false);
const soldVisible = ref(false);
const currentType = ref();

const spinning = ref(false);

const config = ref({});
const tableInfo = ref({});

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
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

// 表格数据
const tableData = reactive({
  currentOrderDataSource: [],
  currentOrderCounmns: [
    {
      title: () => t("global.buyer"),
      customRender: ({ record }) => {
        return (
          <div>
            <div>
              {t("global.priceDay")} : {record.unitPrice} sun
            </div>
            <div>
              {record.resource !== "ENERGY"
                ? t("global.bandwidth")
                : t("global.energy")}{" "}
              : {record.resourceValue}
            </div>
          </div>
        );
      },
    },
    {
      title: () => t("global.seller"),
      customRender: ({ record }) => {
        return (
          <div>
            <div>
              {t("global.income")} : {parseInt(record.aCommission / 1000000)}{" "}
              TRX
            </div>
            <div>
              {t("global.freeze")} : {parseInt(record.frozenBalance) / 1000000}{" "}
              TRX 3{t("global.days")}
            </div>
          </div>
        );
      },
    },
    {
      title: () => t("global.operation"),
      align: "center",
      customRender: ({ record }) => {
        return (
          <a-button
            size="small"
            type="primary"
            shape="round"
            disabled={!ownerAddress.value}
            onClick={() => {
              resetFields();
              tableInfo.value = record;
              formState.amount = record.resourceValue;
              formState.receiverAddress = record.receiverAddress;
              formState.ownerAddress = ownerAddress.value;
              formState.resource = record.resource;
              soldVisible.value = true;
            }}
          >
            {t("global.sell")}
          </a-button>
        );
      },
    },
  ],
  recentDataSource: [],
  recentColumns: [
    {
      title: () => t("global.resource"),
      customRender: ({ record }) => {
        return record.resourceValue + " " + record.resource;
      },
    },
    {
      title: () => t("global.priceDay"),
      customRender: ({ record }) => {
        return record.unitPrice + " sun";
      },
    },
    {
      title: () => t("global.income"),
      customRender: ({ record }) => {
        return parseInt(record.commission / 1000000) + "TRX";
      },
    },
    {
      title: () => t("global.Date"),
      customRender: ({ record }) => {
        return timeFormat(record.updatedAt);
      },
    },
    {
      title: () => t("global.hash"),
      customRender: ({ record }) => {
        return (
          <a
            href={"https://tronscan.org/#/transaction/" + record.hash}
            target="_blank"
          >
            详情
          </a>
        );
      },
    },
  ],
  freezeDataSource: [],
  freezeColumns: [
    {
      title: () => t("global.freezeObject"),
      width: "50%",
      customRender: ({ record }) => {
        return (
          <div>
            <a
              target="_blank"
              href={"https://tronscan.org/#/address/" + record.receiverAddress}
            >
              {record.receiverAddress}
            </a>
            <div>{fromSun(record.frozenBalance)}</div>
          </div>
        );
      },
    },
    {
      title: () => t("global.expireTime"),
      width: "50%",
      customRender: ({ record }) => timeFormat(record.expireTime),
    },
  ],
  buyDataSource: [],
  buyColumns: [
    {
      title: () => t("global.order"),
      customRender: ({ record }) => {
        return (
          <div>
            <div>
              {t("global.priceDay")} : {record.unitPrice} sun
            </div>
            <div>
              {record.resource !== "ENERGY"
                ? t("global.bandwidth")
                : t("global.energy")}{" "}
              : {record.resourceValue}
            </div>
          </div>
        );
      },
    },
    {
      title: () => t("global.remainingAmount"),
      customRender: ({ record }) => {
        return record.settlement === 0
          ? parseInt(record.commission / 1000000) - 1 || 0 + "TRX"
          : 0;
      },
    },
    {
      title: () => t("global.operation"),
      align: "center",
      customRender: ({ record }) => {
        return (
          <AButton
            type="primary"
            disabled={record.status !== 0}
            onClick={() => {
              Modal.confirm({
                title: () => "确定撤销？",
                content: "此操作将扣除1TRX手续费",
                onOk: async () => {
                  const res = await undoApi({ _id: record._id });
                  message.info(res.message);
                  getRecentOrders();
                  getCurrentOrders();
                  getBuyOrders();
                },
              });
            }}
          >
            撤单
          </AButton>
        );
      },
    },
  ],
});

// 切换tab
const tabsChange = async (val) => {
  if (!ownerAddress.value) return;
  if (val === "1") {
    getRecentOrders();
  }
  if (val === "2") {
    getAccountResource();
  }
  if (val === "3") {
    getBuyOrders();
  }
};

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
  if (!tronWeb.value.isAddress(values.receiverAddress)) {
    message.warn(t("global.tronAddress"));
    return;
  }
  // console.log(needTrxCount.value, accountResouce.value.balance)
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
        frozenBalance: toSun(trxCount.value),
        resource: values.resource,
        resourceValue: values.amount,
        unitPrice: values.unitPrice,
        duration: values.duration,
        txid: res,
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
    getAccountResource();
    getCurrentOrders();
    getRecentOrders();
    visible.value = false;
    spinning.value = false;
  }
};

// 提交出售表单
const submitSoldForm = async () => {
  const values = await validate();
  // console.log(values);
  // console.log(trxCount.value);
  if (
    parseInt(tableInfo.value.frozenBalance) / 1000000 >
    accountResouce.value.balance
  ) {
    message.warning("账户余额不足");
    return;
  }
  //此处需要调用查询订单接口确保数量
  try {
    spinning.value = true;
    const { status } = await getOrderByIdWriting({ _id: tableInfo.value._id });
    if (status === 500) {
      message.warning("订单已被出售");
    } else {
      const { data } = await getOrderApi({ _id: tableInfo.value._id });
      if (data.status > 0) {
        message.warning("订单已被出售");
        return;
      }
      const signedTransaction =
        await tronWeb.value.transactionBuilder.freezeBalance(
          data.frozenBalance,
          values.duration,
          values.resource,
          ownerAddress.value,
          values.receiverAddress,
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
        await getOrderByIdReWriting({ _id: tableInfo.value._id });
        message.warning(broastTx.code);
      }
    }
  } catch (error) {
    console.log(error);
    message.warning(error);
    await getOrderByIdReWriting({ _id: tableInfo.value._id });
  } finally {
    getAccount();
    getAccountResource();
    getCurrentOrders();
    getRecentOrders();
    soldVisible.value = false;
    spinning.value = false;
  }
};

// 获取地址资源
const getAccountResource = async () => {
  const res = await getAccountResourceApi({
    limit: 20,
    type: 2,
    start: 0,
    address: ownerAddress.value,
  });
  tableData.freezeDataSource = megeKeySame(
    res.data.map((v) => ({ ...v, key: v.hash })) || []
  );
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

// 计算需要用户支付多少TRX

// 能量的常量=100000
// sun常量=30
// 用户需要支付的TRX数量=（所需能量/100000）*（设置sun单价/30）*9

// 带宽的常量=10000
// sun常量=500
// 用户需要支付的TRX数量=（所需带宽/10000）*（设置sun单价/500）*15
const needTrxCount = computed(() => {
  let res = 0;
  if (formState.resource === "energy") {
    res = +(
      (parseInt(formState.amount) / 100000) *
      (parseInt(formState.unitPrice) / 30) *
      9
    ).toFixed(2);
  } else {
    res = +(
      (parseInt(formState.amount) / 10000) *
      (parseInt(formState.unitPrice) / 500) *
      15
    ).toFixed(2);
  }
  return res > 1 ? Math.ceil(res) : 1;
});

// 计算原价需要多少TRX
const trxCount = computed(
  () => +(formState.amount / resourceCount()).toFixed(2)
);

// 节约

// X=用户需要获取的能量数量
// Y=sun单价
// （X/100000）*84-（X*(9/100000)）*（Y/30）=节约的TRX数量

// X=用户需要获取的带宽数量
// Y=sun单价
// （3X/1000）-(（15X/10000）*（Y/500）)=节约的TRX数量
const saveTrx = computed(() => {
  let res = 0;
  if (formState.resource === "energy") {
    res = +(
      (parseInt(formState.amount) / 100000) * 84 -
      parseInt(formState.amount) *
        (9 / 100000) *
        (parseInt(formState.unitPrice) / 30)
    ).toFixed(2);
  } else {
    res = +(
      parseInt(formState.amount) * (3 / 1000) -
      parseInt(formState.amount) *
        (15 / 10000) *
        (parseInt(formState.unitPrice) / 500)
    ).toFixed(2);
  }
  return res > 1 ? Math.ceil(res) : 0;
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
const fromSun = (val) => (val ? tronWeb.value.fromSun(val) : 0);

// 将trx转换成sun单位
const toSun = (val) => tronWeb.value.toSun(val);

// 将时间戳转换
const timeFormat = (timestamp) =>
  dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");

// 链接钱包
const linkWallet = async (tronweb, address) => {
  if (!tronweb || !address) {
    message.warning(t("tip.tip5"));
    return;
  }
  tronWeb.value = tronweb;
  ownerAddress.value = address;
  await getAccount();
};

const lang = computed(() => {
  return localStorage.getItem("language") || "zh";
});

const changeLang = (type) => {
  localStorage.setItem("language", type);
  location.reload();
};

// 获取当前订单
const getCurrentOrders = async () => {
  soldVisible.value = false;
  tableData.currentOrderDataSource = [];
  const { data } = await getOrderList({
    status: 0,
    orderType: 0,
    currentType: currentType.value,
  });
  tableData.currentOrderDataSource = data.results;
};

// 我的买单
const getBuyOrders = async () => {
  tableData.buyDataSource = [];
  const { data } = await getOrderList({ receiverAddress: ownerAddress.value });
  tableData.buyDataSource = data.results;
};

// 获取近期完成交易
const getRecentOrders = async () => {
  tableData.recentDataSource = [];
  const { data } = await getOrderList({ status: 1, pageSize: 10 });
  tableData.recentDataSource = data.results;
};

// 获取配置
const getConfig = async () => {
  const { data } = await getConfigApi();
  config.value = { ...data.config, address: data.address };
};

const mathFloor = (val = 0) => {
  return Math.floor(val / 1000000) * 1000000;
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
  getRecentOrders();
  getCurrentOrders();
  window.addEventListener("message", (e) => {
    if (e.data.message && e.data.message.action == "accountsChanged") {
      activeKey.value = "1";
      visible.value = false;
      soldVisible.value = false;
    }
  });
  getConfig();
  useTitle(t("global.title"));
  timer = setInterval(() => {
    getRecentOrders();
    getCurrentOrders();
  }, 3 * 60 * 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
span {
  font-weight: bold;
}

.flex-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
}

.ant-layout-header {
  padding: 0 10px;
  // background-color: white;
}

.layout {
  padding: 10px;
  // background: white;
  min-height: 93vh;

  .card-box {
    margin: 10px auto;
  }
}

.modal-info {
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: #eee;
  border-radius: 5px;
}
</style>
