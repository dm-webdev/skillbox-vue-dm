<template>
  <header class="header">
    <div class="header__wrapper container">
      <router-link tag='span' class="header__info" :to="{ name: 'catalog' }">Каталог</router-link>

      <a class="header__logo"  href="https://www.dm-webdev.ru/">
        <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33" />
      </a>

      <a class="header__tel" href="tel:8 XXX XXX XX XX">
        8 XXX XXX XX XX
      </a>

      <cart-indicator />
    </div>
  </header>
</template>

<script>
import CartIndicator from '@/components/misc/CartIndicator.vue'

export default {
  name: 'AppHeader',
  components: {
    CartIndicator
  }
}
</script>

<style lang="scss" scoped>
  .hi {
    width: 60px;
  }
</style>
