import { createStore } from "vuex";
const store = createStore({
  state: {
    title: "Report Diagramm",
    categories: [],
  },
  getters: {
    totalCategories(state) {
      return state.categories.length;
    },
  },
  mutations: {
    SAVE_NOTE(state, title) {
      state.categories.push(title);
    },
  },
  actions: {
    saveNote({ commit }, title) {
      commit("SAVE_NOTE", title);
    },
  },
});
export default store;
