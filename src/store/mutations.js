/**
 * mutations 业务层数据提交
 */

import storage from "../utils/storage";
export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.setItem("userInfo", userInfo);
  },
  saveSearchList(state, searchList) {
    state.searchList = searchList;
  },
  saveAllList(state, allList) {
    state.saveAllData = allList;
  },
  saveCommentId(state, commentId) {
    state.commentId = commentId;
  },
};
