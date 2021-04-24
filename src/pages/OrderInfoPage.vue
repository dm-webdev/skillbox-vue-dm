<template>
    <main class="content container">
    <div class="content__top">
      <bread-crumbs :name="'каталог/корзина/оформление заказа'" :slug="'catalog/cart'"/>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order?.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order?.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order?.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order?.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order?.email}}
              </span>
            </li>
            <li class="dictionary__item" v-if="oder?.pay">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <order-aside-item
              v-for="item in order?.basket.items"
              :key="item.id"
              :title="item.product.title"
              :formatedPrice="numberFormat(item.price * item.quantity)"
              :code="item.id"
            />
          </ul>

          <div class="cart__total">
            <p v-if="oder?.delivery">Доставка: <b>{{ totalPrice }} ₽</b></p>
            <p>Итого: <b> {{ totalCount }} </b> шт. на сумму <b>{{ numberFormat(order?.totalPrice) }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { useRoute } from 'vue-router'
import { mapGetters, useStore } from 'vuex'
import { ref, watch } from 'vue'
import OrderAsideItem from '../components/cartComponents/OrderAsideItem.vue'
import { numberFormat } from '@/helpers/formatHelpers'
import BreadCrumbs from '../components/controls/BreadCrumbs.vue'

export default {
  components: { OrderAsideItem, BreadCrumbs },
  name: 'OrderInfoPage',
  computed: {
    ...mapGetters({
      order: 'getCurrentOrderInfo',
      totalCount: 'getTotalCountOfOrder'
    })
  },
  methods: {
    numberFormat (val) {
      return numberFormat(val)
    }
  },
  setup () {
    const route = useRoute()
    const store = useStore()

    const orderId = ref(route.params.orderId)
    const orderInfoPresent = !!store.state.currentUser.currentOrderInfo

    if (!orderInfoPresent || store.state.currentUser.currentOrderInfo.id !== orderId.value) {
      store.dispatch('getCurrentOrderInfo', orderId.value)
    }

    watch(
      () => route.params,
      async newParams => {
        orderId.value = newParams.orderId
        if (orderId.value) {
          store.dispatch('getCurrentOrderInfo', orderId.value)
        }
      }
    )
  }
}
</script>
