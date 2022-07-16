<template>
  <div class="pc-wrap">
    <div class="header">
      <div class="logo-wrap">
        <img class="logo" src="/img/logo-pc.png" alt="logo" srcset="" />
        <span class="logo-name">Tron energy-sharing</span>
      </div>
      <div class="sub">
        <div
          @click="changeStatus('home')"
          :class="status === 'home' && 'actived'"
        >
          {{ $t("global.homePage") }}
        </div>
        <div
          @click="changeStatus('myOrder')"
          :class="status === 'myOrder' && 'actived'"
        >
          {{ $t("global.myOrders") }}
        </div>
        <div
          v-if="ownerAddress"
          @click="changeStatus('receiveAward')"
          :class="status === 'receiveAward' && 'actived'"
        >
          {{ $t("global.receiveAward") }}
        </div>
        <div
          @click="changeStatus('sellerEntery')"
          :class="status === 'sellerEntery' && 'actived'"
        >
          {{ $t("global.sellerEntry") }}
        </div>
        <div
          @click="changeStatus('noticeCenter')"
          :class="status === 'noticeCenter' && 'actived'"
        >
          {{ $t("global.announcementCenter") }}
        </div>
        <div
          @click="changeStatus('drop-activity')"
          :class="status === 'drop-activity' && 'actived'"
        >
          {{ $t("global.dropActivity") }}
        </div>
        <div
          @click="changeStatus('helpCenter')"
          :class="status === 'helpCenter' && 'actived'"
        >
          {{ $t("global.helpCenter") }}
        </div>
        <div
          @click="changeStatus('date')"
          :class="status === 'date' && 'actived'"
        >
          {{ $t("global.recentTransactions") }}
        </div>
      </div>
      <div class="left">
        <a-space>
          <span class="wallte">
            <a-button
              v-if="!ownerAddress"
              type="primary"
              shape="round"
              @click="linkWallet"
              >{{ $t("global.myWallet") }}</a-button
            >
            <div v-if="ownerAddress">
              {{ uzipAddress(ownerAddress) }}
            </div>
          </span>
          <div class="header-line"></div>
          <div class="language-wrap">
            <a-space>
              <div
                :class="lang === 'zh' && 'actived'"
                @click="changeLang('zh')"
              >
                中文
              </div>
              /
              <div
                :class="lang === 'en' && 'actived'"
                @click="changeLang('en')"
              >
                En
              </div>
            </a-space>
          </div>
        </a-space>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useGlobalStore } from "../../store/global";

const drawerVisible = ref(false);
const tronWeb = ref();
const ownerAddress = ref();

const { t } = useI18n();

const status = ref("home");
const router = useRouter();
const route = useRoute();

const globalSotre = useGlobalStore();

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
  globalSotre.setAddress(window.tronWeb.defaultAddress.base58);
  ownerAddress.value = globalSotre.getAddress;
  window.sessionStorage.setItem("ownerAddress", ownerAddress.value);
};

const lang = computed(() => {
  return localStorage.getItem("language") || "zh";
});

watch(
  () => route.path,
  (v) => {
    status.value = v.replace("/", "");
  }
);

onMounted(() => {
  status.value = route.path.replace("/", "");
  linkWallet();
});
</script>

<style lang="less">
@import "index.less";
</style>
