<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.src"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ backgroundColor: item.color.code }"></i>
        {{ item.colorName }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <product-counter
      class="product__counter"
      v-model:amount='amount'
    />

    <b class="product__price"> {{ item.totalProductPrice }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct({ productId: item.productId, colorId: item.colorId })"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'
import ProductCounter from './controls/ProductCounter.vue'

export default {
  name: 'CartItem',
  components: {
    ProductCounter
  },
  props: {
    item: {
      type: Object,
      requared: true
    }
  },
  computed: {
    amount: {
      get () {
        return this.item.amount
      },
      set (value) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
          colorId: this.item.colorId
        })
      }
    }
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' })
  }
}
</script>

<style lang="scss" scoped>
  button {
    cursor: pointer;
  }
</style>
