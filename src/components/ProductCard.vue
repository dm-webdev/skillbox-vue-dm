<template>
  <div>
    <router-link
      class='catalog__pic'
      :to="{ name: 'product', params: {id: product.id} }"
    >
      <img :src='product.src' :alt='product.title' />
    </router-link>

    <h3 class='catalog__title'>
      <a href='#'>{{ product.title }}</a>
    </h3>

    <span class='catalog__price'> {{ formatedPrice }} ₽ </span>
    <colors-control
      class='colors--black'
      :color-palette='product.colors'
      v-model:selected-color='selectedColor'
    />
  </div>
</template>

<script>
import ColorsControl from '@/components/controls/ColorsControl.vue'
import { numberFormat } from '@/helpers/formatHelpers'

export default {
  name: 'ProductCard',
  components: {
    ColorsControl
  },
  props: {
    product: {
      type: Object,
      requared: true
    }
  },
  data () {
    return {
      selectedColor: this.product.colors[0].id
    }
  },
  computed: {
    formatedPrice () {
      return numberFormat(this.product.price)
    }
  }
}
</script>
