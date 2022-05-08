import { createI18n } from "vue-i18n";

const messages = {
  en: {
    global: {
      title: "Tron Energy Sharing",
      address: "Address",
      LinkWallet: "Link wallet",
      linkTip: "Link to your Wallet Please",
      available: "Available",
      freezeForMyself: "Freeze for Myself",
      freezeForOthers: "Freeze for Others",
      energy: "Energy",
      bandwidth: "Bandwidth",
      freeze: "Freeze",
      income: "Income",
      dailyRental: "Daily Rental",
      totalVolume: "Total Volume",
      totalSellersIncome: "Total Sellers’ Income",
      buyer: "Buyer",
      seller: "Seller",
      priceDay: "Price/Day",
      days: "days",
      operation: "Operation",
      sell: "Sell",
      rent: "Rent",
      recentTrade: "Recent Trade",
      myFreezeList: "My Freeze List",
      order: "Order",
      resource: "Resource",
      Date: "Date",
      time: "Time",
      hash: "Hash",
      currentOrder: "Current Order",
      highestPrice: "Highest Price",
      earnings: "Highest Earnings",
      myOrder: "My Order",
      remainingAmount: "Remaining Amount",
      freezeObject: "Freeze Objects/Quantities",
      expireTime: "Expire Time",
      success: "Success",
      fail: "Fail",
      residualE: "Residual Energy/TotalEnergy",
      residualB: "Residual Bandwidth/TotalBandwidth",
      sellResource: "SellResource",
      cancel: "Cancel",
      placeOrder: "Place Order",
      receive: "Receive",
      type: "Type",
      chooseBuy: "ChooseBuy",
      count: "Count",
      pledge: "Pledge",
      orderAmount: "Order Amount",
      yourBlance: "Your Balance",
      yourAddress: "Your payment address",
      game1: "Wild Continent https://jxgamefi.com/",
      shareData: "Shared data",
      providedUsersBandWidth: "Total Bandwidth Provided",
      providedUsersEnergy: "Total Energy Provided",
      saveUserTrx: "Total TRX Saved",
      recommendReward: "Recommendation reward",
      walletBalance: "Wallet Balance",
      gainedReward: "Gained Reward",
      invitedNumbers: "Invited Numbers",
      copyLinkTips: "Copy your recommendation link, inviting and gain rewards",
      linkWallet: "Please link Wallet",
      resourceLeasing: "Resource leasing",
      resourceType: "Resource type",
      recentOrders: "Recent orders",
      orderList: "Order List",
      sellerIncome: "Seller Income",
      priceOfDay: "Price/day",
      detail: "details",
      cancelOrder: "cancel the order",
      noDate: "no data",
      selleryEntry: "Seller entry",
      selleryEntryContent1:
        "Tron The energy sharing platform aims to create an energy and bandwidth sharing platform to reduce the tariff for the majority of wave field users. Click the subscription order channel",
      selleryEntryContent2: "Get real-time order information.",
      selleryEntryContent3:
        "If you hold 2 million TRX or more for a long time, you can contact the official telegram (tron_energysharing) to obtain the information about joining the seller is quantitative pool.",
      announcementCenter: "Announcement Center",
      latestAnnouncement: "Latest announcement",
      announcementCenterP1:
        "Announcement on launching the first phase of million airdrop plan",
      announcementCenterP2:
        "The first phase of the million airdrop plan will start at 0:00 on April 10, 2022, and end at 24:00 on April 20, 2022, Singapore time.",
      announcementCenterP3: "Current airdrop token information:",
      announcementCenterP4: "Name: Star",
      announcementCenterP5:
        "Stat is a Defi property token based on Tronchain, dedicated to creating a complete economic model for Defi and Gamefi",
      announcementCenterP6: "Related Ecology:",
      communityTwitter: "Community Twitter:",
      numberAirdrops: "Number of airdrops:",
      totalAirdrop: "Total airdrop:",
      contractAddress: "Contract address:",
      addressOfPeriod: "Airdrop distribution address of this period:",
      helpCenter: "Help Center",
      engeryAndBandWidth: "1. Introduction to energy and bandwidth",
      engeryAndBandWidthP1:
        "Energy and bandwidth are two forms of gas fee under wave field network. If the account energy and bandwidth are insufficient, it is necessary to burn TRX to obtain energy and bandwidth. Each account obtains 1500 units of free bandwidth every day, but energy cannot be obtained free of charge. Compared with the energy and bandwidth obtained by combustion, through tron The energy sharing platform will pay rent, and the charge for energy and bandwidth will be greatly reduced.",
      basicOperation: "2. Basic operation",
      placeOrderTips:
        "Place an order through the home page and select the required resource type and quantity to pay the order fee.",
      unitPrice: "Unit Price",
      unitPriceTips:
        "In case of peak traffic, the resources of Tron energy sharing platform will not meet the needs of users in real time. At this time, increasing the unit price will help users give priority to others to obtain resources.",
      cancelOrderTips:
        "In case of peak traffic, resources on Tron Enery-Sharing platform cannot meet users' demands in real time. In this case, users can choose to continue to wait or click `My Order` to cancel the order.",
      sellTips:
        "In case of peak traffic, the resources on Tron Enery-Sharing platform will not be able to meet users' demands in real time. For TRX holders, they can choose to earn TRX by selling resources through `Current Order` on the main page.",
      security: "3.security",
      securityTips1:
        "Tron energy sharing platform is currently the lowest energy sharing platform in the whole network. The platform itself has no resources to sell. The resources purchased by users come from third-party users",
      securityTips2:
        "Compared with other energy trading platforms, the trading mode of Tron energy sharing platform does not adopt the way of smart contract authorization. No matter the buyer or the seller, the platform is absolutely impossible to obtain the authorization of user account transfer, which eliminates the possibility of smart contract vulnerabilities infringing on user assets. Please rest assured to use it.",
      teamName: "Tron energy-sharing Team",
      location: "address：",
      homePage: "Home",
      myOrders: "My order",
      sellerEntry: "Seller entry",
      recentTransactions: "Recent transactions",
      more: "more",
      myWallet: "My wallet",
      copyToClipboard: "Copy",
      resourceReceAddress: "Resource receiving address",
      numResource: "Number of resources",
      unitPricDay: "Unit price (sun) / day",
      burnTrxTips: "Resource savings compared to burning TRX",
    },
    tip: {
      ownerAddress: "Please enter your wallet address",
      receiverAddress: "Please enter the receiving energy address",
      resource: "Select a resource type",
      amount: "Please enter the number of resources",
      unitPrice: "Please enter the unit price you want",
      duration: "Please enter the duration of pledge",
      tronAddress: "Please enter a valid wave field resource receiving address",
      activeAddress: "Your receiving address is not active",
      pledgeEnergy: "Pledge at least {amount} energy",
      pledegBandWidth: "Pledge at least {amount} bandwidth",
      freezeTip: "Freeze for at least 3 days",
      freezeToolTip:
        "At least three days according to wave field rules, adjustable later",
      tip1: "Compared with burning to obtain resource savings",
      tip2: "Please enter a valid tron wallet payment address",
      tip3: "You can join the VIP seller pool to automatically sell energy for income, please contact",
      tip4: "You can also manually sell energy to earn income when there are orders. To get timely order notifications, please follow the following Telegram.",
      tip5: "Your wallet is currently locked",
      tip6: "Please download bo Bo wallet browser plug-in or use in tron chain",
      sell: "Selling tips",
      knowThe: "I Know",
      spin: "Do not close this page when the transaction is in progress to prevent transaction failure",
    },
  },
  zh: {
    global: {
      title: "波场能量共享",
      address: "地址",
      LinkWallet: "链接钱包",
      linkTip: "请链接你的波场钱包",
      available: "可用",
      freezeForMyself: "为自己冻结",
      freezeForOthers: "为他人冻结",
      energy: "能量",
      bandwidth: "带宽",
      freeze: "冻结",
      income: "收入",
      dailyRental: "今日出租情况",
      totalVolume: "平台日总量",
      totalSellersIncome: "商户总收益",
      buyer: "买家",
      seller: "卖家",
      priceDay: "价格{way}/天",
      days: "天",
      operation: "操作",
      sell: "出售",
      rent: "租赁",
      recentTrade: "近期完成交易",
      myFreezeList: "我的冻结列表",
      order: "订单",
      resource: "资源",
      Date: "日期",
      time: "时间",
      hash: "哈希",
      currentOrder: "当前订单",
      highestPrice: "单价最高",
      earnings: "总收益最高",
      myOrder: "我的买单",
      remainingAmount: "剩余价值",
      freezeObject: "冻结对象/数量",
      expireTime: "过期时间",
      success: "成功",
      fail: "失败",
      residualE: "剩余能量/总能量",
      residualB: "剩余带宽/总带宽",
      sellResource: "出售资源",
      cancel: "取消",
      placeOrder: "下单",
      receive: "接收",
      type: "类型",
      chooseBuy: "选购",
      count: "数量",
      pledge: "质押",
      orderAmount: "订单金额",
      yourBlance: "你的余额",
      yourAddress: "你的收款地址",
      game1: "蛮荒大陆链游 https://jxgamefi.com/",
      shareData: "共享数据",
      providedUsersBandWidth: "累计为用户提供带宽",
      providedUsersEnergy: "累计为用户提供能量",
      saveUserTrx: "累计为用户节省TRX",
      recommendReward: "推荐奖励",
      walletBalance: "钱包余额",
      gainedReward: "获得的奖励",
      invitedNumbers: "已邀请人数",
      copyLinkTips: "复制您的推荐链接，邀请并获得海量奖励。",
      linkWallet: "请链接钱包",
      resourceLeasing: "资源租赁",
      resourceType: "资源类型",
      recentOrders: "近期订单",
      orderList: "订单信息",
      sellerIncome: "卖家收入",
      priceOfDay: "价格/天",
      detail: "详情",
      cancelOrder: "撤单",
      noDate: "暂无数据",
      selleryEntry: "卖家入驻",
      selleryEntryContent1:
        "Tron energy-sharing平台意在打造一个能量、带宽共享平台，为广大波场用户降低资费。 点击订阅订单频道",
      selleryEntryContent2: "获取实时订单信息。",
      selleryEntryContent3:
        "如你长期持有200万TRX或以上数量，可联系官方电报（Tron_energysharing），获取加入卖家量化池的信息。",
      announcementCenter: "公告中心",
      latestAnnouncement: "最新公告",
      announcementCenterP1: "关于启动第一期百万空投计划的公告",
      announcementCenterP2:
        "第一期百万空投计划将于新加坡时间2022年4月10日0时启动，于新加坡时间2022年4月20日24时结束。",
      announcementCenterP3: "本期空投代币信息：",
      announcementCenterP4: "名称：STAR",
      announcementCenterP5:
        "代币简介：stat是基于Tronchain开发的Defi属性代币，致力于创造Defi和Gamefi的一个完善的经济模型",
      announcementCenterP6: "相关生态：",
      communityTwitter: "社区推特：",
      numberAirdrops: "空投数量：",
      totalAirdrop: "空投总量：",
      contractAddress: "合约地址：",
      addressOfPeriod: "本期空投发放地址：",
      helpCenter: "帮助中心",
      engeryAndBandWidth: "1.能量和带宽简介",
      engeryAndBandWidthP1:
        "能量和带宽是波场网络下gas费的两种形态，如账户能量和带宽不足则需燃烧TRX获得能量和带宽，每个账户每日获得的免费带宽为1500单位，能量则无法免费获得。相比较通过燃烧获得能量和带宽而言，通过Tron enery-sharing平台支付租金获得能量和带宽的资费将大大降低。",
      basicOperation: "2.基本操作",
      placeOrderTips: "通过主页下单，选择所需的资源类型、数量支付订单费用。",
      unitPrice: "单价",
      unitPriceTips:
        "如遇流量高峰期，Tron enery-sharing平台的资源将无法实时满足用户需求，此时提高单价则有助用户优先他人获得资源。",
      cancelOrderTips:
        "如遇流量高峰期，Tron enery-sharing平台的资源将无法实时满足用户需求，此时用户可选择继续等待也可选择点击“我的订单”进行撤单。",
      sellTips:
        "如遇流量高峰期，Tron enery-sharing平台的资源将无法实时满足用户需求，对于持有TRX的用户，可选择通过主页面“当前订单”处出售资源，赚取TRX。",
      security: "3.安全性",
      securityTips1:
        "Tron enery-sharing平台目前系全网最低价的能量共享平台，平台本身没有资源可供出售。用户所购买的资源来源于第三方用户",
      securityTips2:
        "相比较其他能量交易平台，Tron enery-sharing平台的交易方式没有采用智能合约授权的方式，无论是买方还是卖方，平台绝无可能得到用户账户转账的授权，排除了智能合约漏洞侵害用户资产的可能，请各位用户放心使用。",
      teamName: "Tron energy-sharing团队",
      location: "地址：",
      homePage: "首页",
      myOrders: "我的订单",
      sellerEntry: "卖家入驻",
      recentTransactions: "近期交易",
      more: "更多",
      myWallet: "我的钱包",
      copyToClipboard: "复制到剪贴板",
      resourceReceAddress: "资源接收地址",
      numResource: "资源数量",
      unitPricDay: "单价(sun) / 天",
      burnTrxTips: "相比燃烧TRX获得资源节省",
    },
    tip: {
      ownerAddress: "请输入你的钱包地址",
      receiverAddress: "请输入接收能量地址",
      resource: "请选择资源类型",
      amount: "请输入资源数量",
      unitPrice: "请输入想要的单价",
      duration: "请输入质押时长",
      tronAddress: "请输入合法的波场资源接收地址",
      activeAddress: "你的接收地址未激活",
      pledgeEnergy: "至少质押{amount}能量",
      pledegBandWidth: "至少质押{amount}带宽",
      freezeTip: "至少冻结三天",
      freezeToolTip: "根据波场规则至少冻结三天，后期可调整",
      tip1: "相比较燃烧获得资源节省",
      tip2: "请输入合法的波场钱包收款地址",
      tip3: "您可以加入VIP卖家池，自动化出售能量以获得收入，详情请联系",
      tip4: "当有订单时您也可以手动出售能量以获得收入，要获得及时的订单推送，请关注如下电报(Telegram)",
      tip5: "当前你的钱包锁定中",
      tip6: "请下载波宝钱包浏览器插件或在波场链使用",
      sell: "出售提示",
      knowThe: "知道了",
      spin: "交易进行中,请勿关闭本页面,防止交易失败",
    },
  },
};
const i18n = createI18n({
  locale: localStorage.getItem("language") || "zh",
  messages,
});

export default i18n;
