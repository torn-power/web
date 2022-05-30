<template>
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
    <router-view></router-view>
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
        @click="changeStatus('receiveAward')"
        :class="status === 'receiveAward' && 'actived'"
      >
        {{ $t("global.receiveAward") }}
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
        <!-- <img src="/telegram.png" width="20" /> -->
        <span>{{ $t("global.customServer") }}:</span>
        <a href="https://t.me/tronenergysharing" target="_blank"
          >@Tron energy-sharing</a
        >
      </a-space>
      <a-divider />
      <a-space>
        <!-- <img src="/telegram.png" width="20" /> -->
        <span>{{ $t("global.telegram") }}:</span>
        <a href="https://t.me/tronenergysharing" target="_blank"
          >@Tron energy-sharing</a
        >
      </a-space>
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
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
const drawerVisible = ref(false);
const tronWeb = ref();
const ownerAddress = ref();

const { t } = useI18n();

const status = ref("home");
const router = useRouter();
const route = useRoute();

const changeLang = (type) => {
  localStorage.setItem("language", type);
  location.reload();
};

const changeStatus = (v) => {
  status.value = v;
  router.push(v);
  drawerVisible.value = false;
};

const uzipAddress = (str) => {
  if (!str) return "请链接钱包";
  return str.substr(0, 8) + "..." + str.substr(-4, 4);
};

// 链接钱包
const linkWallet = async () => {
  if (!window.tronWeb) {
    message.warning(t("tip.tip5"));
    return;
  }
  tronWeb.value = window.tronWeb;
  ownerAddress.value = window.tronWeb.defaultAddress.base58;
  window.sessionStorage.setItem("ownerAddress", ownerAddress.value);
};

const lang = computed(() => {
  return localStorage.getItem("language") || "zh";
});

onMounted(() => {
  linkWallet();
});
</script>

<style lang="less">
@import "index.less";
</style>
