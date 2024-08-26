import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

createApp(App)
    .use(router)
    .use(VueChartkick.use(Chart))
    .mount('#app');