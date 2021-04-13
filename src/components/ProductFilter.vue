<template>
  <aside class='filter'>
    <h2 class='filter__title'>Фильтры</h2>

    <form class='filter__form form' @submit.prevent="submitFilter">
      <fieldset class='form__block'>
        <legend class='form__legend'>Цена</legend>
        <label class='form__label form__label--price'>
          <input class='form__input' type='text' name='min-price' v-model.number='currentPriceFrom'>
          <span class='form__value'>От</span>
        </label>
        <label class='form__label form__label--price'>
          <input class='form__input' type='text' name='max-price' v-model.number="currentPriceTo">
          <span class='form__value'>До</span>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Категория</legend>
        <label class='form__label form__label--select'>
          <select class='form__select' v-model.number='currentCategoryId'>
            <option value='0'>Все категории</option>
            <option
              :value='category.id'
              v-for='category in categories'
              :key='category.id'
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Цвет</legend>
        <colors-control :color-palette='colorsBase' v-model:selected-color='currentSelectedColor' />
      </fieldset>

      <button class='filter__submit button button--primery' type='submit' @click.prevent='submitFilter'>
        Применить
      </button>
      <button class='filter__reset button button--second' type='button' @click.prevent='cleanFilter'>
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import ColorsControl from '@/components/controls/ColorsControl.vue'
import axios from '@/helpers/axiosConfig'

export default {
  name: 'ProductFilter',
  components: {
    ColorsControl
  },
  data () {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentSelectedColor: null,
      categoriesData: null,
      colorsData: null
    }
  },
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: Number,
    selectedColor: String
  },
  computed: {
    categories () {
      return this.categoriesData ? this.categoriesData.items : null
    },
    colorsBase () {
      return this.colorsData
        ? this.colorsData.items.filter(color => !color.title.includes('script'))
        : null
    }
  },
  watch: {
    priceFrom (value) {
      this.currentPriceFrom = value
    },
    priceTo (value) {
      this.currentPriceTo = value
    },
    categoryId (value) {
      this.currentCategoryId = value
    },
    selectedColor (value) {
      this.currentSelectedColor = value
    }

  },
  methods: {
    submitFilter () {
      this.$emit('update:priceFrom', this.currentPriceFrom)
      this.$emit('update:priceTo', this.currentPriceTo)
      this.$emit('update:categoryId', this.currentCategoryId)
      this.$emit('update:selectedColor', this.currentSelectedColor)
    },
    cleanFilter () {
      this.$emit('update:priceFrom', 0)
      this.$emit('update:priceTo', 0)
      this.$emit('update:categoryId', 0)
      this.$emit('update:selectedColor', null)
    },
    getCategories () {
      this.$store.commit('setIsLoading', true)
      axios.get('productCategories/')
        .then(response => {
          this.categoriesData = response.data
        })
        .catch(() => this.$store.commit('setMessage', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
        .finally(() => this.$store.commit('setIsLoading', false))
    },
    getColors () {
      this.$store.commit('setIsLoading', true)
      axios.get('colors/')
        .then(response => {
          this.colorsData = response.data
        })
        .catch(() => this.$store.commit('setMessage', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
        .finally(() => this.$store.commit('setIsLoading', false))
    }
  },
  created () {
    this.getCategories()
    this.getColors()
  }
}
</script>
