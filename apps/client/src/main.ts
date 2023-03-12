import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia';
import { createI18n, I18nOptions } from 'vue-i18n'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue'
import messages from '@/i18n/messages'
import router from '@/routes/index'

import 'vue3-toastify/dist/index.css';
import '@/scss/main.scss'

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 5000,
  multiple: false,
  position: 'bottom-right',
} as ToastContainerOptions);
app.use(createPinia());
app.use(createHead());
app.use(createI18n({
  locale: navigator.language.includes('-') ? navigator.language.split('-')[0] : navigator.language,
  fallbackLocale: 'en',
  globalInjection: true,
  messages,
} as I18nOptions));
app.use(router);
app.mount('#app');
