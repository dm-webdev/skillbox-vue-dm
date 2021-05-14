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
            <p v-if="!!formatedTotalPrice">Tовар на сумму
              <b>{{ formatedTotalPrice }} ₽</b>
            </p>
            <p v-if="orderData.delivery > 0">Доставка: <b>{{ orderData.delivery }} ₽</b></p>
            <p>Итого: <b>{{ totalCount }}</b> на сумму <b>{{ numberFormat(formatedPrice) }} ₽</b></p>
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
import axios from '@/helpers/axiosConfig'
import { useRouter } from 'vue-router'

export default {
  components: { ErrorField, BreadCrumbs, BaseFormText, BaseFormTextarea, OrderAsideItem, CartOptions },
  name: 'OrderPage',
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalCount: 'productInCartCount',
      totalPrice: 'cartTotalPrice'
    }),
    formatedTotalPrice () {
      return numberFormat(this.totalPrice)
    }
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
    const formatedPrice = ref(store.getters.cartTotalPrice)
    const router = useRouter()
    const deliveryOptions = ref([])
    const paymentsOptions = ref([])
    const currentDeliveryOptions = ref(-1)

    getdeliveryOptions()

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
      formatedPrice.value = store.getters.cartTotalPrice + +deliveryOptions.value.find(item => item.id === orderData.value.deliveryTypeId).price
      currentDeliveryOptions.value = orderData.value.deliveryTypeId
    })

    watch(currentDeliveryOptions, () => {
      if (orderData.value.deliveryTypeId !== -1) {
        getPaymentsOptions(orderData.value.deliveryTypeId)
      }
    })

    function postOrder () {
      store.commit('setIsLoading', true)
      axios.post('orders', {
        ...orderData.value
      }, {
        params: {
          userAccessKey: store.state.currentUser.accessKey
        }
      })
        .then(response => {
          store.commit('setOrderInfo', response.data)
          store.commit('setMessage', {
            modalContent: 'Ваша корзина успешно отправлена',
            modalType: 'success'
          })
          orderData.value = { deliveryTypeId: -1, paymentTypeId: -1 }
          store.commit('updateCartProducts', [])
          formatedPrice.value = 0
          router.push({ name: 'orderInfo', params: { orderId: store.state.currentUser.currentOrderInfo.id } })
        })
        .catch(er => {
          console.log(er.response.data)
          formSendWithError.value = er.response.data.error.message
        })
        .finally(() => store.commit('setIsLoading', false))
    }

    function getdeliveryOptions () {
      store.commit('setIsLoading', true)
      axios.get('deliveries')
        .then(response => {
          deliveryOptions.value = response.data
        })
        .catch(() => store.commit('setMessage', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
        .finally(() => store.commit('setIsLoading', false))
    }

    function getPaymentsOptions (id) {
      store.commit('setIsLoading', true)
      axios.get('payments', {
        params: {
          deliveryTypeId: id
        }
      })
        .then(response => {
          paymentsOptions.value = response.data
        })
        .catch(() => store.commit('setMessage', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
        .finally(() => store.commit('setIsLoading', false))
    }

    return {
      orderData,
      errorData,
      isFormValid,
      postOrder,
      formSendWithError,
      formatedPrice,
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
