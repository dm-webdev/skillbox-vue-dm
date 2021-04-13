<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{ name: 'cart' }">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <div
      class="lds-hourglass"
      v-if="$store.state.apiConnection.isCartLoading"
    />
    <span
      class="header__count"
      aria-label="Количество товаров"
      v-else
    >{{ $store.state.currentUser.cartProducts.length }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'CartIndicator'
}
</script>

<style>
  .lds-hourglass {
    display: inline-block;
    position: absolute;
    z-index: 90;
    top: -18px;
    right: 2px;
    width: 20px;
    height: 20px;
  }
  .lds-hourglass:after {
    content: " ";
    z-index: 90;
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 10px solid #9eff00;
    border-color: #9eff00 transparent #9eff00 transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
</style>
