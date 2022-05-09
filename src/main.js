import { createApp } from "vue";
import Antd from "ant-design-vue";
import "./assets/css/global.less";

import App from "./App.vue";
import i18n from "./locales/i18n";
import router from "./router/index";

const app = createApp(App);

app.use(router).use(Antd).use(i18n).mount("#app");
