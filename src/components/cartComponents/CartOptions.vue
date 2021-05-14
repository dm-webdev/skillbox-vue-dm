<template>
  <ul class="cart__options options">
    <li
      class="options__item"
      v-for="option in currentOptionsList"
      :key="option.title"
    >
      <label class="options__label">
        <input class="options__radio sr-only" type="radio" :value="option.id" v-model="currentSelectedOption">
        <span class="options__value">
          {{ option.title }} <b v-if="option.price">{{ option.desk }}</b>
        </span>
      </label>
    </li>
  </ul>

</template>

<script>
import { numberFormat } from '@/helpers/formatHelpers'

export default {
  name: 'CartOptions',
  props: {
    optionsList: {
      type: Object,
      requared: true
    },
    selectedOption: {
      type: [String, Number],
      requared: false
    }
  },
  emits: ['update:selectedOption'],
  computed: {
    currentSelectedOption: {
      get () {
        if (this.selectedOption === -1 || !this.optionsList.find(item => item.id === this.selectedOption)) {
          this.$emit('update:selectedOption', this.optionsList[0].id)
          return this.optionsList[0].id
        } else {
          return this.selectedOption
        }
      },
      set (value) {
        this.$emit('update:selectedOption', value)
      }
    },
    currentOptionsList () {
      function priceToDesc (item) {
        if (item?.price !== '0') {
          return `${numberFormat(+item.price)} ₽`
        }
        return 'бесплатно'
      }
      return this.optionsList.map(item => {
        return {
          ...item,
          desk: priceToDesc(item)
        }
      })
    }
  }
}
</script>
