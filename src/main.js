import { createApp } from "vue";
import App from "./App.vue";
// Tailwind CSS
import "./tailwind.css";
// Element Plus for Vue3
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// Global Variable
import global from "./app.global";
// App Routes
import router from "@/app.routes";
// Vuex for State Management
import store from "./storage";
// internationalization - i18n
import i18n from "@/i18n";

// Create App
const app = createApp(App);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局错误处理器
// eslint-disable-next-line
app.config.errorHandler = (err, vm, info) => {
  // 处理错误，例如输出错误日志或者展示错误提示
  console.error("Uncaught error:", err);
};

app.provide("global", global);

app.use(router);
app.use(store);
app.use(i18n);
app.use(ElementPlus);
app.mount("#app");
