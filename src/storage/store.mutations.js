import i18n from "@/i18n";

// 定义方法，操作state方法
const mutations = {
  setLocale(state, { language }) {
    state.locale = language;
    localStorage.setItem("locale", language); // save in local storage
    i18n.global.locale = language;
  },
  setToken(state, token) {
    state.token = token;
  },
};

export default mutations;
