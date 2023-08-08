import './bootstrap';
import { createApp } from 'vue'

import App from '/resources/App.vue'
import router from './routes.js';
import store from './store.js';

const app = createApp(App); 
app.use(router);
app.use(store);
app.mount('#app');