import request from "../utils/request";

export default {
  login(params) {
    return request({
      url: "/login",
      method: "post",
      data: params,
      mock: false,
    });
  },
  getAllList(params) {
    return request({
      url: "/info/home",
      method: "get",
      data: params,
      mock: false,
    });
  },
  // 获取验证码
  getCode() {
    return request({
      url: "/getCode",
      method: "get",
      mock: true,
    });
  },
  search(params) {
    return request({
      url: "/search",
      method: "get",
      data: params,
      mock: false,
    });
  },

  // 获取文章详情
  getEssay(params) {
    return request({
      url: "/info/post",
      method: "get",
      data: params,
      mock: false,
    });
  },

  // 获取文章评论
  getCommentList(params) {
    return request({
      url: "/info/comment",
      method: "get",
      data: params,
      mock: false,
    });
  },
  // 发表评论
  addComment(params) {
    return request({
      url: "/info/addComment",
      method: "post",
      data: params,
      mock: false,
    });
  },
  // 获取用户全部信息
  getUserInfo(params) {
    return request({
      url: "/info/user",
      method: "get",
      data: params,
      mock: false,
    });
  },
  // 上传图片
  uploadFile(params) {
    return request({
      url: "/info/upload",
      method: "post",
      data: params,
      mock: false,
    });
  },
  addEssay(params) {
    return request({
      url: "/info/addEssay",
      method: "post",
      data: params,
      mock: false,
    });
  },
};
