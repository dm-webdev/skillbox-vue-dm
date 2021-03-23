<template>
  <div>
    <a
      class='catalog__pic'
      href='#'
      @click.prevent="gotoPage('product', {id: product.id})"
    >
      <img :src='product.src' :alt='product.title' />
    </a>

    <h3 class='catalog__title'>
      <a href='#'>{{ product.title }}</a>
    </h3>

    <span class='catalog__price'> {{ product.price }} ₽ </span>
    <ColorsControl
      class='colors--black'
      :color-palette='product.colors'
      v-model:selected-color='selectedColor'
    />
  </div>
</template>

<script>
import ColorsControl from '@/components/controls/ColorsControl.vue'
import eventBus from '@/eventBus'

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
  methods: {
    gotoPage (pageName, pageParams) {
      eventBus.emit('gotoPage', pageName, pageParams)
    }
  }
}
</script>
