<template>
  <div v-if="isMobile" class="home-wrap">
    <section>
      <div class="title">{{ $t("global.shareData") }}</div>
      <div class="data-box">
        <div class="data-box-content">
          <div class="data-box-left">
            <span class="color-1" style="font-weight: 600">
              {{ $t("global.providedUsersBandWidth") }}
            </span>
            <!-- <span>&nbsp;带宽</span> -->
          </div>
          <div class="color-3">
            {{ toLocaleString(rent.totalBandWidth || 0) }}
          </div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <span class="color-1" style="font-weight: 600">
              {{ $t("global.providedUsersEnergy") }}
            </span>
            <!-- <span>&nbsp;能量</span> -->
          </div>
          <div class="color-3">
            {{ toLocaleString(rent.totalEnergy || 0) }}
          </div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <span class="color-1" style="font-weight: 600">{{
              $t("global.saveUserTrx")
            }}</span>
            <!-- <span>&nbsp;TRX</span> -->
          </div>
          <div class="color-3">
            {{ toLocaleString(rent.totalTrx / 1000000) }}
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="title font-36">{{ $t("global.recommendReward") }}</div>
      <div class="data-box m36">
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-1.png" alt="" />
            <span class="color-1">&emsp;{{ $t("global.walletBalance") }}</span>
          </div>
          <div class="color-2">{{ accountResouce.balance || 0 }} TRX</div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-2.png" alt="" />
            <span class="color-1">&emsp;{{ $t("global.gainedReward") }}</span>
          </div>
          <div class="color-2">
            {{ (info.totalSun / 1000000).toFixed(2) }} TRX
          </div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-3.png" alt="" />
            <span class="color-1">&emsp;{{ $t("global.invitedNumbers") }}</span>
          </div>
          <div class="color-2">{{ currentListsTotal }}</div>
        </div>

        <div class="line"></div>

        <div class="flex-space">
          <div class="copy-text">{{ $t("global.copyLinkTips") }}</div>
          <div class="receive-award" @click="changeStatus('receiveAward')">
            {{ $t("global.receiveAward") }}
          </div>
        </div>

        <div class="copy-box" @click="copyText">
          <div class="copy-url">
            {{ ownerAddress || $t("global.linkWallet") }}
          </div>
          <div class="copy-line"></div>
          <img class="copy-img" src="/img/copy.png" alt="" />
        </div>
      </div>
    </section>

    <section>
      <div class="title font-36">{{ $t("global.resourceLeasing") }}</div>
      <div class="data-box data-form">
        <a-form name="formState" :model="formState">
          <a-form-item v-bind="validateInfos.receiverAddress">
            <a-input
              v-model:value="formState.receiverAddress"
              :placeholder="$t('tip.tronAddress')"
            ></a-input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.resource">
            <a-space>
              <span class="color-1 font-24"
                >{{ $t("global.resourceType") }}：</span
              >
              <a-radio-group v-model:value="formState.resource">
                <a-radio value="ENERGY" class="font-24" style="color: white">{{
                  $t("global.energy")
                }}</a-radio>
                <a-radio
                  value="BANDWIDTH"
                  class="font-24"
                  style="color: white"
                  >{{ $t("global.bandwidth") }}</a-radio
                >
              </a-radio-group>
            </a-space>
          </a-form-item>
          <a-form-item v-bind="validateInfos.amount">
            <a-input-number
              v-if="formState.resource === 'ENERGY'"
              :placeholder="
                $t('tip.pledgeEnergy', { amount: config.minEnergyNumber })
              "
              :precision="0"
              v-model:value="formState.amount"
              :min="config.minEnergyNumber"
            />
            <a-input-number
              v-else
              :placeholder="
                $t('tip.pledegBandWidth', {
                  amount: config.minBandwidthNumber,
                })
              "
              :precision="0"
              v-model:value="formState.amount"
              :min="config.minBandwidthNumber"
            />
          </a-form-item>
          <a-form-item v-bind="validateInfos.unitPrice">
            <div style="display: flex">
              <a-input-number
                :precision="0"
                v-if="formState.resource === 'ENERGY'"
                v-model:value="formState.unitPrice"
                :min="config.energyPrice"
              />
              <a-input-number
                v-else
                :precision="0"
                v-model:value="formState.unitPrice"
                :min="config.bandwidthPrice"
              />
              <div class="block">sun/天</div>
            </div>
          </a-form-item>
          <a-form-item>
            <div class="form-tip">
              {{ $t("global.orderAmount") }}：<span class="form-tip-num">{{
                needTrxCount || 0
              }}</span
              ><span> TRX</span>
            </div>
            <div class="form-tip-1">
              {{ $t("tip.tip1") }}：
              <span class="form-tip-num">{{ saveTrx || 0 }}</span
              ><span> TRX</span>
            </div>
          </a-form-item>
          <a-form-item style="margin-bottom: 0">
            <a-button
              class="place-order-button"
              type="primary"
              shape="round"
              size="large"
              style="width: 100%"
              @click="submitFreeze"
              :disabled="!ownerAddress"
              >{{ $t("global.placeOrder") }}</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </section>

    <section>
      <div class="title font-36">
        {{ $t("global.currentOrder") }}
      </div>

      <div class="data-box">
        <a-select
          style="width: 100%"
          v-model:value="currentType"
          @change="orderTypeChange"
        >
          <a-select-option value="unitPrice">{{
            $t("global.highestPrice")
          }}</a-select-option>
          <a-select-option value="aCommission">{{
            $t("global.earnings")
          }}</a-select-option>
        </a-select>

        <div class="data-table">
          <div class="data-table-header">
            <div>{{ $t("global.orderList") }}</div>
            <div>{{ $t("global.sellerIncome") }}</div>
            <div class="action">{{ $t("global.operation") }}</div>
          </div>
          <div class="data-table-body">
            <div class="content" v-for="(record, i) in tableData" :key="i">
              <div class="content-data">
                <div>
                  <span class="label">{{ $t("global.priceOfDay") }}：</span>
                  <span>{{ record.unitPrice }}</span>
                  <span>sun</span>
                </div>
                <div>
                  <span class="label">{{ record.resource }}： </span>
                  <span>{{ record.resourceValue }}</span>
                </div>
              </div>
              <div class="content-data">
                <div>
                  <span class="label">{{ $t("global.income") }}：</span>
                  <span>{{ (record.aCommission / 1000000).toFixed(2) }}</span>
                  <span>TRX</span>
                </div>
                <div>
                  <span class="label">{{ $t("global.freeze") }}：</span>
                  <span>{{ parseInt(record.frozenBalance / 1000000) }}TRX</span>
                </div>
              </div>
              <div class="content-action">
                <a-button
                  class="sell-button"
                  type="primary"
                  shape="round"
                  size="small"
                  :disabled="!ownerAddress"
                  style="margin: 0 auto"
                  @click="submitSoldForm(record)"
                  >{{ $t("global.sell") }}
                </a-button>
              </div>
            </div>
            <div class="no-data" v-if="tableData.length === 0">
              {{ $t("global.noDate") }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <div class="share-data-wrap">
      <div class="title">{{ $t("global.shareData") }}</div>
      <div class="share-data-content-wrap">
        <div class="content-item-wrap">
          <div class="num">
            {{ toLocaleString(rent.totalBandWidth || 0) }}
          </div>
          <div class="name">
            <!-- 累计为用户提供<span class="sign-name">&nbsp;带宽</span> -->
            {{ $t("global.providedUsersBandWidth") }}
          </div>
        </div>
        <div class="content-item-wrap">
          <div class="num">{{ toLocaleString(rent.totalEnergy || 0) }}</div>
          <div class="name">
            <!-- 累计为用户提供<span class="sign-name">&nbsp;能量</span> -->
            {{ $t("global.providedUsersEnergy") }}
          </div>
        </div>
        <div class="content-item-wrap">
          <div class="num">
            {{ toLocaleString(rent.totalTrx / 1000000) }}
          </div>
          <div class="name">
            <!-- 累计为用户节省<span class="sign-name">&nbsp;TRX</span> -->
            {{ $t("global.saveUserTrx") }}
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐奖励 -->
    <div class="recommend-reward">
      <div class="title">{{ $t("global.recommendReward") }}</div>
      <div class="recommend-reward-wrap">
        <div class="reward-detail-content-wrap">
          <div class="reward-detail-item-wrap">
            <img class="reward-icon" src="/img/icon-1.png" alt="" />
            <div class="reward-detail-wrap">
              <div class="reward-name">
                {{ $t("global.walletBalance") }}
              </div>
              <div class="reward-num">
                {{ accountResouce.balance || 0 }} TRX
              </div>
            </div>
          </div>
          <div class="reward-detail-item-wrap">
            <img class="reward-icon" src="/img/icon-2.png" alt="" />
            <div class="reward-detail-wrap">
              <div class="reward-name">{{ $t("global.gainedReward") }}</div>
              <div class="reward-num">0.00</div>
            </div>
          </div>
          <div class="reward-detail-item-wrap">
            <img class="reward-icon" src="/img/icon-3.png" alt="" />
            <div class="reward-detail-wrap">
              <div class="reward-name">
                {{ $t("global.invitedNumbers") }}
              </div>
              <div class="reward-num">0.00</div>
            </div>
          </div>
        </div>
        <div class="recommend-url-wrap">
          <div class="flex-space">
            <div class="recommend-url-tips">
              {{ $t("global.copyLinkTips") }}
            </div>
            <div class="receive-award" @click="changeStatus('receiveAward')">
              {{ $t("global.receiveAward") }}
            </div>
          </div>
          <div class="recommend-url-content-wrap" @click="copyText">
            <div class="url-content-wrap">
              {{ ownerAddress || $t("global.linkWallet") }}
            </div>
            <div class="copy-url-line"></div>
            <img class="copy-img" src="/img/copy.png" alt="" />
            <div class="copy-btn">{{ $t("global.copyToClipboard") }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 资源租赁 -->
    <div class="resource-lease-wrap">
      <div class="title">{{ $t("global.resourceType") }}</div>
      <div class="resource-lease-content-wrap">
        <div class="resource-lease-content-form">
          <a-form name="formState" :model="formState">
            <a-form-item v-bind="validateInfos.receiverAddress">
              <a-row>
                <a-col :span="5">
                  <div class="color-1 font-24 form-item-name">
                    {{ $t("global.resourceReceAddress") }}
                  </div>
                </a-col>
                <a-col :span="19">
                  <a-input
                    v-model:value="formState.receiverAddress"
                    :placeholder="t('tip.tronAddress')"
                  ></a-input>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-bind="validateInfos.resource">
              <a-row>
                <a-col :span="5">
                  <div class="color-1 font-24 form-item-name">
                    {{ $t("global.resourceType") }}
                  </div>
                </a-col>
                <a-col :span="19">
                  <div class="form-item-value">
                    <a-radio-group v-model:value="formState.resource">
                      <a-radio
                        value="ENERGY"
                        class="font-24"
                        style="color: white"
                        >{{ $t("global.energy") }}</a-radio
                      >
                      <a-radio
                        value="BANDWIDTH"
                        class="font-24"
                        style="color: white"
                        >{{ $t("global.bandwidth") }}</a-radio
                      >
                    </a-radio-group>
                  </div>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-bind="validateInfos.amount">
              <a-row>
                <a-col :span="5">
                  <div class="color-1 font-24 form-item-name">
                    {{ $t("global.numResource") }}
                  </div>
                </a-col>
                <a-col :span="19">
                  <a-input-number
                    v-if="formState.resource === 'ENERGY'"
                    :placeholder="
                      t('tip.pledgeEnergy', {
                        amount: config.minEnergyNumber,
                      })
                    "
                    :precision="0"
                    v-model:value="formState.amount"
                    :min="config.minEnergyNumber"
                  />
                  <a-input-number
                    v-else
                    :placeholder="
                      t('global.pledegBandWidth', {
                        amount: config.minBandwidthNumber,
                      })
                    "
                    :precision="0"
                    v-model:value="formState.amount"
                    :min="config.minBandwidthNumber"
                  />
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item v-bind="validateInfos.unitPrice">
              <a-row>
                <a-col :span="5">
                  <div class="color-1 font-24 form-item-name">
                    {{ $t("global.unitPricDay") }}
                  </div>
                </a-col>
                <a-col :span="19">
                  <a-input-number
                    :precision="0"
                    v-if="formState.resource === 'ENERGY'"
                    v-model:value="formState.unitPrice"
                    :min="config.energyPrice"
                  />
                  <a-input-number
                    v-else
                    :precision="0"
                    v-model:value="formState.unitPrice"
                    :min="config.bandwidthPrice"
                  />
                </a-col>
              </a-row>
            </a-form-item>
            <div>
              <a-row>
                <a-col :span="5">
                  <div class="color-1 font-24 form-item-name">
                    {{ $t("global.orderAmount") }}
                  </div>
                </a-col>
                <a-col :span="19">
                  <div class="form-item-value">
                    <span
                      style="
                        font-style: normal;
                        font-weight: 600;
                        font-size: 24px;
                        line-height: 24px;
                        color: #ffcc17;
                        margin-right: 4px;
                      "
                      >{{ needTrxCount || 0 }}</span
                    >
                    <span
                      style="
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 22px;
                        color: #ffcc17;
                        margin-right: 12px;
                      "
                      >TRX</span
                    >
                    <span
                      style="
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 22px;
                        color: #ffcc17;
                        margin-right: 4px;
                      "
                      >{{ $t("global.burnTrxTips") }}</span
                    >
                    <span
                      style="
                        font-style: normal;
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 24px;
                        color: #ffffff;
                        margin-right: 4px;
                      "
                      >{{ saveTrx || 0 }}</span
                    >
                    <span
                      style="
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 22px;
                        color: #ffffff;
                      "
                      >TRX</span
                    >
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-form>
        </div>
        <a-button
          class="place-order-button"
          type="primary"
          shape="round"
          size="large"
          @click="submitFreeze"
          :disabled="!ownerAddress"
          >{{ $t("global.placeOrder") }}</a-button
        >
      </div>
    </div>
    <!-- 当前订单 -->
    <div class="current-order-wrap">
      <div class="title">
        {{ $t("global.currentOrder") }}
      </div>
      <div class="current-order-content-wrap">
        <div style="width: 100%">
          <a-select
            style="width: 288px"
            v-model:value="currentType"
            @change="orderTypeChange"
          >
            <a-select-option value="unitPrice">{{
              $t("global.highestPrice")
            }}</a-select-option>
            <a-select-option value="aCommission">{{
              $t("global.earnings")
            }}</a-select-option>
          </a-select>
        </div>
        <div style="width: 100%">
          <div class="order-table-header-wrap">
            <a-row>
              <a-col :span="9">
                <div class="order-table-header-item">
                  {{ $t("global.orderList") }}
                </div>
              </a-col>
              <a-col :span="9">
                <div class="order-table-header-item">
                  {{ $t("global.sellerIncome") }}
                </div>
              </a-col>
              <a-col :span="6">
                <div class="order-table-header-item">
                  {{ $t("global.operation") }}
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="order-table-body-wrap">
            <div
              class="order-table-body-row"
              v-for="(record, i) in tableData"
              :key="i"
            >
              <a-row>
                <a-col :span="9">
                  <div class="order-table-body-item">
                    <div class="body-item-line">
                      <span class="line-name"
                        >{{ $t("global.priceOfDay") }}：</span
                      >
                      <span class="line-num">{{ record.unitPrice }}</span>
                      <span class="line-unit">sun</span>
                    </div>
                    <div class="body-item-line">
                      <span class="line-name"
                        >{{ $t("global.bandwidth") }}：</span
                      >
                      <span class="line-num">{{ record.resourceValue }}</span>
                    </div>
                  </div>
                </a-col>
                <a-col :span="9">
                  <div class="order-table-body-item">
                    <div class="body-item-line">
                      <span class="line-name">{{ $t("global.income") }}：</span>
                      <span class="line-num">{{
                        (record.aCommission / 1000000).toFixed(2)
                      }}</span>
                      <span class="line-unit">TRX</span>
                    </div>
                    <div class="body-item-line">
                      <span class="line-name">{{ $t("global.freeze") }}：</span>
                      <span class="line-num"
                        >{{ parseInt(record.frozenBalance / 1000000) }}TRX</span
                      >
                    </div>
                  </div>
                </a-col>
                <a-col :span="6">
                  <div class="order-table-body-item operation-btn-wrap">
                    <a-button
                      class="sell-button"
                      type="primary"
                      shape="round"
                      size="small"
                      :disabled="!ownerAddress"
                      style="margin: 0 auto"
                      @click="submitSoldForm(record)"
                      >{{ $t("global.sell") }}</a-button
                    >
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="no-data" v-if="tableData.length === 0">
              {{ $t("global.noDate") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed, watch, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message, Form, Modal } from "ant-design-vue";
import { useMediaQuery, useClipboard, useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { AES } from "crypto-js";
import { sellTip, shardText, copyTextFunc } from "../../utils/utils";
import {
  freeze as freezeApi,
  getConfig as getConfigApi,
  getOrderList,
  sellApi,
  getOrderApi,
  getOrderByIdWriting,
  getOrderByIdReWriting,
  getRentInfoApi,
  verifyRepeatApi,
  isBinding as isBindingApi,
  createBining,
  currentLists,
  currentInfo,
} from "../../api/server";
import { getAccountv2 as getAccountApi, searchAddress } from "../../api/http";
import { useSpinningStore, useGlobalStore } from "../../store/global";
const isMobile = useMediaQuery("(max-width: 750px)");

const rent = ref({ totalBandWidth: 0, totalEnergy: 0, totalTrx: 0 });
// 账户资源
const accountResouce = ref({});
const ownerAddress = ref();
const useForm = Form.useForm;
const { t } = useI18n();
const tronWeb = ref();
const currentType = ref();
const router = useRouter();
const route = useRoute();
// 表格数据
const tableData = ref([]);
const status = ref("home");
const config = ref({});
const isBinding = ref(false);

const currentListsTotal = ref(0);
const info = ref({
  totalSun: 0,
  canReceive: 0,
});

const useStore = useSpinningStore();
const globalSotre = useGlobalStore();

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

const changeStatus = (v) => {
  status.value = v;
  router.push(v);
  orderTypeChange();
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

// 获取配置
const getConfig = async () => {
  const { data } = await getConfigApi();
  config.value = { ...data.config, address: data.address };
  window.sessionStorage.setItem("c", data.address);
  formState.amount = config.value.minEnergyNumber;
  formState.unitPrice = config.value.energyPrice;
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

// 将sun转换成trx单位
const fromSun = (val) => (val ? val / 1000000 : 0);

// 将trx转换成sun单位
const toSun = (val) => parseInt(val * 1000000);

// 千分位
const toLocaleString = (val) => val.toLocaleString();

const copyText = () => {
  // const { copy } = useClipboard({
  //   source: shardText(ownerAddress.value),
  // });
  // copy();
  copyTextFunc(shardText(ownerAddress.value, localStorage.getItem("language")));
  message.info("复制成功，快去分享吧");
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

  // const r = await searchAddress({ term: values.receiverAddress });
  // if (r.length === 0) {
  //   message.warn(t("tip.activeAddress"));
  //   return;
  // }

  if (+needTrxCount.value > +accountResouce.value.balance) {
    message.warn(t("账户余额不足"));
    return;
  }
  try {
    useStore.setSpinning(true);
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
        await isBindingFun(ownerAddress.value, formData.commission);
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
    useStore.setSpinning(false);
  }
};

// 提交出售表单
const submitSoldForm = async (record) => {
  if (parseInt(record.frozenBalance) / 1000000 > accountResouce.value.balance) {
    message.warning("账户余额不足");
    return;
  }
  const r = await verifyRepeatApi({
    resource: record.resource,
    sellerAddress: ownerAddress.value,
    receiverAddress: record.receiverAddress,
  });
  Modal.confirm({
    title: "出租确认",
    icon: () => null,
    content: r.message,
    onOk: async () => {
      try {
        useStore.setSpinning(true);
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
              parseInt(data.frozenBalance),
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
        useStore.setSpinning(false);
      }
    },
  });
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

const isBindingFun = async (recommendedAddress, commission) => {
  if (route.query.address) {
    const recommenderAddress = route.query.address;
    if (recommendedAddress === recommenderAddress) return;
    const isAddress = tronWeb.value.isAddress(recommenderAddress);
    if (isAddress) {
      // const r = await searchAddress({ term: recommenderAddress });
      // if (r.length === 0) {
      //   return;
      // }
      const { data = false } = await isBindingApi({
        recommenderAddress,
        recommendedAddress,
      });
      isBinding.value = data;
      if (!data) {
        const res = await createBining({
          recommenderAddress,
          recommendedAddress,
          commission,
        });
        console.log(res);
      }
    }
  }
};

// 链接钱包
const linkWallet = async () => {
  if (!window.tronWeb) {
    message.warning(t("tip.tip5"));
    return;
  }
  tronWeb.value = window.tronWeb;
  globalSotre.setAddress(window.tronWeb.defaultAddress.base58);
  ownerAddress.value = globalSotre.getAddress;
  formState.ownerAddress = ownerAddress.value;
  formState.receiverAddress = ownerAddress.value;
  window.sessionStorage.setItem("ownerAddress", ownerAddress.value);
  await getAccount();
  getCurrentLists();
  getCurrentInfo();
};

const getCurrentLists = async () => {
  const { data } = await currentLists({
    recommendedAddress: ownerAddress.value,
  });
  currentListsTotal.value = data.length || 0;
};

const getCurrentInfo = async () => {
  const { data } = await currentInfo({
    recommendedAddress: ownerAddress.value,
  });
  console.log(data);
  info.value = data;
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
</script>
<style lang="less" scoped>
.flex-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .receive-award {
    width: 100px;
    text-align: center;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.85);
    padding: 4px 6px;
    background-color: rgb(187, 179, 179);
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>

<style lang="less">
.sping {
  .ant-spin-text {
    padding: 0 20px;
    font-weight: bold;
    font-size: 30px;
    color: rgb(220, 56, 56);
    text-shadow: none !important;
    opacity: 1;
  }

  & /deep/ .ant-spin-container::after {
    background: rgb(255, 0, 0);
  }

  .ant-spin-blur::after {
    opacity: 0.6;
  }
}
</style>
