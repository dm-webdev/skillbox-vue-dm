<template>
  <main class="content container" v-if="product">
    <div class="content__top">
      <bread-crumbs :name='breadcrumbsName' />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src='product.image.file.url' :alt='product.title'>
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent='addToCart'>
            <b class="item__price">
              {{ formatedPrice }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <colors-control
                :color-palette='product.colors'
                v-model:selected-color='selectedColor'
              />
            </fieldset>

            <div class="item__row">
              <product-counter
                v-model:amount='productAmount'
              />
              <button class="button button--primery" type="submit" :disabled='$store.state.apiConnection.isLoading'>
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <empty-request
          v-if='!product.content'
          text="Описание товара не найдено."
        />
        {{ product.content }}
      </div>
    </section>
  </main>
</template>

<script>
import ColorsControl from '@/components/controls/ColorsControl.vue'
import BreadCrumbs from '@/components/controls/BreadCrumbs.vue'
import { numberFormat } from '@/helpers/formatHelpers'
import ProductCounter from '../components/controls/ProductCounter.vue'
import axios from '@/helpers/axiosConfig'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import EmptyRequest from '../components/misc/EmptyRequest.vue'

export default {
  name: 'ProductPage',
  components: {
    ColorsControl,
    BreadCrumbs,
    ProductCounter,
    EmptyRequest
  },
  props: {
    pageParams: {
      type: Object,
      requared: true
    }
  },
  computed: {
    product () {
      return this.currentProduct
    },
    formatedPrice () {
      return numberFormat(this.product.price)
    },
    breadcrumbsName () {
      return `каталог/ ${this.product.category.title}/ ${this.product.title}`
    }
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const curentId = ref(route.params.id)
    const productAmount = ref(1)
    const selectedColor = ref(-1)
    const currentProduct = ref(null)

    function getCurrentProduct () {
      store.commit('setIsLoading', true)
      axios.get(`products/${curentId.value}`)
        .then(response => {
          currentProduct.value = response.data
        })
        .catch((err) => {
          store.commit('setMessage', {
            modalContent: `${err.response.data.error.message}`,
            modalType: 'error'
          })
        })
        .finally(() => store.commit('setIsLoading', false))
    }

    getCurrentProduct()

    watch(
      () => route.params,
      async newParams => {
        curentId.value = newParams.id
        if (curentId.value) {
          getCurrentProduct()
        }
      }
    )

    return {
      currentProduct,
      productAmount,
      selectedColor,
      addToCart: () => store.dispatch('addToCart', {
        productId: currentProduct?.value.id,
        amount: productAmount?.value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    max-height: 570px;
  }
</style>
