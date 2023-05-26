import { createI18n } from "vue-i18n";

// 載入語言
import zh from "@/locales/zh.json";
import en from "@/locales/en.json";

// create i18n instance with options
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  globalInjection: true, // 全局注册 $t方法
  locale: "zh", // 設定語言
  fallbackLocale: "en", // 若選擇的語言缺少翻譯則退回的語言
  messages: {
    zh,
    en,
  },
});

export default i18n;
