import { login } from "@/api/model/user";

const state = () => ({
  token: "",
  info: {},
});

const getters = {
  token: (state) => state.token,
};

const mutations = {
  tokenChange: (state, token) => {
    state.token = token;
  },
  infoChange: (state, info) => {
    state.info = info;
  },
};

const actions = {
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then((res) => {
          commit("tokenChange", res.token);
          commit("infoChange", res.user);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  loginOut() {
    console.log("store/module/user.js >>>> logout");
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
