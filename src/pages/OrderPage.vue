<template>
  <main class="content container">
    <div class="content__top">
      <bread-crumbs :name="'каталог/корзина/оформление заказа'" :slug="'catalog/cart'"/>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Общее количество товаров в корзине: {{ totalCount }} шт
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="postOrder">
        <div class="cart__field">
          <div class="cart__data">

            <base-form-text
              title="ФИО"
              placeholder="Введите ваше полное имя"
              :errorText="errorData.name"
              v-model:value="orderData.name"
            />

            <base-form-text
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :errorText="errorData.address"
              v-model:value="orderData.address"
            />

            <base-form-text
              title="Телефон"
              placeholder="Введите ваш телефон"
              :errorText="errorData.phone"
              v-model:value="orderData.phone"
              fieldMask="+7(###) ###-##-##"
              fieldType="tel"
            />

            <base-form-text
              title="Email"
              placeholder="Введи ваш Email"
              :errorText="errorData.email"
              v-model:value="orderData.email"
              fieldType="email"
            />

            <base-form-textarea
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :errorText="errorData.comment"
              v-model:value="orderData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>

            <cart-options
              :optionsList="deliveryOptions"
              v-model:selectedOption="orderData.deliveryTypeId"
            />

            <h3 class="cart__title">Оплата</h3>

            <cart-options
              :optionsList="paymentsOptions"
              v-model:selectedOption="orderData.paymentTypeId"
            />
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <order-aside-item
              v-for="item in products"
              :key="item.id"
              :title="item.productOffer.title"
              :formatedPrice="numberFormat(item.totalProductPrice)"
              :code="item.id"
            />
          </ul>

          <div class="cart__total">
            <p v-if="!!numberFormat(totalProuctsPrice)">Tовар на сумму
              <b>{{ numberFormat(totalProuctsPrice) }} ₽</b>
            </p>
            <p v-if="orderData.delivery > 0">Доставка: <b>{{ orderData.delivery }} ₽</b></p>
            <p>Итого: <b>{{ totalCount }}</b> на сумму <b>{{ numberFormat(totalPrice) }} ₽</b></p>
          </div>

          <error-field
            class='error-text-light'
            title='заполните форму'
            description='Для оформления заказа, заполните обязательные поля формы'
            v-if="!isFormValid"
          />

          <button
            class="cart__button button button--primery"
            type="submit"
            v-else
          >
            Оформить заказ
          </button>
        </div>

        <error-field
          title='Заявка не отправлена!'
          :description='formSendWithError'
          v-if="!!formSendWithError"
        />
      </form>
    </section>
  </main>
</template>

<script>
import { ref, watch } from 'vue'
import ErrorField from '../components/misc/ErrorField.vue'
import { mapGetters, useStore } from 'vuex'
import { numberFormat } from '@/helpers/formatHelpers'
import { validateRequaredString, validateEmail, validatePhone, validateString } from '@/helpers/validateHelpers'
import BreadCrumbs from '../components/controls/BreadCrumbs.vue'
import BaseFormText from '../components/cartComponents/BaseFormText.vue'
import BaseFormTextarea from '../components/cartComponents/BaseFormTextarea.vue'
import OrderAsideItem from '@/components/cartComponents/OrderAsideItem.vue'
import CartOptions from '../components/cartComponents/CartOptions.vue'
import { useRouter } from 'vue-router'

export default {
  components: { ErrorField, BreadCrumbs, BaseFormText, BaseFormTextarea, OrderAsideItem, CartOptions },
  name: 'OrderPage',
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalCount: 'productInCartCount',
      totalProuctsPrice: 'cartTotalPrice'
    })
  },
  methods: {
    numberFormat (value) {
      return numberFormat(value)
    }
  },
  setup () {
    const store = useStore()
    const orderData = ref({ deliveryTypeId: -1, paymentTypeId: -1 })
    const errorData = ref({})
    const isFormValid = ref(false)
    const formSendWithError = ref()
    const totalPrice = ref(store.getters.cartTotalPrice)
    const router = useRouter()
    const deliveryOptions = ref([])
    const paymentsOptions = ref([])
    const currentDeliveryOptions = ref(-1)

    store.dispatch('getDeliveryOptions').then(response => {
      deliveryOptions.value = response.data
    })

    watch(orderData.value, () => {
      errorData.value.name = validateRequaredString(orderData.value.name, 3, 50)
      errorData.value.address = validateRequaredString(orderData.value.address, 10, 80)
      errorData.value.phone = validatePhone(orderData.value.phone)
      errorData.value.email = validateEmail(orderData.value.email, 25)
      errorData.value.comment = validateString(orderData.value.comment, 30, 250)
      if (!Object.values(errorData.value).some(val => val)) {
        isFormValid.value = true
      } else {
        isFormValid.value = false
      }
      totalPrice.value = store.getters.cartTotalPrice + +deliveryOptions.value.find(
        item => item.id === orderData.value.deliveryTypeId
      ).price
      currentDeliveryOptions.value = orderData.value.deliveryTypeId
    })

    watch(currentDeliveryOptions, () => {
      if (orderData.value.deliveryTypeId !== -1) {
        store.dispatch('getPaymentsOptions', orderData.value.deliveryTypeId)
          .then(response => {
            paymentsOptions.value = response.data
          })
      }
    })

    function postOrder () {
      store.dispatch('postOrder', orderData.value)
        .then(() => {
          orderData.value = { deliveryTypeId: -1, paymentTypeId: -1 }
          store.commit('updateCartProducts', [])
          totalPrice.value = 0
          router.push({
            name: 'orderInfo',
            params: { orderId: store.state.currentUser.currentOrderInfo.id }
          })
        })
        .catch(er => {
          formSendWithError.value = er.response.data.error.message
        })
    }

    return {
      orderData,
      errorData,
      isFormValid,
      postOrder,
      formSendWithError,
      totalPrice,
      deliveryOptions,
      paymentsOptions
    }
  }
}
</script>

<style lang="scss" scoped>
  .error-text-light {
    margin: 10px 0;
    color: #FFFFFF;
  }
</style>
