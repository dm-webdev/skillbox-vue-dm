import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

export const router = createRouter({
  history: createWebHistory('/#/'),
  routes: [
    {
      path: '/',
      redirect: '/catalog'
    },
    {
      name: 'catalog',
      path: '/catalog',
      component: MainPage,
      meta: { title: 'каталог' }
    },
    {
      name: 'product',
      path: '/product/:id(\\d+)?',
      component: ProductPage,
      meta: { title: 'продукт' }
    },
    {
      name: 'notFound',
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
      meta: { title: 'не найдена' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
