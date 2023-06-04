import { createI18n } from "vue-i18n";
import store from "@/store";

const files = {};
const context = require.context("./modules", false, /\.js$/);

// 加载语言包
context.keys().forEach((key) => {
  const module = context(key).default;
  const moduleName = key.replace(/^\.\/(.*?)\.js$/, "$1");
  files[moduleName] = module;
});

let messages = files;

const lang = store.state.app.lang || navigator.language; // 初次进入，采用浏览器当前设置的语言，默认采用中文
const locale = lang.indexOf("en") !== -1 ? "en-US" : "zh-CN";

/** 国际化主函数，调用vue-i18n插件生成 */
const i18n = createI18n({
  locale: "zh-CN", //locale, // 当前语言
  fallbackLocale: "zh-CN", // 回退语言，默认中文
  legacy: false,
  messages, // 加载的语言包
  __VUE_I18N_FULL_INSTALL__: false, // Vue I18n 的安装将不会自动注册官方提供的插件，如日期时间格式化、数字格式化等
  __VUE_I18N_LEGACY_API__: false, // 以支持 Vue 3.x 的 Composition API 风格的代码; 例 useI18n、useMessages
});
//
// 将当前语言应用到 HTML 标签的 lang 属性上
document.getElementsByTagName("html")[0].setAttribute("lang", locale);

export default i18n;
