import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import CartPage from '@/pages/CartPage.vue'

export const routes = [
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
    path: '/product/:id',
    component: ProductPage,
    meta: { title: 'продукт' }
  },
  {
    name: 'cart',
    path: '/cart',
    component: CartPage,
    meta: { title: 'корзина' }
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: { title: 'не найдена' }
  }
]
