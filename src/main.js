import { createApp } from "vue";
import "./style/index.scss";
import App from "./App.vue";
import router from "./router";
import ElmentPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import api from "./api";
import store from "./store";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$api = api;
app.config.globalProperties.$store = store;

app.use(router).use(ElmentPlus).mount("#app");
