<template>
    <a-carousel v-if="isMobile" dotsClass="dotsClass">
        <a-card style="min-width: 350px">
            <template #title>{{ $t('global.address') }}：{{ ownerAddress || $t('global.linkTip') }}</template>
            <template #extra>
                <RedditOutlined />
            </template>
            <p>{{ $t('global.available') }}: {{ accountResouce.balance || 0 }} TRX</p>
            <p>{{$t('global.freeze')}}: {{ accountResouce.totalFrozen || 0 }} TRX</p>
        </a-card>
        <a-card :title="$t('global.dailyRental')" style="min-width: 350px">
            <p>{{$t('global.totalVolume') }}: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
            <p>{{$t('global.totalSellersIncome')}}: {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX</p>
        </a-card>
    </a-carousel>
    <a-row v-else :gutter="[20, 20]" type="flex" justify="center" align="middle">
        <a-col :xl="6">
            <a-card style="min-width: 350px">
                <template
                    #title
                >{{ $t('global.address') }}：{{ ownerAddress || $t('global.linkTip') }}</template>
                <template #extra>
                    <RedditOutlined />
                </template>
                <p>{{ $t('global.available') }}: {{ accountResouce.balance || 0 }} TRX</p>
                <p>{{ $t('global.freeze') }}: {{ accountResouce.totalFrozen || 0 }} TRX</p>
            </a-card>
        </a-col>
        <a-col :xl="6">
            <a-card :title="$t('global.energy')" style="min-width: 350px">
                <template #extra>
                    <a-space align="center">
                        <span>
                            <a-tooltip :title="$t('global.residualE')">
                                {{ accountResouce.bandwidth?.energyRemaining || 0 }} /
                                {{ accountResouce.bandwidth?.energyLimit || 0 }}
                            </a-tooltip>
                        </span>
                        <ThunderboltOutlined />
                    </a-space>
                </template>
                <p>{{ $t('global.freezeForMyself') }}: {{ accountResouce.frozenForEnergy || 0 }} TRX</p>
                <p>{{ $t('global.freezeForOthers') }}: {{ accountResouce.delegateFrozenForEnergy || 0 }} TRX</p>
            </a-card>
        </a-col>
        <a-col :xl="6">
            <a-card :title="$t('global.bandwidth')" style="min-width: 350px">
                <template #extra>
                    <a-space align="center">
                        <span>
                            <a-tooltip :title="$t('global.residualB')">
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
                <p>{{ $t('global.freezeForMyself') }}: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
                <p>
                    {{ $t('global.freezeForOthers') }}:
                    {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX
                </p>
            </a-card>
        </a-col>
        <a-col :xl="6">
            <a-card :title="$t('global.dailyRental')" style="min-width: 350px">
                <p>{{ $t('global.totalVolume') }}: {{ accountResouce.frozenForBandWidth || 0 }} TRX</p>
                <p>{{ $t('global.totalSellersIncome') }}: {{ accountResouce.delegateFrozenForBandWidth || 0 }} TRX</p>
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

<style lang="less">
.dotsClass {
    button {
        background-color: rgb(116, 109, 109) !important;
    }
    .slick-active > button {
        background-color: #f38031 !important;
    }
}
</style>