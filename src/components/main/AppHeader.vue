<template>
  <header class="header">
    <div class="header__wrapper container">
      <router-link tag='span' class="header__info" :to="{ name: 'catalog' }">Каталог</router-link>

      <router-link class="header__logo" :to="{ name: 'catalog' }">
        <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33" />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <cart-indicator />
    </div>
    <button type="button" @click="showState" class="hi">show</button>
  </header>
</template>

<script>
import CartIndicator from '@/components/misc/CartIndicator.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  components: {
    CartIndicator
  },
  computed: {
    ...mapGetters({
      state: 'getState',
      total: 'cartDetailProducts'
    })
  },
  methods: {
    showState () {
      console.log(this.state.currentUser)
      console.log(this.state.currentUser.cartProducts)
      console.log(this.state.apiConnection)
      console.log(this.total)
    }
  }
}
</script>

<style lang="scss" scoped>
  .hi {
    width: 60px;
  }
</style>
