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
            <li class="dictionary__item" v-for="date, index in deliveryDate" :key="index">
              <span class="dictionary__key" v-if="date.value">
                {{ date.title}}
              </span>
              <span class="dictionary__value">
                {{ date.value }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <order-aside-item
              v-for="item in order?.basket.items"
              :key="item.id"
              :title="item.productOffer.title"
              :formatedPrice="numberFormat(item.price * item.quantity)"
              :code="item.id"
            />
          </ul>

          <div class="cart__total">
            <p v-if="order?.deliveryType.id === 2">Доставка: <b>{{ numberFormat(+order?.deliveryType.price) }} ₽</b></p>
            <p>Итого: <b> {{ totalCount }} </b> шт. на сумму <b>{{ numberFormat(+order?.totalPrice + +order?.deliveryType.price) }} ₽</b></p>
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
  components: {
    OrderAsideItem,
    BreadCrumbs
  },
  name: 'OrderInfoPage',
  computed: {
    ...mapGetters({
      order: 'getCurrentOrderInfo',
      totalCount: 'getTotalCountOfOrder'
    }),
    deliveryDate () {
      return [
        {
          title: 'Получатель',
          value: this.order?.name
        },
        {
          title: 'Адрес доставки',
          value: this.order?.address
        },
        {
          title: 'Телефон',
          value: this.order?.phone
        },
        {
          title: 'Email',
          value: this.order?.email
        },
        {
          title: 'Способ оплаты',
          value: this.order?.paymentType
        },
        {
          title: 'Комментарий',
          value: this.order?.comment
        }
      ]
    }
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
