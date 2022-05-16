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
          <div class="color-2">0 TRX</div>
        </div>
        <div class="data-box-content">
          <div class="data-box-left">
            <img class="icon" src="/img/icon-3.png" alt="" />
            <span class="color-1">&emsp;{{ $t("global.invitedNumbers") }}</span>
          </div>
          <div class="color-2">0</div>
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
<script>
import { defineComponent } from "vue";
import index from "../../components/index";
export default defineComponent({
  ...index,
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
