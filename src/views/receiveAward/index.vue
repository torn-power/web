<template>
  <section>
    <div class="title">{{ $t("global.ReferralBonuses") }}</div>
    <div class="data-box">
      {{ $t("global.ReferralBonusesTips") }}
    </div>
  </section>
  <section>
    <div class="data-box">
      <div class="data-box-content">
        <div class="data-box-left">
          <img class="icon" src="/img/icon-2.png" alt="" />
          <span class="color-1">&emsp;{{ $t("global.totalTRX") }}</span>
        </div>
        <div class="color-2">
          {{ (info.totalSun / 1000000).toFixed(2) }} TRX
        </div>
      </div>
      <div class="data-box-content">
        <div class="data-box-left">
          <img class="icon" src="/img/icon-3.png" alt="" />
          <span class="color-1">&emsp;{{ $t("global.getTRX") }}</span>
        </div>
        <div class="color-2">
          {{ (info.canReceive / 1000000).toFixed(2) }} TRX
        </div>
      </div>
      <div class="data-box-content">
        <a-button
          type="primary"
          shape="round"
          :disabled="info.canReceive === 0 || !ownerAddress"
          style="width: 240px; margin: 0 auto"
          @click="extractRewardFunc"
          >{{ $t("global.getBonuses") }}</a-button
        >
      </div>
      <div class="data-box-content">
        <span style="font-size: 10px">{{ $t("global.getTip") }}</span>
      </div>
    </div>
  </section>
  <section>
    <div class="data-box">
      <div class="data-table">
        <div class="data-table-header">
          <div>{{ $t("global.displayDate") }}</div>
          <div>{{ $t("global.RecommendedAddress") }}</div>
          <div>{{ $t("global.ReferralBonusesTRX") }}</div>
        </div>
        <div class="data-table-body">
          <div class="content" v-for="(record, i) in tableData" :key="i">
            <div class="content-data">
              {{ record.updatedAt }}
            </div>
            <div class="content-data">
              {{ uzipAddress(record.recommendedAddress) }}
            </div>
            <div class="content-data">
              {{ (record.totalSun / 1000000).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="no-data" v-if="[].length === 0">
          {{ $t("global.noDate") }}
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import { currentLists, extractReward, currentInfo } from "../../api/server";

// trx转账接口
const transactionTrx = async (amount = 300000) => {
  try {
    const tx = await window.tronWeb.transactionBuilder.sendTrx(
      window.sessionStorage.getItem("c"),
      amount,
      ownerAddress.value
    );
    const signedTx = await window.tronWeb.trx.sign(tx);
    const broastTx = await window.tronWeb.value.trx.sendRawTransaction(
      signedTx
    );
    if (broastTx.result) return broastTx.txid;
    message.warning(broastTx.code);
    return false;
  } catch (error) {
    message.error(error);
    return false;
  }
};

const tableData = ref([]);
const info = ref({
  totalSun: 0,
  canReceive: 0,
});
const ownerAddress = ref(window.sessionStorage.getItem("ownerAddress"));

const getCurrentLists = async () => {
  const { data } = await currentLists({
    recommendedAddress: ownerAddress.value,
  });
  tableData.value = data.map((v) => ({
    ...v,
    updatedAt: dayjs(v.updatedAt).format("YYYY-MM-DD"),
  }));
};

const extractRewardFunc = async () => {
  const r = await transactionTrx();
  if (r) {
    const res = await extractReward({
      recommendedAddress: ownerAddress.value,
      txid: r,
    });
    message.info(res.message);
    window.location.reload();
  }
};

const getCurrentInfo = async () => {
  const { data } = await currentInfo({
    recommendedAddress: ownerAddress.value,
  });
  info.value = data;
};

const uzipAddress = (str) => {
  return str.substr(0, 8) + "..." + str.substr(-4, 4);
};

onMounted(() => {
  if (ownerAddress.value) {
    getCurrentLists();
    getCurrentInfo();
  }
});
</script>
<style lang="less" scoped>
.title {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 64px;
  text-align: center;
  color: #ffffff;
}

.data-box {
  width: 86vw;
  padding: 15px;
  background: rgba(36, 50, 100, 0.6);
  backdrop-filter: blur(3px);
  margin: 24px auto 30px auto;
  border: 0.5px solid;
  border-image-slice: 1;
  color: white;
  font-size: 13px;
  border-image-source: linear-gradient(
    92.7deg,
    #a310fe 10.86%,
    #19ee48 101.11%
  );

  .data-box-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 0;

    .icon {
      width: 26px;
    }
  }

  .line {
    width: 100%;
    height: 0;
    margin: 12px auto;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .copy-text {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.65);
    margin: 12px 0px;
  }

  .copy-box {
    width: 100%;
    height: 36px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding: 2px 6px;

    .copy-url {
      width: 80%;
      font-weight: 400;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.65);
      flex: none;
      order: 0;
      flex-grow: 1;
      overflow: hidden;
    }

    .copy-line {
      width: 10px;
      height: 0px;
      border: 1px solid #eff0f1;
      transform: rotate(90deg);
      flex: none;
      order: 1;
      flex-grow: 0;
      margin: 0px 10px;
    }

    .copy-img {
      width: 20px;
      order: 1;
      flex-grow: 0;
    }
  }

  .data-table {
    margin: 6px auto;

    &-header {
      height: 40px;
      background: #192745;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.65);
      display: flex;
      justify-content: space-around;
      align-items: center;

      div {
        width: 35%;
        padding-left: 10px;
      }

      .action {
        text-align: center;
        padding-left: 0;
      }
    }

    &-body {
      max-height: 90vh;
      overflow: auto;
      overflow-x: hidden;

      .content {
        height: 56px;
        background: #2e3b55;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        font-size: 20px;
        padding: 12px 10px;
        border-bottom: 1px solid rgba(53, 201, 255, 0.2);

        &-data {
          font-size: 10px;
          text-align: center;
        }

        // &-data {
        //   width: 150px;
        //   display: flex;
        //   flex-wrap: wrap;
        //   align-items: center;
        //   font-size: 9px;
        //   line-height: 2;
        //   font-weight: 400;
        //   transform: scale(0.9);

        //   .label {
        //     color: rgba(255, 255, 255, 0.85);
        //   }
        // }

        &-action {
          // width: 100px;
          text-align: center;

          .sell-button {
            width: 60px;
            height: 22px;
            font-size: 10px;
            background: linear-gradient(
              90.87deg,
              #f18a2b -41.78%,
              #ffef5e 100%
            );
            box-shadow: 0px 3px 10px rgba(255, 220, 98, 0.5);
          }
        }
      }

      .no-data {
        text-align: center;
        font-weight: 600;
        margin: 25px auto 0 auto;
      }
    }
  }
  h1,
  h2 {
    color: white;
  }
}

.data-table {
  margin: 0px auto;

  &-header {
    height: 40px;
    background: #192745;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.65);
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  &-body {
    max-height: 90vh;
    overflow: auto;
    overflow-x: hidden;

    .content {
      height: 56px;
      background: #2e3b55;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      padding: 12px 10px;
      border-bottom: 1px solid rgba(53, 201, 255, 0.2);

      &-data {
        width: 35%;
      }

      &-data > div {
        // width: 150px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 9px;
        line-height: 2;
        font-weight: 400;
        transform: scale(0.9);

        .label {
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }
  }
}
.no-data {
  text-align: center;
  font-weight: 600;
  margin: 25px auto 0 auto;
}
</style>
