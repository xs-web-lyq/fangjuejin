/**
 * @description 环境变量配置
 */

const env = import.meta.env.MODE || "production";
const ENVConfig = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/945626f1f414300843e76d6926279a4e/api",
  },
  test: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/945626f1f414300843e76d6926279a4e/api",
  },
  production: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/945626f1f414300843e76d6926279a4e/api",
  },
};

export default {
  env,
  mock: false,
  namespace: "juejin",
  ...ENVConfig[env],
};
