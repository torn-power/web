import axios from "axios";

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL,
  baseURL: "https://api.diditron.com/api",
});

service.interceptors.response.use(
  (response) => {
    return response.data || null;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
