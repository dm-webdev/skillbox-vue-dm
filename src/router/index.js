import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory('/#/'),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
