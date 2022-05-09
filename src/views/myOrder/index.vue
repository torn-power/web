<template>
  <section v-if="isMobile">
    <div class="title font-36">
      {{ $t("global.myOrder") }}
    </div>

    <div class="data-box">
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
                <span>{{ (record.aCommission / 1000000).toFixed(2) }}</span>
                <span>TRX</span>
              </div>
              <div>
                <span class="label">{{ $t("global.freeze") }}：</span>
                <span>{{ record.frozenBalance / 1000000 }}TRX</span>
              </div>
            </div>
            <div class="content-action">
              <a-button
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
  <div v-else class="current-order-wrap">
    <div class="title">
      {{ $t("global.myOrder") }}
    </div>
    <div class="current-order-content-wrap">
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
                      parseInt(record.aCommission / 1000000)
                    }}</span>
                    <span class="line-unit">TRX</span>
                  </div>
                  <div class="body-item-line">
                    <span class="line-name">{{ $t("global.freeze") }}：</span>
                    <span class="line-num"
                      >{{ record.frozenBalance / 1000000 }}TRX</span
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
                    :disabled="record.status !== 0"
                    style="margin: 0 auto"
                    @click="undo(record)"
                    >{{ $t("global.cancelOrder") }}</a-button
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
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { message } from "ant-design-vue";
import { useMediaQuery } from "@vueuse/core";
import { getOrderList } from "../../api/server";

const { t } = useI18n();
const isMobile = useMediaQuery("(max-width: 750px)");
// 表格数据
const tableData = ref([]);

const orderTypeChange = async (v) => {
  if (!window.tronWeb) {
    message.warning(t("tip.tip5"));
    return;
  }
  if (!window.tronWeb.defaultAddress.base58) {
    message.warning("请链接你的钱包");
    return;
  }
  tableData.value = [];
  const { data } = await getOrderList({
    receiverAddress: window.tronWeb.defaultAddress.base58,
  });
  tableData.value = data.results;
};

onMounted(() => {
  orderTypeChange();
});
</script>
