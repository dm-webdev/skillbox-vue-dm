import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'
import App from './App.vue'
import Maska from 'maska'

const app = createApp(App).use(router).use(store).use(Maska)

app.mount('#app')
