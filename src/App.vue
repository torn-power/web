<template>
  <a-layout>
    <Header @change="linkWallet" />
    <a-layout-content class="layout">
      <TopCard :accountResouce="accountResouce" :ownerAddress="ownerAddress" :isMobile="isMobile" />

      <a-card class="card-box" size="small" v-if="isMobile">
        <div class="flex-wrap">
          <a-select style="width: 90px" v-model:value="lang" @change="changeLang">
            <a-select-option value="zh">中文</a-select-option>
            <a-select-option value="en">En</a-select-option>
          </a-select>
          <a-space>
            <a-button type="primary" :disabled="!ownerAddress" @click="leaseModal">
              <template #icon>
                <ShoppingCartOutlined />
              </template>
              {{ $t('global.rent') }}
            </a-button>
            <a-button type="primary" @click="sellTip">
              <template #icon>
                <SendOutlined />
              </template>
              {{ $t('global.sell') }}
            </a-button>
          </a-space>
        </div>
      </a-card>

      <a-card class="card-box" size="small">
        <template #title>
          <BarsOutlined />
          {{ $t('global.currentOrder') }}
        </template>
        <template #extra>
          <a-select style="width: 160px">
            <a-select-option value="jack">{{ $t('global.highestPrice') }}</a-select-option>
            <a-select-option value="lucy">{{ $t('global.earnings') }}</a-select-option>
          </a-select>
        </template>
        <a-table
          size="small"
          bordered
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
                {{ $t('global.recentTrade') }}
              </span>
            </template>
            <a-table
              size="small"
              bordered
              :dataSource="tableData.recentDataSource"
              :columns="tableData.recentColumns"
            />
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span>
                <FileSearchOutlined />
                {{ $t('global.myFreezeList') }}
              </span>
            </template>
            <a-table
              size="small"
              bordered
              :dataSource="tableData.freezeDataSource"
              :columns="tableData.freezeColumns"
              :scroll="{ x: true }"
            />
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #tab>
              <span>
                <BarsOutlined />
                {{ $t('global.myOrder') }}
              </span>
            </template>
            <a-table
              size="small"
              bordered
              :dataSource="tableData.buyDataSource"
              :columns="tableData.buyColumns"
            />
          </a-tab-pane>
          <template #tabBarExtraContent v-if="!isMobile">
            <a-space>
              <a-button type="primary" :disabled="!ownerAddress" @click="leaseModal">
                <template #icon>
                  <ShoppingCartOutlined />
                </template>
                {{ $t('global.rent') }}
              </a-button>
              <a-button type="primary" @click="sellTip">
                <template #icon>
                  <SendOutlined />
                </template>
                {{ $t('global.sell') }}
              </a-button>
              <a-select style="width: 90px" v-model:value="lang" @change="changeLang">
                <a-select-option value="zh">中文</a-select-option>
                <a-select-option value="en">En</a-select-option>
              </a-select>
            </a-space>
          </template>
        </a-tabs>
      </a-card>
    </a-layout-content>
  </a-layout>

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
  >
    <a-form
      name="formState"
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        :label="$t('global.receive') + $t('global.resource') + $t('global.address')"
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
          <a-radio value="ENERGY">{{ $t('global.energy') }}</a-radio>
          <a-radio value="BANDWIDTH">{{ $t('global.bandwidth') }}</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :label="$t('global.chooseBuy') + $t('global.resource') + $t('global.count')"
        v-bind="validateInfos.amount"
      >
        <a-input-number
          v-if="formState.resource === 'ENERGY'"
          :placeholder="$t('tip.pledgeEnergy', { amount: 1000000 })"
          style="width: 300px"
          :precision="0"
          v-model:value="formState.amount"
          :min="100000"
        />
        <a-input-number
          v-else
          :placeholder="$t('tip.pledegBandWidth', { amount: 100 })"
          style="width: 300px"
          :precision="0"
          v-model:value="formState.amount"
          :min="100"
        />
      </a-form-item>

      <a-form-item
        :label="$t('global.priceDay', { way: '(sun)' })"
        v-bind="validateInfos.unitPrice"
      >
        <a-input-number
          style="width: 300px"
          :precision="0"
          v-model:value="formState.unitPrice"
          :min="30"
        />
      </a-form-item>

      <a-form-item :label="$t('global.freeze') + t('global.time')" v-bind="validateInfos.duration">
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
        <div>{{ $t('global.orderAmount') }}：{{ needTrxCount || 0 }} TRX</div>
        <div>{{ $t('global.yourBlance') }}：{{ accountResouce.balance || 0 }} TRX</div>
        <div>{{ $t('tip.tip1') }}：{{ (trxCount - needTrxCount).toFixed(2) }} TRX</div>
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
          style="width:100%"
          v-model:value="formState.amount"
          :precision="0"
          :min="0"
          allow-clear
        />
      </a-form-item>

      <a-form-item :label="$t('global.yourAddress')" v-bind="validateInfos.ownerAddress">
        <a-input
          disabled
          v-model:value="formState.ownerAddress"
          :placeholder="$t('tip.tip2')"
          allow-clear
        />
      </a-form-item>

      <div class="modal-info">
        <div>{{ $t('global.freeze') }}：{{ 0 }} TRX</div>
        <div>{{ $t('global.yourBlance') }}：{{ accountResouce.balance || 0 }} TRX</div>
        <div>{{ $t('global.freeze') + $t('global.time') }}： 3{{ $t('global.days') }}</div>
        <div>{{ $t('global.income') }}：{{ 0 }} TRX</div>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, reactive, onMounted, computed, watch, getCurrentInstance } from "vue";
import dayjs from "dayjs";
import { message, Form } from "ant-design-vue";

import TopCard from "./components/TopCard.vue";
import Header from "./components/Header.vue";

import { megeKeySame, sellTip } from "./utils/utils";

const useForm = Form.useForm;

import {
  ShoppingCartOutlined,
  SendOutlined,
  FileSearchOutlined,
  TransactionOutlined,
  BarsOutlined
} from "@ant-design/icons-vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { useMediaQuery,useTitle } from '@vueuse/core'

import {
  getAccountv2 as getAccountApi,
  getAccountResource as getAccountResourceApi,
} from "./api/http";

import { freeze as freezeApi } from './api/server'

const { proxy } = getCurrentInstance();

const isMobile = useMediaQuery('(max-width: 750px)')
const tronWeb = ref(null);
const ownerAddress = ref();
const formRef = ref();
const activeKey = ref("1");
const visible = ref(false);
const soldVisible = ref(false);

// 账户资源
const accountResouce = ref({});

// 表单
const formState = reactive({
  resource: "ENERGY",
  amount: 100000,
  duration: 3,
  unitPrice: 30,
  ownerAddress: undefined,  // 代表当前地址或者自己的收款地址
  receiverAddress: undefined, // 代表需要接收资源的地址
});

// 表单规则
const rulesRef = reactive({
  ownerAddress: [
    {
      required: true,
      message: t('tip.ownerAddress'),
    },
  ],
  receiverAddress: [
    {
      required: true,
      message: t('tip.receiverAddress'),
    },
  ],
  resource: [
    {
      required: true,
      message: t('tip.resource'),
    },
  ],
  amount: [
    {
      required: true,
      message: t('tip.amount'),
    },
  ],
  unitPrice: [
    {
      required: true,
      message: t('tip.unitPrice'),
    },
  ],
  duration: [
    {
      required: true,
      message: t('tip.duration'),
    },
  ],
});

// useForm
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

// 表格数据
const tableData = reactive({
  currentOrderDataSource: [{ key: 1 }],
  currentOrderCounmns: [
    {
      title: () => t('global.buyer'),
      customRender: ({ record }) => {
        return <div>
          <div>{t('global.priceDay')} : 500 sun</div>
          <div>{t('global.bandwidth')} : 50000</div>
        </div>
      }
    },
    {
      title: () => t('global.seller'),
      customRender: ({ record }) => {
        return <div>
          <div>{t('global.income')} : 60 TRX</div>
          <div>{t('global.freeze')} : 16436 TRX  3{t('global.days')}</div>
        </div>
      }
    },
    {
      title: () => t('global.operation'),
      align: 'center',
      customRender: ({ record }) => {
        return <a-button
          size="small"
          type="primary"
          shape="round"
          onClick={() => {
            resetFields();
            formState.amount = 200000
            formState.receiverAddress = 'TRJdsTW85FDRZnnd1H9BT6r6bYPp83os4w'
            formState.ownerAddress = ownerAddress.value
            soldVisible.value = true
          }}
        >
          {t('global.sell')}
        </a-button>
      }
    },
  ],
  recentDataSource: [],
  recentColumns: [
    {
      title: () => t('global.resource'),
      dataIndex: "",
    },
    {
      title: () => t('global.priceDay'),
      dataIndex: "",
    },
    {
      title: () => t('global.income'),
      dataIndex: "",
    },
    {
      title: () => t('global.Date'),
      dataIndex: "",
    },
    {
      title: () => t('global.hash'),
      dataIndex: "",
    },
  ],
  freezeDataSource: [],
  freezeColumns: [
    {
      title: () => t('global.freezeObject'),
      width: '50%',
      customRender: ({ record }) => {
        return <div>
          <a
            target="_blank"
            href={"https://tronscan.org/#/address/" + record.receiverAddress}
          >
            {record.receiverAddress}
          </a>
          <div>{fromSun(record.frozenBalance)}</div>
        </div>
      },
    },
    {
      title: () => t('global.expireTime'),
      width: '50%',
      customRender: ({ record }) => timeFormat(record.expireTime),
    },
  ],
  buyDataSource: [],
  buyColumns: [
    {
      title: () => t('global.order'),
      dataIndex: "",
    },
    {
      title: () => t('global.remainingAmount'),
      dataIndex: "",
    },
    {
      title: () => t('global.operation'),
      dataIndex: "",
    },
  ],
});

// 切换tab
const tabsChange = async (val) => {
  if (!ownerAddress.value) return;
  if (val === "2") {
    getAccountResource();
  }
};

// 打开租赁弹窗
const leaseModal = () => {
  resetFields();
  formState.ownerAddress = ownerAddress.value
  visible.value = true;
};

// trx转账接口
const transactionTrx = async (amount) => {
  const tx = await tronWeb.value.transactionBuilder.sendTrx(
    "TXCUc7Lmn8jEqUVEZZKdXm9jHgiEF7XQDW",
    amount,
    ownerAddress.value
  );
  const signedTx = await tronWeb.value.trx.sign(tx);
  const broastTx = await tronWeb.value.trx.sendRawTransaction(signedTx);
  return broastTx.result;
};

// 提交租赁表单
const submitFreeze = async () => {
  const values = await validate();
  if (!tronWeb.value.isAddress(values.receiverAddress)) {
    message.warn(t('global.tronAddress'));
    return;
  }
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
      duration: values.duration
    }
    console.log(formData)
    const result = await freezeApi(formData)
    if (result) {
      getAccount()
      getAccountResource()
      visible.value = false
      message.success(t('global.rent') + t('global.success'))
    }
  } else {
    message.warning(t('global.rent') + t('global.fail'))
  }
};

// 提交出售表单
const submitSoldForm = async () => {
  const values = await validate();
  if (!tronWeb.value.isAddress(values.receiverAddress)) {
    message.warn(t('global.tronAddress'));
    return;
  }
  console.log(values)
  console.log(trxCount.value)
  const signedTransaction = await tronWeb.value.transactionBuilder.freezeBalance(
    values.amount,
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
    getAccount()
    getAccountResource()
    message.success(t('global.sell') + t('global.success'))
    soldVisible.value = false
  }
}

// 获取地址资源
const getAccountResource = async () => {
  const res = await getAccountResourceApi({
    limit: 5000,
    type: 2,
    start: 0,
    address: ownerAddress.value,
  });
  tableData.freezeDataSource = megeKeySame(res.data.map((v) => ({ ...v, key: v.hash })) || []);
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
    balance: fromSun(res.balance), //可用trx
  };
};

// 计算需要用户支付多少TRX
const needTrxCount = computed(() => fromSun((formState.amount * formState.unitPrice).toFixed(2)));

// 计算原价需要多少TRX
const trxCount = computed(() =>
  (formState.amount / resourceCount()).toFixed(2)
);

// 计算不同资源情况下用户能获得多少资源
const resourceCount = () => {
  if (formState.resource === "ENERGY") {
    return (
      accountResouce.value.bandwidth?.totalEnergyLimit /
      accountResouce.value.bandwidth?.totalEnergyWeight
    ).toFixed(2);
  }
  return (
    accountResouce.value.bandwidth?.totalNetLimit /
    accountResouce.value.bandwidth?.totalNetWeight
  ).toFixed(2);
};

// 将sun转换成trx单位
const fromSun = (val) => tronWeb.value.fromSun(val);

// 将trx转换成sun单位
const toSun = (val) => tronWeb.value.toSun(val);

// 将时间戳转换
const timeFormat = (timestamp) =>
  dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");

// 链接钱包
const linkWallet = async (tronweb, address) => {
  tronWeb.value = tronweb
  ownerAddress.value = address
  await getAccount()
};

const lang = computed(() => {
  return localStorage.getItem('language') || 'zh'
})

const changeLang = (type) => {
  localStorage.setItem('language', type)
  location.reload()
}

watch(
  () => formState.resource,
  (val) => {
    if (val === "ENERGY") {
      formState.amount = 100000;
    } else {
      formState.amount = 100;
    }
  }
);

onMounted(() => {
  window.addEventListener("message", (e) => {
    if (e.data.message && e.data.message.action == "accountsChanged") {
      linkWallet();
      activeKey.value = "1";
    }
  });
  useTitle(t('global.title'))
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
