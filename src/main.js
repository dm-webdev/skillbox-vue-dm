import { createApp } from 'vue';
import App from './App.vue';
import { showAlert } from './task/action';
import { phrase1, phrase2 } from './task/data';

createApp(App).mount('#app');

showAlert(phrase1);
showAlert(phrase2);
