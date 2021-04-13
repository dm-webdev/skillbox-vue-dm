<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image.file.url"
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
        <i :style="{ backgroundColor: item.product.colors[0].code }"></i>
        {{ item.colorName }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <product-counter
      class="product__counter"
      v-model:amount='amount'
    />

    <b class="product__price"> {{ item.totalProductPrice }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="onDeleteProduct({
        modalContent: `Вы действительно хотите удалить ${item.product.title}`,
        modalType: 'delete',
        currentId: item.product.id
      })"
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
        return this.item.quantity
      },
      set (value) {
        this.$store.dispatch('updateProductAmount', {
          productId: this.item.product.id,
          amount: value
        })
      }
    }
  },
  methods: {
    ...mapMutations({ onDeleteProduct: 'setMessage' })
  }
}
</script>

<style lang="scss" scoped>
  button {
    cursor: pointer;
  }
</style>
