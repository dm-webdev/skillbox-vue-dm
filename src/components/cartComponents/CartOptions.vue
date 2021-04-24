<template>
  <ul class="cart__options options">
    <li
      class="options__item"
      v-for="option in optionsList"
      :key="option.title"
    >
      <label class="options__label">
        <input class="options__radio sr-only" type="radio" :value="option.value" v-model="currentSelectedOption">
        <span class="options__value">
          {{ option.title }} <b v-if="option.desk">{{ option.desk }}</b>
        </span>
      </label>
    </li>
  </ul>

</template>

<script>
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
        if (this.selectedOption === -1) {
          this.$emit('update:selectedOption', this.optionsList[0].value)
          return this.optionsList[0].value
        } else {
          return this.selectedOption
        }
      },
      set (value) {
        this.$emit('update:selectedOption', value)
      }
    }
  }
}
</script>
