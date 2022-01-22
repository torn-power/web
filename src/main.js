import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import './assets/css/global.less'

import App from './App.vue';

const app = createApp(App);

app.use(Antd).mount('#app')