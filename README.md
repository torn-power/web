# tron-power

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 波场资源计算公式

USER_ENERGY_LIMIT = USER_ENERGY_WEIGHT * TOTAL_ENERGY_LIMIT / TOTAL_ENERGY_WEIGHT

USER_ENERGY_WEIGHT = USER_ENERGY_LIMIT / TOTAL_ENERGY_LIMIT * TOTAL_ENERGY_WEIGHT

USER_ENERGY_LIMIT: 用户获取的能量
USER_ENERGY_WEIGHT: 用户抵押的TRX量
TOTAL_ENERGY_LIMIT: 系统所有人“共享”的能量总上限
TOTAL_ENERGY_WEIGHT: 在整个系统中为获得能量而冻结的TRX总数


用户要支付的订单金额TRX：资源数量 * 单价 / SUN常量

原订单总金额TRX：资源数量 / 系统所有人“共享”的能量总上限 * 在整个系统中为获得能量而冻结的TRX总数

