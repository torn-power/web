import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        global: {
            title: 'Tron Energy Sharing',
            address: 'Address',
            LinkWallet: 'Link wallet',
            linkTip: 'Link to your Wallet Please',
            available: 'Available',
            freezeForMyself: 'Freeze for Myself',
            freezeForOthers: 'Freeze for Others',
            energy: 'Energy',
            bandwidth: 'Bandwidth',
            freeze: 'Freeze',
            income: 'Income',
            dailyRental: 'Daily Rental',
            totalVolume: 'Total Volume',
            totalSellersIncome: 'Total Sellers’ Income',
            buyer: 'Buyer',
            seller: 'Seller',
            priceDay: 'Price/Day',
            days: 'days',
            operation: 'Operation',
            sell: 'Sell',
            rent: 'Rent',
            recentTrade: 'Recent Trade',
            myFreezeList: 'My Freeze List',
            order: "Order",
            resource: "Resource",
            Date: 'Date',
            time: 'Time',
            hash: 'Hash',
            currentOrder: 'Current Order',
            highestPrice: 'Highest Price',
            earnings: 'Highest Earnings',
            myOrder: 'My Order',
            remainingAmount: 'Remaining Amount',
            freezeObject: 'Freeze Objects/Quantities',
            expireTime: 'Expire Time',
            success: 'Success',
            fail: 'Fail',
            residualE: 'Residual Energy/TotalEnergy',
            residualB: 'Residual Bandwidth/TotalBandwidth',
            sellResource: 'SellResource',
            cancel: 'Cancel',
            placeOrder: 'Place Order',
            receive: 'Receive',
            type: 'Type',
            chooseBuy: 'ChooseBuy',
            count: 'Count',
            pledge: 'Pledge',
            orderAmount: 'Order Amount',
            yourBlance: 'Your Balance',
            yourAddress: 'Your payment address'
        },
        tip: {
            ownerAddress: 'Please enter your wallet address',
            receiverAddress: 'Please enter the receiving energy address',
            resource: 'Select a resource type',
            amount: 'Please enter the number of resources',
            unitPrice: 'Please enter the unit price you want',
            duration: 'Please enter the duration of pledge',
            tronAddress: 'Please enter a valid wavefield address',
            pledgeEnergy: 'Pledge at least {amount} energy',
            pledegBandWidth: 'Pledge at least {amount} bandwidth',
            freezeTip: 'Freeze for at least 3 days',
            freezeToolTip: 'At least three days according to wave field rules, adjustable later',
            tip1: 'Compared with burning to obtain resource savings',
            tip2: 'Please enter a valid tron wallet payment address',
            tip3: 'You can join the VIP seller pool to automatically sell energy for income, please contact',
            tip4: 'You can also manually sell energy to earn income when there are orders. To get timely order notifications, please follow the following Telegram.',
            tip5:'Your wallet is currently locked',
            tip6:'Please download bo Bo wallet browser plug-in or use in tron chain',
            sell: 'Selling tips',
            knowThe: 'I Know'
        }
    },
    zh: {
        global: {
            title: '波场能量共享',
            address: '地址',
            LinkWallet: '链接钱包',
            linkTip: '请链接你的波场钱包',
            available: '可用',
            freezeForMyself: '为自己冻结',
            freezeForOthers: '为他人冻结',
            energy: '能量',
            bandwidth: '带宽',
            freeze: '冻结',
            income: '收入',
            dailyRental: '今日出租情况',
            totalVolume: '平台日总量',
            totalSellersIncome: '商户总收益',
            buyer: '买家',
            seller: '卖家',
            priceDay: '价格{way}/天',
            days: '天',
            operation: '操作',
            sell: '出售',
            rent: "租赁",
            recentTrade: '近期完成交易',
            myFreezeList: '我的冻结列表',
            order: '订单',
            resource: "资源",
            Date: '日期',
            time: '时间',
            hash: '哈希',
            currentOrder: '当前订单',
            highestPrice: '单价最高',
            earnings: '总收益最高',
            myOrder: '我的买单',
            remainingAmount: '剩余价值',
            freezeObject: '冻结对象/数量',
            expireTime: '过期时间',
            success: '成功',
            fail: '失败',
            residualE: '剩余能量/总能量',
            residualB: '剩余带宽/总带宽',
            sellResource: '出售资源',
            cancel: '取消',
            placeOrder: '下单',
            receive: '接收',
            type: '类型',
            chooseBuy: '选购',
            count: '数量',
            pledge: '质押',
            orderAmount: '订单金额',
            yourBlance: '你的余额',
            yourAddress: '你的收款地址'
        },
        tip: {
            ownerAddress: '请输入你的钱包地址',
            receiverAddress: '请输入接收能量地址',
            resource: '请选择资源类型',
            amount: '请输入资源数量',
            unitPrice: '请输入想要的单价',
            duration: '请输入质押时长',
            tronAddress: '请输入合法的波场地址',
            pledgeEnergy: '至少质押{amount}能量',
            pledegBandWidth: '至少质押{amount}带宽',
            freezeTip: '至少冻结三天',
            freezeToolTip: '根据波场规则至少冻结三天，后期可调整',
            tip1: '相比较燃烧获得资源节省',
            tip2: "请输入合法的波场钱包收款地址",
            tip3: '您可以加入VIP卖家池，自动化出售能量以获得收入，详情请联系',
            tip4: '当有订单时您也可以手动出售能量以获得收入，要获得及时的订单推送，请关注如下电报(Telegram)',
            tip5: '当前你的钱包锁定中',
            tip6:'请下载波宝钱包浏览器插件或在波场链使用',
            sell: '出售提示',
            knowThe: "知道了"
        }
    }
}
const i18n = createI18n({
    locale: localStorage.getItem('language') || 'zh',
    messages
})

export default i18n