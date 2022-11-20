import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerServiceWorker } from '@/services/registerServiceWorker';
import { setupTranslator } from '@/services/translator';

import 'normalize.css';
import './assets/main.css';

setupTranslator().then(() => {
  registerServiceWorker();

  const app = createApp(App);
  app.use(router);
  app.mount('#app');
});
