<template>
  <div>
    <router-link
      class='catalog__pic'
      :to="{ name: 'product', params: {id: product.slug} }"
    >
      <img :src='product.image.file.url' :alt='product.title' />
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
      selectedColor: -1
    }
  },
  computed: {
    formatedPrice () {
      return numberFormat(this.product.price)
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
