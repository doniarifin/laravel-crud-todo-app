// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    auth: {
      token: null,
    },
  },
  mutations: {
    setToken(state, token) {
      state.auth.token = token;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
  },
  getters: {
    getToken(state) {
      return state.auth.token;
    },
  },
});
