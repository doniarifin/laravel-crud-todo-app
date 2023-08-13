import './bootstrap';
import { createApp } from 'vue'

import App from '/resources/App.vue'
import router from './routes.js';
import store from './store.js';
import axios from 'axios';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


const storedToken = localStorage.getItem('APP_DEMO_USER_TOKEN');
if (storedToken) {
  store.dispatch('setToken', storedToken);
  store.dispatch('getAuthUser')
    .then((r) => {
      store.dispatch('setUser', r);
    })
    .catch((error) => {
      console.error('Failed to fetch auth user:', error);
    });
}

axios.interceptors.request.use(async (config) => {
  const token = store.getters.getToken;
  if (token !== "") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ToastPlugin);
app.mount('#app');