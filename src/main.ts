import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'; 
import { CustomPreset } from './styles/presets/custom-preset';
import Toast from 'primevue/toast';
import './styles/global.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: CustomPreset,
    options: {
      prefix: '',
      darkModeSelector: 'dark',
      cssLayer: false,
    },
  },
});
app.use(ToastService);
app.component('Toast', Toast);

app.mount('#app');
