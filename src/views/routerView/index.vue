<template>
  <a-spin class="sping" :spinning="useStore.spinning" :tip="$t('tip.spin')">
    <!-- <component :is="currentView" />
    <footer class="footer" :style="{ height: isMobile ? '40px' : '87px' }">
      <img
        :style="{ width: isMobile ? '79px' : '153px' }"
        src="/img/logo.png"
      />
    </footer> -->
    <h1 align="center">
      diditron为了给广大用户更好的服务 先进行服务升级 预计24小时内恢复服务
      带来不便 敬请谅解
    </h1>
    <h2 align="center">2022-07-09 19:40发布</h2>
    <h3 align="center">
      <a-space>
        <!-- <img src="/telegram.png" width="20" /> -->
        <span>{{ $t("global.telegram") }}:</span>
        <a href="https://t.me/+nW1a9qgsalczNmIx" target="_blank">{{
          $t("global.customServer")
        }}</a>
      </a-space>
      <a-divider />
      <a-space>
        <!-- <img src="/telegram.png" width="20" /> -->
        <span>{{ $t("global.twitter") }}:</span>
        <a
          v-if="lang === 'en'"
          href="https://twitter.com/SharingTron"
          target="_blank"
          >SharingTron</a
        >
        <a v-else href="https://twitter.com/TronSharing" target="_blank"
          >TronSharing</a
        >
      </a-space>
      <a-divider />
    </h3>
  </a-spin>
</template>
<script>
import { watch, ref, defineComponent } from "vue";
import { useMediaQuery } from "@vueuse/core";
import Mobile from "../../components/mobile/index.vue";
import PC from "../../components/pc/index.vue";
import { useSpinningStore } from "../../store/global";

export default defineComponent({
  // components: { Mobile, PC },
  setup() {
    const isMobile = useMediaQuery("(max-width: 750px)");
    const currentView = ref("Mobile");
    const useStore = useSpinningStore();
    watch(
      () => isMobile.value,
      (v) => {
        currentView.value = v ? "Mobile" : "PC";
      },
      { immediate: true }
    );

    return {
      currentView,
      isMobile,
      useStore,
    };
  },
});
</script>

<style lang="less">
.footer {
  width: 100%;
  background: #1d0f3d;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .position {
    position: absolute;
    right: 0;
    bottom: 0px;
  }
}
</style>
