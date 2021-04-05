<template>
  <main class="content container">
    <div class="content__top">
      <bread-crumbs :name='breadcrumbsName' />
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info" v-if="totalCount === 0">
        Ваша корзина пуста.
      </span>
      <span class="content__info" v-if="totalCount > 0">
        Общее количество товаров в корзине: {{ totalCount }} шт
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item
              v-for="item in products"
              :key="item.productId + item.colorId"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ formatedTotalPrice }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BreadCrumbs from '@/components/controls/BreadCrumbs.vue'
import CartItem from '@/components/CartItem.vue'
import { mapGetters } from 'vuex'
import { numberFormat } from '@/helpers/formatHelpers'

export default {
  name: 'CartPage',
  components: {
    BreadCrumbs,
    CartItem
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalCount: 'productInCartCount',
      totalPrice: 'cartTotalPrice'
    }),
    formatedTotalPrice () {
      return numberFormat(this.totalPrice)
    },
    breadcrumbsName () {
      return 'каталог/корзина'
    }
  }
}
</script>
