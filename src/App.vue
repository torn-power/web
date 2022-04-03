<template>
  <a-layout>
    <a-spin :spinning="spinning" tip="交易进行中，请稍后">
      <Mobile v-if="isMobile" />
      <PC v-else />
    </a-spin>
  </a-layout>
</template>
<script  setup>
import { ref } from 'vue'
import { useMediaQuery } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import Mobile from './components/mobile/index.vue'
import PC from './components/pc/index.vue'

const { t } = useI18n();
const isMobile = useMediaQuery("(max-width: 750px)");

const spinning = ref(false);
</script>