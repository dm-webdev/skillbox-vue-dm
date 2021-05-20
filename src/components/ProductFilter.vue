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
          <select class='form__select' v-model='currentCategoryId'>
            <option value=''>Все категории</option>
            <option
              :value='category.slug'
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
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ProductFilter',
  components: {
    FilterPropsConstructor
  },
  props: {
    priceFrom: Number,
    priceTo: Number,
    categoryId: String,
    selectedProps: Object
  },
  computed: {
    categories () {
      return this.categoriesData ? this.categoriesData.items : null
    }
  },
  setup (props, context) {
    const store = useStore()
    const currentPriceFrom = ref(0)
    const currentPriceTo = ref(0)
    const currentCategoryId = ref('')
    const currentSelectedProps = ref({})
    const isCleanBtnHide = ref(false)

    if (!store.getters.getCategories) {
      store.dispatch('getCategories')
    }

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
      currentCategoryId.value = ''
      currentSelectedProps.value = {}
      isCleanBtnHide.value = false
      submitFilter()
    }

    function submitFilter () {
      context.emit('update:priceFrom', currentPriceFrom.value)
      context.emit('update:priceTo', currentPriceTo.value)
      context.emit('update:categoryId', currentCategoryId.value)
      context.emit('update:selectedProps', currentSelectedProps.value)
    }

    return {
      currentPriceFrom,
      currentPriceTo,
      currentCategoryId,
      currentSelectedProps,
      isCleanBtnHide,
      cleanFilter,
      submitFilter,
      categoriesData: computed(() => store.getters.getCategories)
    }
  },
  data () {
    return {
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
    getCategorieProps (id) {
      axios.get(`productCategories/${id}`)
        .then(response => {
          this.currentCategoryProps = response.data
        })
        .catch(() => this.$store.dispatch('modalOpen', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
    }
  }
}
</script>
