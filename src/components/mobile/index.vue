<template>
  <a-spin :spinning="spinning" :tip="$t('tip.spin')">
    <div class="mobile-wrap">
      <header>
        <a-space>
          <img class="logo" style="width: 26px" src="/img/logo-pc.png" />
          <span>tron energy-sharing</span>
        </a-space>
        <a-button
          v-if="!ownerAddress"
          type="primary"
          shape="round"
          size="small"
          @click="linkWallet"
          >{{ $t("global.LinkWallet") }}</a-button
        >
        <img class="line" src="/img/line.png" @click="drawerVisible = true" />
      </header>

      <section v-if="status === 'home'">
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

      <section v-if="status === 'home'">
        <div class="title font-36">{{ $t("global.recommendReward") }}</div>
        <div class="data-box m36">
          <div class="data-box-content">
            <div class="data-box-left">
              <img class="icon" src="/img/icon-1.png" alt="" />
              <span class="color-1"
                >&emsp;{{ $t("global.walletBalance") }}</span
              >
            </div>
            <div class="color-2">{{ accountResouce.balance || 0 }} TRX</div>
          </div>
          <div class="data-box-content">
            <div class="data-box-left">
              <img class="icon" src="/img/icon-2.png" alt="" />
              <span class="color-1">&emsp;{{ $t("global.gainedReward") }}</span>
            </div>
            <div class="color-2">0 TRX</div>
          </div>
          <div class="data-box-content">
            <div class="data-box-left">
              <img class="icon" src="/img/icon-3.png" alt="" />
              <span class="color-1"
                >&emsp;{{ $t("global.invitedNumbers") }}</span
              >
            </div>
            <div class="color-2">0</div>
          </div>

          <div class="line"></div>

          <div class="copy-text">{{ $t("global.copyLinkTips") }}</div>

          <div class="copy-box" @click="copyText">
            <div class="copy-url">
              {{ ownerAddress || $t("global.linkWallet") }}
            </div>
            <div class="copy-line"></div>
            <img class="copy-img" src="/img/copy.png" alt="" />
          </div>
        </div>
      </section>

      <section v-if="status === 'home'">
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
                >{{ $t("global.placeOrder") }}</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </section>

      <section
        v-if="status === 'home' || status === 'myOrder' || status == 'date'"
      >
        <div class="title font-36" v-if="status === 'home'">
          {{ $t("global.currentOrder") }}
        </div>
        <div class="title font-36" v-if="status === 'myOrder'">
          {{ $t("global.myOrder") }}
        </div>
        <div class="title font-36" v-if="status === 'date'">
          {{ $t("global.recentOrders") }}
        </div>

        <div class="data-box">
          <a-select
            v-if="status === 'home'"
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
                    <span class="label">{{ $t("global.priceOfDay") }}：</span>
                    <span>{{ parseInt(record.aCommission / 1000000) }}</span>
                    <span>TRX</span>
                  </div>
                  <div>
                    <span class="label">{{ $t("global.freeze") }}：</span>
                    <span>{{ record.frozenBalance / 1000000 }}TRX</span>
                  </div>
                </div>
                <div class="content-action">
                  <a
                    v-if="status === 'date'"
                    :href="`https://tronscan.org/#/transaction/${record.hash}`"
                    target="_blank"
                    style="font-size: 14px"
                    >{{ $t("global.detail") }}</a
                  >
                  <a-button
                    v-if="status === 'home'"
                    class="sell-button"
                    type="primary"
                    shape="round"
                    size="small"
                    :disabled="!ownerAddress"
                    style="margin: 0 auto"
                    @click="submitSoldForm(record)"
                    >{{ $t("global.sell") }}
                  </a-button>
                  <a-button
                    v-if="status === 'myOrder'"
                    class="sell-button"
                    type="primary"
                    shape="round"
                    size="small"
                    :disabled="record.status !== 0"
                    style="margin: 0 auto"
                    @click="undo(record)"
                    >{{ $t("global.cancelOrder") }}
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

      <section v-if="status === 'sellerEntery'">
        <div class="data-box">
          <h1>{{ $t("global.selleryEntry") }}</h1>
          {{ $t("global.selleryEntryContent1") }}
          <a target="_blank" href="https://t.me/tronenergysharing"
            >https://t.me/tronenergysharing</a
          >{{ $t("global.selleryEntryContent2") }}<br />
          {{ $t("global.selleryEntryContent3") }}
          <br />
        </div>
      </section>

      <section v-if="status === 'noticeCenter'">
        <div class="data-box">
          <h1>{{ $t("global.announcementCenter") }}</h1>
          <div>{{ $t("global.latestAnnouncement") }}</div>
          <div>
            {{ $t("global.announcementCenterP1") }}<br />
            {{ $t("global.announcementCenterP2") }}<br />
            {{ $t("global.announcementCenterP3") }}<br />
            {{ $t("global.announcementCenterP4") }}<br />
            {{ $t("global.announcementCenterP5") }}<br />
            {{ $t("global.announcementCenterP6")
            }}<a target="_blank" href="https://jxgamefi.com"
              >https://jxgamefi.com</a
            ><br />
            {{ $t("global.communityTwitter")
            }}<a target="_blank" href="https://t.me/wdccn">https://t.me/wdccn</a
            ><br />
            {{ $t("global.numberAirdrops") }}0.2<br />
            {{ $t("global.totalAirdrop") }}2000<br />
            {{ $t("global.contractAddress") }}<br />
            TA74PoX3vgpZfghFJDB3sog7mfYRkjWQwW<br />
            {{ $t("global.addressOfPeriod") }}<br />
          </div>
        </div>
      </section>

      <section v-if="status === 'helpCenter'">
        <div class="data-box">
          <h1>{{ $t("global.helpCenter") }}</h1>
          <div>
            <h2>{{ $t("global.engeryAndBandWidth") }}</h2>
            <p>
              {{ $t("global.engeryAndBandWidthP1") }}
            </p>
            <h2>{{ $t("global.basicOperation") }}</h2>
            <p>
              ·{{ $t("global.placeOrder") }} <br />
              {{ $t("global.placeOrderTips") }}<br />
              ·{{ $t("global.unitPrice") }}<br />
              {{ $t("global.unitPriceTips") }}<br />
              ·{{ $t("global.cancelOrder") }}<br />
              {{ $t("global.cancelOrderTips") }}<br />
              ·{{ $t("global.sell") }}<br />
              {{ $t("global.sellTips") }}<br />
            </p>
            <h2>{{ $t("global.security") }}</h2>
            <p>
              {{ $t("global.securityTips1") }}<br />
              {{ $t("global.securityTips2") }}<br />
            </p>
            <div>{{ $t("global.teamName") }}</div>
          </div>
        </div>
      </section>

      <a-drawer
        :title="$t('global.more')"
        placement="right"
        :closable="false"
        v-model:visible="drawerVisible"
      >
        <div v-if="ownerAddress">
          {{ $t("global.location") }} {{ uzipAddress(ownerAddress) }}
        </div>
        <div v-else>
          {{ $t("global.location")
          }}<a-button
            v-if="!ownerAddress"
            type="primary"
            shape="round"
            size="small"
            @click="linkWallet"
            >{{ $t("global.LinkWallet") }}</a-button
          >
        </div>
        <a-divider />
        <div
          @click="changeStatus('home')"
          :class="status === 'home' && 'actived'"
        >
          {{ $t("global.homePage") }}
        </div>
        <a-divider />
        <div
          @click="changeStatus('myOrder')"
          :class="status === 'myOrder' && 'actived'"
        >
          {{ $t("global.myOrders") }}
        </div>
        <a-divider />
        <div
          @click="changeStatus('sellerEntery')"
          :class="status === 'sellerEntery' && 'actived'"
        >
          {{ $t("global.sellerEntry") }}
        </div>
        <a-divider />
        <div
          @click="changeStatus('noticeCenter')"
          :class="status === 'noticeCenter' && 'actived'"
        >
          {{ $t("global.announcementCenter") }}
        </div>
        <a-divider />
        <div
          @click="changeStatus('helpCenter')"
          :class="status === 'helpCenter' && 'actived'"
        >
          {{ $t("global.helpCenter") }}
        </div>
        <a-divider />
        <div
          @click="changeStatus('date')"
          :class="status === 'date' && 'actived'"
        >
          {{ $t("global.recentTransactions") }}
        </div>
        <a-divider />
        <a-space>
          <div :class="lang === 'zh' && 'actived'" @click="changeLang('zh')">
            中文
          </div>
          /
          <div :class="lang === 'en' && 'actived'" @click="changeLang('en')">
            En
          </div>
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
  color: rgb(197, 237, 19);
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

.ant-divider-horizontal {
  margin: 10px 0;
}
</style>
