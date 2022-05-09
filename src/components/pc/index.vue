<template>
  <a-spin :spinning="spinning" :tip="$t('tip.spin')">
    <div class="pc-wrap">
      <div class="header">
        <div class="logo-wrap">
          <img class="logo" src="/img/logo-pc.png" alt="logo" srcset="" />
          <span class="logo-name">tron energy-sharing</span>
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
  </a-spin>
</template>
<script>
import { defineComponent } from "vue";
import index from "../index";
export default defineComponent({
  ...index,
});
</script>

<style lang="less">
@import "index.less";
</style>
