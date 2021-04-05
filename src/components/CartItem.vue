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
        <i :style="{ backgroundColor: item.color.HEX }"></i>
        {{ item.colorName }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="reduceAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" />

      <button type="button" aria-label="Добавить один товар" @click.prevent="increaseAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

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

export default {
  name: 'CartItem',
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
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
    increaseAmount () {
      this.$store.commit('updateCartProductAmount', {
        productId: this.item.productId,
        amount: this.amount += 1,
        colorId: this.item.colorId
      })
    },
    reduceAmount () {
      if (this.amount === 1) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: 1,
          colorId: this.item.colorId
        })
      } else {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: this.amount -= 1,
          colorId: this.item.colorId
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    cursor: pointer;
  }
</style>
