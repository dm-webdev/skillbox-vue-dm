<template>
  <main class="content container" v-if="product">
    <div class="content__top">
      <bread-crumbs :name='breadcrumbsName' />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src='currentMainImg' :alt='currentTitle'>
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ selectedOffer?.title }}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent='addToCart'>
            <b class="item__price">
              {{ numberFormat(selectedOffer?.price) }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <colors-control
                :color-palette='colors'
                v-model:selected-color='selectedColor'
                input-type='radio'
              />
            </fieldset>
            <div v-if='propsList.length > 0'>
              <fieldset
                class="form__block"
                v-for='prop, index in propsList' :key='index'
              >
                <legend v-if="prop.title !== 'Цвет'" class="form__legend">{{ prop.title }}:</legend>

                <product-props-control
                  v-if="prop.title !== 'Цвет'"
                  :propsPalette='prop.values'
                  v-model:selected-prop='selectedProp'
                  input-type='radio'
                  current-class='sizes'
                  class='sizes--primery'
                />
              </fieldset>
            </div>

            <div class="item__row">
              <product-counter
                v-model:amount='productAmount'
              />
              <button
                class="button button--primery"
                type="submit"
                :disabled='$store.state.apiConnection.isLoading'
              >
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <accordion-product :productData="product" />

    </section>
  </main>
</template>

<script>
import axios from '@/helpers/axiosConfig'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { numberFormat, getColors, getPropsList, normalizeString } from '@/helpers/formatHelpers'
import ColorsControl from '@/components/controls/ColorsControl.vue'
import BreadCrumbs from '@/components/controls/BreadCrumbs.vue'
import ProductCounter from '../components/controls/ProductCounter.vue'
import AccordionProduct from '../components/misc/AccordionProduct.vue'
import ProductPropsControl from '../components/controls/productPropsControl.vue'

export default {
  name: 'ProductPage',
  components: {
    ColorsControl,
    BreadCrumbs,
    ProductCounter,
    AccordionProduct,
    ProductPropsControl
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
    breadcrumbsName () {
      return `каталог/ ${this.product.category.title}/ ${this.product.title}`
    }
  },
  methods: {
    numberFormat (val) {
      return numberFormat(val)
    }
  },
  setup (props) {
    const store = useStore()
    const route = useRoute()

    const curentId = ref(route.params.id)
    const productAmount = ref(1)
    const selectedColor = ref('-1')
    const currentProduct = ref(null)
    const offersList = ref(null)
    const propsList = ref(null)
    const colors = ref(getColors(currentProduct.value))
    const currentMainImg = ref(currentProduct.value?.preview.file.url || null)
    const selectedProp = ref('-1')
    const selectedOffer = ref(null)

    function getCurrentProduct () {
      store.commit('setIsLoading', true)
      axios.get(`products/${curentId.value}`)
        .then(response => {
          const data = response.data
          currentProduct.value = data
          colors.value = getColors(data)
          currentMainImg.value = data.preview.file.url
          offersList.value = data.offers
          propsList.value = getPropsList(data.offers.map(item => item.propValues[0]))
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

    watch([selectedColor, selectedProp], () => {
      if (selectedColor.value !== '-1' && currentProduct.value.mainProp.code !== 'color') {
        const imagesData = currentProduct.value.colors.find(
          item => item.color.title === selectedColor.value
        )
        if (imagesData.galery) {
          currentMainImg.value = imagesData.galery.file.url
        }
      }
      const prop = selectedProp.value !== '-1' ? selectedProp.value : selectedColor.value
      const currentOffer = offersList.value.find(item =>
        normalizeString(item.propValues[0].value) === normalizeString(prop)
      )
      selectedOffer.value = currentOffer
    })

    return {
      selectedOffer,
      selectedProp,
      propsList,
      colors,
      currentMainImg,
      currentProduct,
      productAmount,
      selectedColor,
      addToCart: () => {
        store.dispatch('addToCart', {
          productOfferId: selectedOffer.value.id,
          colorId: colors.value.find(item => item.title === selectedColor.value).id,
          quantity: productAmount.value
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    max-height: 570px;
  }
</style>
