<template>
  <main class="content container" v-if="product">
    <div class="content__top">
      <bread-crumbs :name='breadcrumbsName' />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src='product.src' :alt='product.title'>
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" :src='product.src' :alt='product.title'>
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" :src='product.src' :alt='product.title'>
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" :src='product.src' :alt='product.title'>
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img width="98" height="98" :src='product.src' :alt='product.title'>
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent='addToCart'>
            <b class="item__price">
              {{ formatedPrice }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <colors-control
                :color-palette='product.colors'
                v-model:selected-color='selectedColor'
              />
            </fieldset>

            <!-- <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset> -->

            <div class="item__row">
              <product-counter
                :amount='productAmount'
                v-model:currentAmount='productAmount'
              />
              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import products from '@/data/products'
import categories from '@/data/categories'
import ColorsControl from '@/components/controls/ColorsControl.vue'
import BreadCrumbs from '@/components/controls/BreadCrumbs.vue'
import { numberFormat } from '@/helpers/formatHelpers'
import ProductCounter from '../components/controls/ProductCounter.vue'
import { watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'ProductPage',
  components: {
    ColorsControl,
    BreadCrumbs,
    ProductCounter
  },
  props: {
    pageParams: {
      type: Object,
      requared: true
    }
  },
  computed: {
    product () {
      return products.find(product => product.id === +this.$route.params.id)
    },
    category () {
      if (!this.product) return null
      return categories.find(category => category.categoryId === this.product.categoryId)
    },
    formatedPrice () {
      return numberFormat(this.product.price)
    },
    breadcrumbsName () {
      if (!this.category) return ''
      return `каталог/ ${this.category.title}/ ${this.product.title}`
    }
  },
  data () {
    return {
      selectedColor: -1,
      productAmount: 1
    }
  },
  methods: {
    addToCart () {
      this.$store.commit(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount, colorId: this.selectedColor }
      )
    }
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    watchEffect(() => {
      if (route.path.includes('product') && !products.find(item => item.id === +route.params.id)) {
        router.replace({ name: 'notFound' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  img {
    max-height: 570px;
  }
</style>
