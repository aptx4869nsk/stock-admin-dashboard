import { createApp } from "vue";
import App from "./App.vue";
// Tailwind CSS
import "./tailwind.css";
// Element Plus for Vue3
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css"; // 引入基于断点的隐藏类
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// Global Variable
import global from "./app.global";
// App Routes
import router from "@/router";
// Vuex for State Management
import store from "./store";
// internationalization - i18n
import i18n from "@/locale";
import VueParticles from "vue-particles";
// css
import "normalize.css"; // css初始化
import "@/assets/styles/common.scss"; // 公共css

// Create App
const app = createApp(App);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局错误处理器
app.config.errorHandler = (err, vm, info) => {
  // 处理错误，例如输出错误日志或者展示错误提示
  console.error("Uncaught error:", err);
};

app.provide("global", global);
app.use(VueParticles);
app.use(router);
app.use(store);
app.use(i18n);
app.use(ElementPlus, { size: store.state.app.elementSize });
app.mount("#app");
