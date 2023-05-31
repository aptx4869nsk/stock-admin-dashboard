import enLocale from "element-plus/lib/locale/lang/en";
import common from "./en-us/common";
import system from "./en-us/system";
import menu from "./en-us/menu";
const lang = {
  el: enLocale.el, // element-plus i18 setting
  message: {
    language: "English",
    ...system,
    ...menu,
    ...common,
  },
};

export default lang;
