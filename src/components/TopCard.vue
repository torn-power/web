<template>
    <a-carousel v-if="isMobile">
        <a-card style="min-width: 350px">
            <template #title>地址：{{ ownerAddress || "请链接你的波场钱包" }}</template>
            <template #extra>
                <RedditOutlined />
            </template>
            <p>可用: {{ accountResouce.balance || 0 }} TRX</p>
            <p>冻结: {{ accountResouce.totalFrozen || 0 }} TRX</p>
        </a-card>
        <a-card title="今日出租情况" style="min-width: 350px">
            <p>平台日总量: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
            <p>商户总收益: {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX</p>
        </a-card>
    </a-carousel>
    <a-row v-else :gutter="[20, 20]" type="flex" justify="center" align="middle">
        <a-col :xl="6">
            <a-card style="min-width: 350px">
                <template #title>地址：{{ ownerAddress || "请链接你的波场钱包" }}</template>
                <template #extra>
                    <RedditOutlined />
                </template>
                <p>可用: {{ accountResouce.balance || 0 }} TRX</p>
                <p>冻结: {{ accountResouce.totalFrozen || 0 }} TRX</p>
            </a-card>
        </a-col>
        <a-col :xl="6">
            <a-card title="能量" style="min-width: 350px">
                <template #extra>
                    <a-space align="center">
                        <span>
                            <a-tooltip title="剩余能量/总能量">
                                {{ accountResouce.bandwidth?.energyRemaining || 0 }} /
                                {{ accountResouce.bandwidth?.energyLimit || 0 }}
                            </a-tooltip>
                        </span>
                        <ThunderboltOutlined />
                    </a-space>
                </template>
                <p>为自己冻结: {{ accountResouce.frozenForEnergy || 0 }} TRX</p>
                <p>为他人冻结: {{ accountResouce.delegateFrozenForEnergy || 0 }} TRX</p>
            </a-card>
        </a-col>
        <a-col :xl="6">
            <a-card title="带宽" style="min-width: 350px">
                <template #extra>
                    <a-space align="center">
                        <span>
                            <a-tooltip title="剩余带宽/总带宽">
                                {{
                                    accountResouce.bandwidth?.freeNetRemaining +
                                        accountResouce.bandwidth?.netRemaining || 0
                                }}
                                /
                                {{
                                    accountResouce.bandwidth?.freeNetLimit +
                                        accountResouce.bandwidth?.netLimit || 0
                                }}
                            </a-tooltip>
                        </span>
                        <DeploymentUnitOutlined />
                    </a-space>
                </template>
                <p>为自己冻结: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
                <p>
                    为他人冻结:
                    {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX
                </p>
            </a-card>
        </a-col>
        <a-col :xl="6">
            <a-card title="今日出租情况" style="min-width: 350px">
                <p>平台日总量: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
                <p>商户总收益: {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX</p>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { defineComponent } from 'vue'
import {
    RedditOutlined,
    DeploymentUnitOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
    components: {
        RedditOutlined,
        DeploymentUnitOutlined,
        ThunderboltOutlined
    },
    props: {
        accountResouce: {
            type: Object,
            default: () => null
        },
        ownerAddress: {
            type: String,
            default: ''
        },
        isMobile: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        return {}
    }
})

</script>