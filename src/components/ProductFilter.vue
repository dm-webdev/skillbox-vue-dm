<template>
  <aside class='filter'>
    <h2 class='filter__title'>Фильтры</h2>

    <form class='filter__form form' action='#' method='get'>
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
          <select class='form__select' type='text' name='category' v-model.number='currentCategoryId'>
            <option value='0'>Все категории</option>
            <option
              :value='category.categoryId'
              v-for='category in categories'
              :key='category.categoryId'
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class='form__block'>
        <legend class='form__legend'>Цвет</legend>
        <ColorsControl :color-palette='colorsBase' v-model:selected-color='currentSelectedColor' name='filter' />
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
import ColorsControl from './controls/ColorsControl'
import categories from '../data/categories'
import colorBase from '../data/colorsBase'

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
      currentSelectedColor: null
    }
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'selectedColor'],
  computed: {
    categories () {
      return categories
    },
    colorsBase () {
      return colorBase
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
    }
  }
}
</script>
