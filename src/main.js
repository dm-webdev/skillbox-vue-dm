import { createApp } from 'vue'
import { store } from './store'
import { router } from './router'
import App from './App.vue'

const app = createApp(App).use(router).use(store)

app.mount('#app')
