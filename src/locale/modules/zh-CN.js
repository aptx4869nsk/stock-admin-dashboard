import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import common from "./zh-cn/common";
import system from "./zh-cn/system";
import menu from "./zh-cn/menu";
const lang = {
  el: zhLocale.el, // element-plus i18 setting
  message: {
    language: "中文",
    ...system,
    ...menu,
    ...common,
  },
};

export default lang;
