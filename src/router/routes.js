import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import CartPage from '@/pages/CartPage.vue'
import OrderPage from '@/pages/OrderPage.vue'
import OrderInfoPage from '@/pages/OrderInfoPage.vue'

export const routes = [
  {
    path: '/',
    redirect: '/catalog'
  },
  {
    name: 'catalog',
    path: '/catalog/:categoriesId?',
    component: MainPage,
    meta: { title: 'ТЕХНОЗАВР | каталог' }
  },
  {
    name: 'product',
    path: '/product/:id',
    component: ProductPage,
    meta: { title: 'ТЕХНОЗАВР | продукт' }
  },
  {
    name: 'cart',
    path: '/cart',
    component: CartPage,
    meta: { title: 'ТЕХНОЗАВР | корзина' }
  },
  {
    name: 'order',
    path: '/order',
    component: OrderPage,
    meta: { title: 'ТЕХНОЗАВР | оформление' }
  },
  {
    name: 'orderInfo',
    path: '/order/info/:orderId',
    component: OrderInfoPage,
    meta: { title: 'ТЕХНОЗАВР | заказ' }
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: { title: 'ТЕХНОЗАВР | не найдена' }
  }
]
