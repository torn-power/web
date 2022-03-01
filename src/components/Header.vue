<template>
  <a-layout-header>
    <div class="flex-wrap">
      <div class="title">
        <a-space>
          <!-- <img width="32" src="/favicon.jpg" alt /> -->
          <span>{{ $t("global.title") }}</span>
        </a-space>
      </div>
      <a-button
        shape="round"
        v-if="!ownerAddress"
        @click="linkWallet"
        type="primary"
      >
        <ApiOutlined />
        {{ $t("global.LinkWallet") }}
      </a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
// import { message } from "ant-design-vue";
// import { useI18n } from "vue-i18n";

import { ApiOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: { ApiOutlined },
  emits: ["change"],
  setup(_props, { emit }) {
    const ownerAddress = ref();
    // const { t } = useI18n();

    const linkWallet = async () => {
      if (window.tronWeb) {
        console.log(window.tronWeb)
        // if (window.tronLink.ready) {
        // if (window.tronWeb.fullNode.host === "https://api.trongrid.io") {
          ownerAddress.value = window.tronWeb.defaultAddress.base58;
          emit("change", window.tronWeb, ownerAddress.value);
        // } else {
        //   message.warning("请切换到TRON正式网使用");
        // }
        // } else {
        //     message.warning(t('tip.tip5'));
        // }
      // } else {
      //   message.warning(t("tip.tip6") + ": https://www.tronlink.org/cn/");
      // }
      }
    };

    onMounted(() => {
      linkWallet();
      window.addEventListener("message", (e) => {
        if (e.data.message && e.data.message.action == "accountsChanged") {
          linkWallet();
        }
      });
    });

    return {
      ownerAddress,
      linkWallet,
    };
  },
});
</script>

<style lang="less" scoped>
span {
  font-weight: bold;
}
.flex-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
