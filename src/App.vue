<template>
  <a-spin :spinning="spinning" tip="交易进行中，请稍后">
    <Mobile v-if="isMobile" />
    <PC v-else />

    <footer class="footer">
      <img class="logo" src="/img/logo.png" alt="logo" srcset="" />
    </footer>
  </a-spin>
</template>
<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import Mobile from "./components/mobile/index.vue";
import PC from "./components/pc/index.vue";

const { t } = useI18n();
const isMobile = useMediaQuery("(max-width: 750px)");

const spinning = ref(false);
</script>

<style lang="less">
.footer {
  width: 100%;
  height: 40px;
  background: #1d0f3d;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 79px;
  }
}
</style>
