import axios from "axios";
const CancelToken = axios.CancelToken;

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

const sources = [] // 定义数组用于存储每个ajax请求的取消函数及对应标识

// 定义取消操作
const removeSource = (config) => {
  for (const source in sources) {
    // 当多次请求相同时，取消之前的请求
    if (sources[source].umet === config.url + '&' + config.method) {
      sources[source].cancel('取消请求')
      sources.splice(source, 1)
    }
  }
}

service.interceptors.request.use(config => {
  removeSource(config)
  config.cancelToken = new CancelToken((c) => {
    // 将取消函数存起来
    sources.push({ umet: config.url + '&' + config.method, cancel: c })
  })
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  (response) => {
    removeSource(response.config)
    return response.data || null;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
