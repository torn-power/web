<template>
  <!-- <Mobile /> -->
  <Mobile v-if="isMobile" />
  <PC v-else />
  <footer class="footer" :style="{ height: isMobile ? '40px' : '87px' }">
    <img :style="{ width: isMobile ? '79px' : '153px' }" src="/img/logo.png" />
  </footer>
</template>
<script setup>
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import Mobile from "./components/mobile/index.vue";
import PC from "./components/pc/index.vue";

const { t } = useI18n();
const isMobile = useMediaQuery("(max-width: 750px)");
</script>

<style lang="less">
.footer {
  width: 100%;
  background: #1d0f3d;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
