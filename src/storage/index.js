import { createStore } from "vuex";
import state from "./store.actions";
import getters from "./store.getters";
import mutations from "./store.mutations";
import actions from "./store.actions";

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default store;
