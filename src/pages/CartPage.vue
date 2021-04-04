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
            <li class="cart__item product" v-for="item in products" :key="item.proproductId + item.colorId">
              <div class="product__pic">
                <img :src="item.product.src" width="120" height="120" :alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>
              <p class="product__info product__info--color">
                Цвет:
                <span>
                  <i :style='{backgroundColor: item.color.HEX}'></i>
                  {{ item.colorName }}
                </span>
              </p>
              <span class="product__code">
                Артикул: {{ item.productId }}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" :value="item.amount" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{ item.totalProductPrice }} ₽
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
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
import { mapGetters } from 'vuex'
import { numberFormat } from '@/helpers/formatHelpers'

export default {
  name: 'CartPage',
  components: {
    BreadCrumbs
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
