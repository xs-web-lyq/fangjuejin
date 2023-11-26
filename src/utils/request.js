/**
 * 封装axios
 */

import axios from "axios";
import config from "../config";
import storage from "./storage";

import { ElMessage } from "element-plus";

// 创建axios实例
const instance = axios.create({
  baseURL: config.mockApi, // api的base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true,
});

// request拦截器
instance.interceptors.request.use((req) => {
  const headers = req.headers;
  // JWT-TOKEN处理
  const token = storage.getItem("userInfo");
  if (!headers.Authorization) headers.Authorization = "Bearer " + token;
  return req;
});

// response拦截器
instance.interceptors.response.use((res) => {
  const { code, data, message } = res.data;
  if (code === 200) {
    return data;
  } else if (code !== 5001) {
    ElMessage.error(message);
    return Promise.reject(message);
  } else {
    ElMessage.reject(message);
    return Promise.reject(message);
  }
});
/**
 * 请求核心函数
 * @param {object} options 请求参数
 */

function request(options) {
  options.method = options.method || "GET";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }
  if (config.env === "production") {
    instance.defaults.baseURL = config.baseApi;
  } else {
    instance.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  return instance(options);
}

["get", "post", "put", "delete"].forEach((method) => {
  request[method] = (url, data, config) => {
    return request({
      url,
      method,
      data,
      ...config,
    });
  };
});

export default request;
