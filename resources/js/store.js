// src/store.js
import { createStore } from 'vuex';

export default createStore({
  modules: {
    auth: {
      state: {
        token: null,
        user: null,
      },
      mutations: {
        setToken(state, token) {
          state.token = token;
        },
        setUser(state, user) {
          state.user = user;
        },
        clearAuth(state) {
          state.token = null;
          state.user = null;
          localStorage.removeItem('APP_DEMO_USER_TOKEN');
        },
      },
      actions: {
        setToken({ commit }, token) {
          commit('setToken', token);
        },
        setUser({ commit }, user) {
          commit('setUser', user);
        },
        clearAuth({ commit }) {
          commit('clearAuth');
        },
        async getAuthUser({ commit, state }) {
          try {
            const response = await axios.get('/api/user', {
              headers: {
                Authorization: `Bearer ${state.token}`
              }
            });
            commit('setUser', response.data);
            return response.data;
          } catch (error) {
            console.error('Failed to fetch auth user:', error);
            throw error;
          }
        },
      },
      getters: {
        getToken(state) {
          return state.token;
        },
        getAuthUser(state) {
          return state.user;
        },
      },
    },
  },
});
