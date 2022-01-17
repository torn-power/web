import axios from "axios";

const service = axios.create({
  baseURL: "",
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
