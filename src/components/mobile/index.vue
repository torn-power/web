<template>
  <a-spin :spinning="spinning" tip="交易进行中，请稍后">
    <div class="mobile-wrap">
      <header>
        <img class="logo" src="/img/logo.png" />
        <a-button
          v-if="!ownerAddress"
          type="primary"
          shape="round"
          size="small"
          @click="linkWallet"
          >链接钱包</a-button
        >
        <img class="line" src="/img/line.png" @click="drawerVisible = true" />
      </header>

      <section>
        <div class="title">共享数据</div>
        <div class="data-box">
          <div class="data-box-content">
            <div class="data-box-left">
              <span class="color-1" style="font-weight: 600"
                >累计为用户提供</span
              >
              <span>&nbsp;带宽</span>
            </div>
            <div class="color-3">0</div>
          </div>
          <div class="data-box-content">
            <div class="data-box-left">
              <span class="color-1" style="font-weight: 600"
                >累计为用户提供</span
              >
              <span>&nbsp;能量</span>
            </div>
            <div class="color-3">0</div>
          </div>
          <div class="data-box-content">
            <div class="data-box-left">
              <span class="color-1" style="font-weight: 600"
                >累计为用户节省</span
              >
              <span>&nbsp;TRX</span>
            </div>
            <div class="color-3">0</div>
          </div>
        </div>
      </section>

      <section>
        <div class="title font-36">推荐奖励</div>
        <div class="data-box m36">
          <div class="data-box-content">
            <div class="data-box-left">
              <img class="icon" src="/img/icon-1.png" alt="" />
              <span class="color-1">&emsp;钱包余额</span>
            </div>
            <div class="color-2">0</div>
          </div>
          <div class="data-box-content">
            <div class="data-box-left">
              <img class="icon" src="/img/icon-2.png" alt="" />
              <span class="color-1">&emsp;获得的奖励</span>
            </div>
            <div class="color-2">0</div>
          </div>
          <div class="data-box-content">
            <div class="data-box-left">
              <img class="icon" src="/img/icon-3.png" alt="" />
              <span class="color-1">&emsp;已邀请人数</span>
            </div>
            <div class="color-2">0</div>
          </div>

          <div class="line"></div>

          <div class="copy-text">复制您的推荐链接，邀请并获得海量奖励</div>

          <div class="copy-box" @click="copyText">
            <div class="copy-url">
              {{ ownerAddress || "请链接钱包" }}
            </div>
            <div class="copy-line"></div>
            <img class="copy-img" src="/img/copy.png" alt="" />
          </div>
        </div>
      </section>

      <section>
        <div class="title font-36">资源共享</div>
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
                <span class="color-1 font-24">资源类型：</span>
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
                >下单</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </section>

      <section>
        <div class="title font-36">我的订单</div>
        <div class="data-box">
          <a-select style="width: 100%">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
          </a-select>

          <div class="data-table">
            <div class="data-table-header">
              <div>订单信息</div>
              <div>订单信息</div>
              <div class="action">操作</div>
            </div>
            <div class="data-table-body">
              <div class="content" v-for="(v, i) in 10" :key="i">
                <div class="content-data">
                  <div>
                    <span class="label">价格/天：</span>
                    <span>500</span>
                    <span>sun</span>
                  </div>
                  <div>
                    <span class="label">带宽： </span>
                    <span>1,233311</span>
                  </div>
                </div>
                <div class="content-data">
                  <div>
                    <span class="label">收入：</span>
                    <span>500</span>
                    <span>sun</span>
                  </div>
                  <div>
                    <span class="label">冻结：</span>
                    <span>1,2333111</span>
                  </div>
                </div>
                <div class="content-action">
                  <a-button
                    class="sell-button"
                    type="primary"
                    shape="round"
                    size="small"
                    style="margin: 0 auto"
                    >出售
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a-drawer
        title="更多"
        placement="right"
        :closable="false"
        v-model:visible="drawerVisible"
      >
        <div v-if="ownerAddress">地址：{{ uzipAddress(ownerAddress) }}</div>
        <a-space>
          <div class="actived">中文</div>
          /
          <div>En</div>
        </a-space>
      </a-drawer>
    </div>
  </a-spin>
</template>
<script>
import { defineComponent } from "vue";
import index from "../index";
export default defineComponent({
  ...index,
});
</script>

<style lang="less" scoped>
@import "index.less";

.actived {
  color: rgb(107, 107, 141);
}
</style>
<style lang="less">
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background-color: #2e3057 !important;
  border: none;
  color: white;
  height: 36px;
  padding-top: 3px;
}

.ant-select-dropdown {
  background-color: #2e3057;
  color: white;
}

.ant-select-item-option {
  color: white;
  height: 36px;
}

.ant-select-item-option-active {
  color: white;
  background-color: #1d1e3b !important;
}

.ant-select-arrow {
  color: white;
}

.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  color: rgb(255, 255, 255);
}
</style>
