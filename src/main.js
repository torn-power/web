import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import './assets/css/global.less'

import App from './App.vue';
import i18n from './locales/i18n'

const app = createApp(App);

app.
    use(Antd).
    use(i18n).
    mount('#app')
