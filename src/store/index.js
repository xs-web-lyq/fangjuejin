/**
 * @description vuex状态管理
 */

import { createStore } from "vuex";
import storage from "./../utils/storage.js";
import mutations from "./mutations.js";
const state = {
  userInfo: storage.getItem("userInfo") || {},
  searchList: [],
  saveAllData: {},
  commentId: 0,
};

export default createStore({
  state,
  mutations,
});
