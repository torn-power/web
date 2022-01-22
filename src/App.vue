<template>
  <a-layout>
    <a-layout-header>
      <div class="flex-wrap">
        <div class="title">
          <a-space>
            <img width="32" src="/favicon.png" alt />
            <span>波场能量市场</span>
          </a-space>
        </div>
        <a-button shape="round" v-if="!ownerAddress" @click="linkWallet" type="primary">
          <ApiOutlined />链接钱包
        </a-button>
      </div>
    </a-layout-header>
    <a-layout-content class="layout">
      <a-row :gutter="[20, 20]" type="flex" justify="center" align="middle">
        <a-col :xl="6">
          <a-card style="min-width: 350px">
            <template #title>地址：{{ ownerAddress || "请链接你的波场钱包" }}</template>
            <template #extra>
              <RedditOutlined />
            </template>
            <p>可用: {{ accountResouce.balance || 0 }} TRX</p>
            <p>冻结: {{ accountResouce.totalFrozen || 0 }} TRX</p>
          </a-card>
        </a-col>
        <a-col :xl="6">
          <a-card title="能量" style="min-width: 350px">
            <template #extra>
              <a-space align="center">
                <span>
                  <a-tooltip title="剩余能量/总能量">
                    {{ accountResouce.bandwidth?.energyRemaining || 0 }} /
                    {{ accountResouce.bandwidth?.energyLimit || 0 }}
                  </a-tooltip>
                </span>
                <ThunderboltOutlined />
              </a-space>
            </template>
            <p>为自己冻结: {{ accountResouce.frozenForEnergy || 0 }} TRX</p>
            <p>为他人冻结: {{ accountResouce.delegateFrozenForEnergy || 0 }} TRX</p>
          </a-card>
        </a-col>
        <a-col :xl="6">
          <a-card title="带宽" style="min-width: 350px">
            <template #extra>
              <a-space align="center">
                <span>
                  <a-tooltip title="剩余带宽/总带宽">
                    {{
                      accountResouce.bandwidth?.freeNetRemaining +
                        accountResouce.bandwidth?.netRemaining || 0
                    }}
                    /
                    {{
                      accountResouce.bandwidth?.freeNetLimit +
                        accountResouce.bandwidth?.netLimit || 0
                    }}
                  </a-tooltip>
                </span>
                <DeploymentUnitOutlined />
              </a-space>
            </template>
            <p>为自己冻结: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
            <p>
              为他人冻结:
              {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX
            </p>
          </a-card>
        </a-col>
        <a-col :xl="6">
          <a-card title="今日出租情况" style="min-width: 350px">
            <p>平台日总量: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
            <p>商户总收益: {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX</p>
          </a-card>
        </a-col>
      </a-row>

      <a-card class="card-box" size="small">
        <template #title>
          <BarsOutlined />当前订单
        </template>
        <template #extra>
          <a-select style="width: 160px">
            <a-select-option value="jack">单价最高</a-select-option>
            <a-select-option value="lucy">总收益最高</a-select-option>
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
                <TransactionOutlined />近期完成交易
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
                <FileSearchOutlined />我的冻结列表
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
                <BarsOutlined />我的买单
              </span>
            </template>
            <a-table
              size="small"
              bordered
              :dataSource="tableData.buyDataSource"
              :columns="tableData.buyColumns"
            />
          </a-tab-pane>
          <template #tabBarExtraContent>
            <a-space>
              <a-button type="primary" :disabled="!ownerAddress" @click="leaseModal">
                <template #icon>
                  <ShoppingCartOutlined />
                </template>
                租赁
              </a-button>
              <a-button type="primary" @click="sellTip">
                <template #icon>
                  <SendOutlined />
                </template>
                出售
              </a-button>
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
    @ok="submitFreeze"
    okText="下单"
    cancelText="取消"
    title="租赁资源"
  >
    <a-form
      name="formState"
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="接收资源地址" v-bind="validateInfos.receiverAddress">
        <a-input
          v-model:value="formState.receiverAddress"
          placeholder="请输入合法的波场钱包收款地址"
          allow-clear
        />
      </a-form-item>

      <a-form-item label="资源类型" v-bind="validateInfos.resource">
        <a-radio-group v-model:value="formState.resource">
          <a-radio value="ENERGY">能量</a-radio>
          <a-radio value="BANDWIDTH">带宽</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="选购资源数量" v-bind="validateInfos.amount">
        <a-input-number
          v-if="formState.resource === 'ENERGY'"
          placeholder="至少质押100000能量"
          style="width: 300px"
          :precision="0"
          v-model:value="formState.amount"
          :min="100000"
        />
        <a-input-number
          v-else
          placeholder="至少质押100带宽"
          style="width: 300px"
          :precision="0"
          v-model:value="formState.amount"
          :min="100"
        />
      </a-form-item>

      <a-form-item label="价格(sun)/天" v-bind="validateInfos.unitPrice">
        <a-input-number
          placeholder="至少质押100带宽"
          style="width: 300px"
          :precision="0"
          v-model:value="formState.unitPrice"
          :min="30"
        />
      </a-form-item>

      <a-form-item label="冻结时间(天)" v-bind="validateInfos.duration">
        <a-tooltip title="根据波场规则至少冻结三天，后期可调整">
          <a-input-number
            placeholder="至少冻结3天"
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
        <div>订单金额：{{ needTrxCount || 0 }} TRX</div>
        <div>您的余额：{{ accountResouce.balance || 0 }} TRX</div>
        <div>相比较燃烧获得资源节省：{{ (trxCount - needTrxCount).toFixed(2) }} TRX</div>
      </div>
    </a-form>
  </a-modal>

  <a-modal
    ref="formRef"
    v-model:visible="soldVisible"
    :maskClosable="false"
    @ok="submitSoldForm"
    okText="出售"
    cancelText="取消"
    title="出售资源"
  >
    <a-form
      name="formState"
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="资源数量" v-bind="validateInfos.amount">
        <a-input-number style="width:100%" v-model:value="formState.amount" :min="0" allow-clear />
      </a-form-item>

      <a-form-item label="你的收款地址" v-bind="validateInfos.ownerAddress">
        <a-input v-model:value="formState.ownerAddress" placeholder="请输入合法的波场钱包收款地址" allow-clear />
      </a-form-item>

      <div class="modal-info">
        <div>冻结：{{ 0 }} TRX</div>
        <div>您的余额：{{ accountResouce.balance || 0 }} TRX</div>
        <div>冻结时间： 3天</div>
        <div>收入：{{ 0 }} TRX</div>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, reactive, h, onMounted, computed, watch } from "vue";
import dayjs from "dayjs";
import { message, Form, Modal, Space, Divider } from "ant-design-vue";
import { mergeEqual } from "./utils/utils";
const useForm = Form.useForm;

import {
  RedditOutlined,
  DeploymentUnitOutlined,
  ThunderboltOutlined,
  ShoppingCartOutlined,
  SendOutlined,
  FileSearchOutlined,
  TransactionOutlined,
  BarsOutlined,
  ApiOutlined,
  QuestionOutlined,
} from "@ant-design/icons-vue";

import {
  getAccountv2 as getAccountApi,
  getAccountResource as getAccountResourceApi,
} from "./api/http";

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
      message: "请输入你的钱包地址",
    },
  ],
  receiverAddress: [
    {
      required: true,
      message: "请输入接收能量地址",
    },
  ],
  resource: [
    {
      required: true,
      message: "请选择资源类型",
    },
  ],
  amount: [
    {
      required: true,
      message: "请输入资源数量",
    },
  ],
  unitPrice: [
    {
      required: true,
      message: "请输入想要的单价",
    },
  ],
  duration: [
    {
      required: true,
      message: "请输入质押时长",
    },
  ],
});

// useForm
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);

// 表格数据
const tableData = reactive({
  currentOrderDataSource: [{}],
  currentOrderCounmns: [
    {
      title: "买家",
      customRender: ({ record }) => {
        return <div>
          <div>价格/天 : 500 sun</div>
          <div>带宽 : 50,000</div>
        </div>
      }
    },
    {
      title: "卖家",
      customRender: ({ record }) => {
        return <div>
          <div>收入 : 24 ~ 60 TRX</div>
          <div>冻结: 16,436 TRX  3天</div>
        </div>
      }
    },
    {
      title: "操作",
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
            soldVisible.value = true
          }}
        >
          出售
        </a-button>
      }
    },
  ],
  recentDataSource: [],
  recentColumns: [
    {
      title: "资源",
      dataIndex: "",
    },
    {
      title: "价格/天",
      dataIndex: "",
    },
    {
      title: "收入",
      dataIndex: "",
    },
    {
      title: "日期",
      dataIndex: "",
    },
    {
      title: "操作",
      dataIndex: "",
    },
  ],
  freezeDataSource: [],
  freezeColumns: [
    {
      title: "最后质押时间(本地)",
      width: 180,
      align: "center",
      customRender: ({ record }) => timeFormat(record.timestamp),
    },
    {
      title: "质押账户",
      minWidth: 250,
      align: "center",
      customRender: ({ record }) => (
        <a
          target="_blank"
          href={"https://tronscan.org/#/address/" + record.ownerAddress}
        >
          {record.ownerAddress}
        </a>
      ),
    },
    {
      title: "接收账户",
      minWidth: 250,
      align: "center",
      customRender: ({ record }) => (
        <a
          target="_blank"
          href={"https://tronscan.org/#/address/" + record.receiverAddress}
        >
          {record.receiverAddress}
        </a>
      ),
    },
    {
      title: "资源类型",
      width: 120,
      align: "center",
      customRender: ({ record }) =>
        record.resource === "ENERGY" ? "能量" : "带宽",
    },
    {
      title: "资源数量",
      width: 200,
      align: "center",
      customRender: ({ record }) => record.resourceValue,
    },
    {
      title: "质押数量(TRX)",
      width: 200,
      align: "center",
      customRender: ({ record }) => fromSun(record.frozenBalance),
    },
    {
      title: "到期时间",
      width: 180,
      align: "center",
      customRender: ({ record }) => timeFormat(record.expireTime),
    },
    {
      title: "操作",
      align: "center",
      width: 160,
      fixed: "right",
      customRender: ({ record }) => {
        const disabled = +dayjs() < record.expireTime;
        return (
          <a-space>
            {/*<a target="_blank" href={'https://tronscan.org/#/transaction/' + record.hash}>交易哈希</a> */}
            <a-button
              size="small"
              disabled={disabled}
              type="primary"
              shape="round"
              onClick={() => unfreeze(record)}
            >
              解锁
            </a-button>
          </a-space>
        );
      },
    },
  ],
  buyDataSource: [],
  buyColumns: [
    {
      title: "订单",
      dataIndex: "",
    },
    {
      title: "剩余价值",
      dataIndex: "",
    },
    {
      title: "接收地址",
      dataIndex: "",
    },
    {
      title: "操作",
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
    "TKdQiH76JBQuUnhA8Ak8D8w2YWhR7xeWdj",
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
    message.warn("请输入合法的波场地址");
    return;
  }

  const res = await transactionTrx(toSun(needTrxCount.value));
  if (res) {
    const formData = {
      ...values,
      amount: toSun(trxCount.value),
      ownerAddress: ownerAddress.value
    }

    // 以下需要后端去执行冻结
    const signedTransaction = await tronWeb.value.transactionBuilder.freezeBalance(
      formData.amount,
      formData.duration,
      formData.resource,
      formData.ownerAddress,
      formData.receiverAddress,
      1
    );
    const signedTx = await tronWeb.value.trx.sign(signedTransaction);
    const broastTx = await tronWeb.value.trx.sendRawTransaction(signedTx);
    if (broastTx.result) {
      getAccount()
      getAccountResource()
      message.success('租赁成功')
    }
  } else {
    message.success('租赁失败')
  }
};

// 提交出售表单
const submitSoldForm = async () => {
  const values = await validate();
  if (!tronWeb.value.isAddress(values.receiverAddress)) {
    message.warn("请输入合法的波场地址");
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
    message.success('出售成功')
    soldVisible.value = false
  }
}

// 解冻操作
const unfreeze = async (record) => {
  try {
    const signedTransaction =
      await tronWeb.value.transactionBuilder.unfreezeBalance(
        record.resource,
        ownerAddress.value,
        record.receiverAddress,
        1
      );
    const signedTx = await tronWeb.value.trx.sign(signedTransaction);
    const res = await tronWeb.value.trx.sendRawTransaction(signedTx);
    if (res.result) {
      getAccount();
      getAccountResource();
      message.success("解冻中，请稍等3s");
    }
  } catch (error) {
    message.error(error);
  }
};

// 获取地址资源
const getAccountResource = async () => {
  const res = await getAccountResourceApi({
    limit: 5000,
    type: 2,
    start: 0,
    address: ownerAddress.value,
  });
  tableData.freezeDataSource =
    res.data.map((v) => ({ ...v, key: v.hash })) || [];
  console.log(JSON.stringify(tableData.freezeDataSource));
  console.log(mergeEqual(tableData.freezeDataSource));
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

// 计算用户获取的能量
const computedResouceCount = computed(() => {
  if (formState.resource === "ENERGY") {
    return (formState.amount * resourceCount()).toFixed(2);
  }
  return (formState.amount * resourceCount()).toFixed(2);
});

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

// 加盟提示
const sellTip = () => {
  Modal.info({
    title: "出售提示",
    okText: "知道了",
    content: () => (
      <div>
        <p>您可以加入VIP卖家池，自动化出售能量以获得收入，详情请联系</p>
        <Space>
          <img src="/telegram.png" width="24" />
          <a href="https://t.me/pangu_encrypt">@pangu_encrypt</a>
        </Space>
        <Divider />
        <p>
          当有订单时您也可以手动出售能量以获得收入，要获得及时的订单推送，请关注如下电报(Telegram)
        </p>
        <Space>
          <img src="/telegram.png" width="24" />
          <a href="https://t.me/pangu_encrypt">@pangu_encrypt</a>
        </Space>
      </div>
    ),
  });
};

// 链接钱包
const linkWallet = async () => {
  if (window.tronWeb) {
    if (window.tronWeb.fullNode.host !== "https://api.trongrid.io") {
      tronWeb.value = window.tronWeb;
      ownerAddress.value = tronWeb.value.defaultAddress.base58;
      getAccount();
    } else {
      message.warning("请切换到TRON主网使用");
    }
  } else {
    message.warning("请下载波宝钱包浏览器插件 : https://www.tronlink.org/cn/");
  }
};

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
  padding: 0 20px;
  // background-color: white;
}
.layout {
  padding: 20px;
  // background: white;
  min-height: 93vh;
  .card-box {
    margin: 20px auto;
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
