<template>
    <a-layout-header>
        <div class="flex-wrap">
            <div class="title">
                <a-space>
                    <!-- <img width="32" src="/favicon.jpg" alt /> -->
                    <span>{{$t('global.title')}}</span>
                </a-space>
            </div>
            <a-button shape="round" v-if="!ownerAddress" @click="linkWallet" type="primary">
                <ApiOutlined />{{$t('global.LinkWallet')}}
            </a-button>
        </div>
    </a-layout-header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { message } from "ant-design-vue";
import {
    ApiOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
    components: { ApiOutlined },
    emits: ['change'],
    setup(_props, { emit }) {
        const ownerAddress = ref()

        const linkWallet = async () => {
            if (window.tronWeb) {
                if (window.tronWeb.fullNode.host !== "https://api.trongrid.io") {
                    ownerAddress.value = window.tronWeb.defaultAddress.base58;
                    emit('change', window.tronWeb, ownerAddress.value)
                } else {
                    message.warning("请切换到TRON测试网使用");
                }
            } else {
                message.warning("请下载波宝钱包浏览器插件 : https://www.tronlink.org/cn/");
            }
        };

        return {
            ownerAddress,
            linkWallet
        }
    }
})
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