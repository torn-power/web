<template>
  <a-spin class="sping" :spinning="useStore.spinning" :tip="$t('tip.spin')">
    <!-- <component :is="currentView" />
    <footer class="footer" :style="{ height: isMobile ? '40px' : '87px' }">
      <img
        :style="{ width: isMobile ? '79px' : '153px' }"
        src="/img/logo.png"
      />
    </footer> -->
    <h1 align="center">diditron服务升级中 预计24小时内恢复服务 敬请谅解</h1>
    <h2 align="center">2022-07-09 19:30</h2>
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
