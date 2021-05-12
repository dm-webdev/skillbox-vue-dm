<template>
  <div>
    <router-link
      class='catalog__pic'
      :to="{ name: 'product', params: {id: product.slug} }"
    >
      <img :src='product.preview.file.url' :alt='currentTitle' />
    </router-link>

    <h3 class='catalog__title'>
      <router-link
        :to="{ name: 'product', params: {id: product.slug} }"
      >
        {{ currentTitle }}
      </router-link>
    </h3>

    <span class='catalog__price'> {{ numberFormat(currentPrice) }} ₽ </span>
    <colors-control
      class='colors--black'
      input-type='radio'
      :color-palette='productColors'
      v-model:selected-color='selectedProp'
      v-if="!!productColors && product.mainProp.code === 'color'"
    />
    <product-props-control
      v-else
      :propsPalette='propsPalette'
      v-model:selected-prop='selectedProp'
      input-type='radio'
      current-class='sizes'
    />
  </div>
</template>

<script>
import ColorsControl from '@/components/controls/ColorsControl.vue'
import { numberFormat, normalizeString } from '@/helpers/formatHelpers'
import { ref, watch } from 'vue'
import ProductPropsControl from './controls/productPropsControl.vue'

export default {
  name: 'ProductCard',
  components: {
    ColorsControl,
    ProductPropsControl
  },
  props: {
    product: {
      type: Object,
      requared: true
    }
  },
  computed: {
    productColors () {
      if (this.product.mainProp.code === 'color') {
        const allProductColors = this.product.colors.map(item => item.color)
        const allAvailableColors = this.product.offers.map(item => normalizeString(item.propValues[0].value))
        return allProductColors.filter(item => allAvailableColors.includes(normalizeString(item.title)))
      }
      return null
    },
    propsPalette () {
      if (this.product.mainProp.code !== 'color') {
        return this.product.offers.map(item => item.propValues[0])
      }
      return null
    }
  },
  methods: {
    numberFormat (value) {
      return numberFormat(value)
    }
  },
  setup (props) {
    const currentTitle = ref(props.product.offers[0].title)
    const currentPrice = ref(props.product.offers[0].price)
    const selectedProp = ref('-1')

    const setProductDataFromProp = (value) => {
      let currentOffer
      if (props.product.mainProp.code === 'color') {
        const currentColorName = props.product.colors.find(item => item.color.title === value)
        currentOffer = props.product.offers.find(
          item => normalizeString(item.propValues[0].value) === normalizeString(currentColorName.color.title)
        )
      } else {
        currentOffer = props.product.offers.find(
          item => normalizeString(item.propValues[0].value) === normalizeString(value)
        )
      }

      currentTitle.value = currentOffer.title
      currentPrice.value = currentOffer.price
    }

    watch([selectedProp], () => {
      setProductDataFromProp(selectedProp.value)
    })

    return {
      currentTitle,
      currentPrice,
      selectedProp
    }
  }
}
</script>

<style lang="scss" scoped>
  .catalog__title {
    a {
      display: block;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
</style>
