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
          <empty-request
            v-if="totalCount === 0"
            text="В корзине нет товаров. Сделайте ваш заказ."
          />
          <ul class="cart__list">
            <cart-item
              v-for="item in products"
              :key="item.id"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ numberFormat(totalPrice) }} ₽</span>
          </p>

          <error-field
            v-if='totalCount === 0'
            class='error-text'
            title='ваша корзина пуста'
            description='Для оформления заказа, выбирите товар'
          />

          <router-link
            v-else
            class="cart__button button button--primery"
            tag="button"
            type="submit"
            :to="{ name: 'order' }"
          >
            Оформить заказ
          </router-link>
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
import EmptyRequest from '../components/misc/EmptyRequest.vue'
import ErrorField from '../components/misc/ErrorField.vue'

export default {
  name: 'CartPage',
  components: {
    BreadCrumbs,
    CartItem,
    EmptyRequest,
    ErrorField
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalCount: 'productInCartCount',
      totalPrice: 'cartTotalPrice'
    }),
    breadcrumbsName () {
      return 'каталог/корзина'
    }
  },
  methods: {
    numberFormat (value) {
      return numberFormat(value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .error-text {
    color: #FFFFFF;
  }
</style>
