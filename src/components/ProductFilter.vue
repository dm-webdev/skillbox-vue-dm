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

      <filter-props-constructor
        :props-data='currentCategoryProps'
        v-model:selected-props='currentSelectedProps'
      />

      <button class='filter__submit button button--primery' type='submit' @click.prevent='submitFilter'>
        Применить
      </button>
      <button
        v-if='isCleanBtnHide'
        class='filter__reset button button--second'
        type='button'
        @click.prevent='cleanFilter'
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from '@/helpers/axiosConfig'
import FilterPropsConstructor from './controls/FilterPropsConstructor.vue'
import { ref, watch } from 'vue'

export default {
  name: 'ProductFilter',
  components: {
    FilterPropsConstructor
  },
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: Number,
    selectedProps: String
  },
  computed: {
    categories () {
      return this.categoriesData ? this.categoriesData.items : null
    }
  },
  setup () {
    const currentPriceFrom = ref(0)
    const currentPriceTo = ref(0)
    const currentCategoryId = ref(0)
    const currentSelectedProps = ref({})
    const isCleanBtnHide = ref(false)

    watch([currentPriceFrom, currentPriceTo, currentCategoryId], (values) => {
      if (values.some(item => item > 0 && item !== '')) {
        isCleanBtnHide.value = true
      } else {
        isCleanBtnHide.value = false
      }
    })

    function cleanFilter () {
      currentPriceFrom.value = 0
      currentPriceTo.value = 0
      currentCategoryId.value = 0
      currentSelectedProps.value = {}
      isCleanBtnHide.value = false
    }

    return {
      currentPriceFrom,
      currentPriceTo,
      currentCategoryId,
      currentSelectedProps,
      isCleanBtnHide,
      cleanFilter
    }
  },
  data () {
    return {
      categoriesData: null,
      currentCategoryProps: null
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
    currentCategoryId (value) {
      if (value) {
        this.getCategorieProps(value)
      } else {
        this.currentCategoryProps = {}
      }
    }
  },
  methods: {
    submitFilter () {
      this.$emit('update:priceFrom', this.currentPriceFrom)
      this.$emit('update:priceTo', this.currentPriceTo)
      this.$emit('update:categoryId', this.currentCategoryId)
      this.$emit('update:selectedProps', this.currentSelectedProps)
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
    getCategorieProps (id) {
      this.$store.commit('setIsLoading', true)
      axios.get(`productCategories/${id}`)
        .then(response => {
          this.currentCategoryProps = response.data
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
  }
}
</script>
