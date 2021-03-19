<template>
  <div>
    <a class='catalog__pic' href='#'>
      <img :src='product.src' :alt='product.title' />
    </a>

    <h3 class='catalog__title'>
      <a href='#'>{{ product.title }}</a>
    </h3>

    <span class='catalog__price'> {{ product.price }} ₽ </span>
    <ColorsControl
      :color-palette='product.colors'
      isBlack='true'
      :name='product.id'
      v-model:selected-color='selectedColor'
    />
  </div>
</template>

<script>
import ColorsControl from './controls/ColorsControl'

export default {
  name: 'ProductCard',
  components: {
    ColorsControl
  },
  props: ['product'],
  data () {
    return {
      selectedColor: this.product.colors[0].colorId
    }
  }
}
</script>
