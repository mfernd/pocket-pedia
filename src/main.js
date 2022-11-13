import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerServiceWorker } from '@/services/registerServiceWorker';

import 'normalize.css';
import './assets/main.css';

registerServiceWorker();

const app = createApp(App);

app.use(router);

app.mount('#app');
