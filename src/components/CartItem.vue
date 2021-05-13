<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.img"
        width="120"
        height="120"
        :alt="item.productOffer.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.productOffer.title }}
    </h3>

    <p class="product__info product__info--color" v-if='item.isColor'>
      Цвет:
      <span>
        <i :style="{ backgroundColor: item.propValue[1] }"></i>
        {{ item.propValue[0] }}
      </span>
    </p>

    <p class="product__info" v-else>
      {{ item.propTitle}} <span>{{ item.propValue }}</span>
    </p>

    <span class="product__code"> Артикул: {{ item.id }} </span>

    <product-counter
      class="product__counter"
      v-model:amount='amount'
    />

    <b class="product__price"> {{ numberFormat(item.totalProductPrice) }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="onDeleteProduct({
        modalContent: `Вы действительно хотите удалить ${item.productOffer.title}`,
        modalType: 'delete',
        currentId: item.id
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
import { numberFormat } from '@/helpers/formatHelpers'

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
          productId: this.item.id,
          amount: value
        })
      }
    }
  },
  methods: {
    ...mapMutations({ onDeleteProduct: 'setMessage' }),
    numberFormat (value) {
      return numberFormat(value)
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    cursor: pointer;
  }
</style>
