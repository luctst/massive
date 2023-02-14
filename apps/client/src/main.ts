import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia';
import { createI18n, I18nOptions } from 'vue-i18n'
import App from './App.vue'
import messages from '@/i18n/messages'
import router from '@/routes/index'

import '@/scss/main.scss'

const app = createApp(App);

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
