<template>
  <ul class='catalog__list'>
    <li class='catalog__item'
      v-for='product in products'
      :key='product.id'
    >
      <product-card
        :product='product'
      />
    </li>
  </ul>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  props: {
    products: Object
  }
}
</script>
