<template>
  <a-carousel v-if="isMobile" dotsClass="dotsClass">
    <a-card
      :title="$t('global.game1')"
      class="game-card"
      @click="goGame"
      style="min-width: 350px"
    >
      <!-- <p>
          {{ $t("global.totalVolume") }}:
          {{ rent.platformSum / 1000000 || 0 }} TRX
        </p>
        <p>
          {{ $t("global.totalSellersIncome") }}:
          {{ rent.sellerEarnings / 1000000 || 0 }} TRX
      </p>-->
    </a-card>
    <a-card style="min-width: 350px">
      <template #title>{{ $t("global.address") }}：{{ ownerAddress || $t("global.linkTip") }}</template>
      <template #extra>
        <RedditOutlined />
      </template>
      <p>{{ $t("global.available") }}: {{ accountResouce.balance || 0 }} TRX</p>
      <p>{{ $t("global.freeze") }}: {{ accountResouce.totalFrozen || 0 }} TRX</p>
    </a-card>
    <!-- <a-card :title="$t('global.dailyRental')" style="min-width: 350px">
      <p>
        {{ $t("global.totalVolume") }}:
        {{ rent.platformSum / 1000000 || 0 }} TRX
      </p>
      <p>
        {{ $t("global.totalSellersIncome") }}:
        {{ rent.sellerEarnings / 1000000 || 0 }} TRX
      </p>
    </a-card>-->
  </a-carousel>
  <a-row v-else :gutter="[20, 20]" type="flex" justify="center" align="middle">
    <a-col :xl="6">
      <a-card style="min-width: 350px">
        <template #title>{{ $t("global.address") }}：{{ ownerAddress || $t("global.linkTip") }}</template>
        <template #extra>
          <RedditOutlined />
        </template>
        <p>{{ $t("global.available") }}: {{ accountResouce.balance || 0 }} TRX</p>
        <p>{{ $t("global.freeze") }}: {{ accountResouce.totalFrozen || 0 }} TRX</p>
      </a-card>
    </a-col>
    <a-col :xl="6">
      <a-card :title="$t('global.energy')" style="min-width: 350px">
        <template #extra>
          <a-space align="center">
            <span>
              <a-tooltip :title="$t('global.residualE')">
                {{ accountResouce.bandwidth?.energyRemaining || 0 }} /
                {{ accountResouce.bandwidth?.energyLimit || 0 }}
              </a-tooltip>
            </span>
            <ThunderboltOutlined />
          </a-space>
        </template>
        <p>
          {{ $t("global.freezeForMyself") }}:
          {{ accountResouce.frozenForEnergy || 0 }} TRX
        </p>
        <p>
          {{ $t("global.freezeForOthers") }}:
          {{ accountResouce.delegateFrozenForEnergy || 0 }} TRX
        </p>
      </a-card>
    </a-col>
    <a-col :xl="6">
      <a-card :title="$t('global.bandwidth')" style="min-width: 350px">
        <template #extra>
          <a-space align="center">
            <span>
              <a-tooltip :title="$t('global.residualB')">
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
        <p>
          {{ $t("global.freezeForMyself") }}:
          {{ accountResouce.frozenForBandWidth || 0 }} TRX
        </p>
        <p>
          {{ $t("global.freezeForOthers") }}:
          {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX
        </p>
      </a-card>
    </a-col>
    <a-col :xl="6">
      <a-card :title="$t('global.game1')" class="game-card" style="min-width: 350px">
        <!-- <p>
          {{ $t("global.totalVolume") }}:
          {{ rent.platformSum / 1000000 || 0 }} TRX
        </p>
        <p>
          {{ $t("global.totalSellersIncome") }}:
          {{ rent.sellerEarnings / 1000000 || 0 }} TRX
        </p>-->
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent } from "vue";
import {
  RedditOutlined,
  DeploymentUnitOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons-vue";
// import * as orderApi from "../api/server";
// let timer = null;
export default defineComponent({
  components: {
    RedditOutlined,
    DeploymentUnitOutlined,
    ThunderboltOutlined,
  },
  props: {
    accountResouce: {
      type: Object,
      default: () => null,
    },
    ownerAddress: {
      type: String,
      default: "",
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // const rent = ref({ platformSum: 0, sellerEarnings: 0 });

    // const getRentInfo = async () => {
    //   const { data } = await orderApi.getRentInfoApi();
    //   rent.value = data;
    // };

    // onMounted(() => {
    //   getRentInfo();
    //   timer = setInterval(() => {
    //     getRentInfo();
    //   }, 5 * 60 * 1000);
    // });

    // onUnmounted(() => {
    //   clearInterval(timer);
    // });

    const goGame = () => {
      // window.open('/', '_blank')
    }

    return {
      goGame
      // rent,
    };
  },
});
</script>

<style lang="less">
.dotsClass {
  button {
    background-color: rgb(116, 109, 109) !important;
  }
  .slick-active > button {
    background-color: #f38031 !important;
  }
}

.game-card {
  .ant-card-body {
    padding: 0;
    width: 100%;
    height: 120px;
    background-image: url("/game1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
</style>
