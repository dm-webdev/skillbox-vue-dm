<template>
  <main class="content container" v-if='product'>
    <div class="content__top">
      <bread-crumbs
        :name='breadcrumbsName'
        :slug="['catalog',  'catalog']"
        :param="[{}, breadcrumbsParam]"
      />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img v-if="currentMainImg" width="570" height="570" :src='currentMainImg' :alt='selectedOffer?.title'>
        </div>
      </div>
      <div class="item__info">
        <span class="item__code">Артикул: {{ product?.id }}</span>
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
            <div v-if='propsList?.length > 0'>
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
                v-if='!!product?.id'
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
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { numberFormat, getColors, getPropsList, normalizeString } from '@/helpers/formatHelpers'
import ColorsControl from '@/components/controls/ColorsControl.vue'
import BreadCrumbs from '@/components/controls/BreadCrumbs.vue'
import ProductCounter from '../components/controls/ProductCounter.vue'
import AccordionProduct from '../components/misc/AccordionProduct.vue'
import ProductPropsControl from '@/components/controls/ProductPropsControl.vue'

export default {
  name: 'ProductPage',
  components: {
    ColorsControl,
    BreadCrumbs,
    ProductCounter,
    AccordionProduct,
    ProductPropsControl
  },
  methods: {
    numberFormat (val) {
      return numberFormat(val)
    }
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const curentId = ref(route.params.id)
    const product = computed(() => store.getters.getCurrentProduct)
    const colors = ref(null)
    const offersList = ref(null)
    const propsList = ref(null)
    const productAmount = ref(1)
    const selectedColor = ref('-1')
    const currentMainImg = ref(null)
    const selectedProp = ref('-1')
    const selectedOffer = ref(null)
    const breadcrumbsName = ref('каталог/')
    const breadcrumbsParam = ref({})

    store.dispatch('getCurrentProduct', curentId.value)

    watch(
      () => route.params,
      async newParams => {
        if (!newParams.id) {
          store.dispatch('cleanCurrentProduct')
        }
        curentId.value = newParams.id
        if (curentId.value) {
          store.dispatch('getCurrentProduct', curentId.value)
        }
      }
    )

    watch(() => product.value.id, () => {
      if (product.value && product.value.id !== -1) {
        colors.value = getColors(product.value)
        offersList.value = product.value.offers
        propsList.value = getPropsList(product.value.offers.map(item => item.propValues[0]))
        currentMainImg.value = product.value.preview.file.url
        breadcrumbsName.value = `каталог/ ${product.value.category.title}/ ${product.value.title}`
        breadcrumbsParam.value = { categoriesId: product.value.category.slug }
      }
    })

    watch([selectedColor, selectedProp], () => {
      if (selectedColor.value !== '-1' && product.value.mainProp.code !== 'color') {
        const imagesData = product.value.colors.find(
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
      product,
      productAmount,
      selectedColor,
      breadcrumbsName,
      breadcrumbsParam,
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
