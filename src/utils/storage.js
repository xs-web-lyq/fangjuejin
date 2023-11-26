/**
 * @description storage二次封装
 */

import config from "../config";

export default {
  // 存储信息
  setItem(key, val) {
    let storage = this.getStorage();
    storage[key] = val;
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  getItem(key) {
    let storage = this.getStorage();
    return storage[key];
  },
  // getStorage
  getStorage() {
    let storage = window.localStorage.getItem(config.namespace);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return {};
    }
  },
  // 删除信息
  clearItem(key) {
    let storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.namespace, JSON.stringify(storage));
  },
  // 删除所有信息
  clearAll() {
    window.localStorage.clear();
  },
};
