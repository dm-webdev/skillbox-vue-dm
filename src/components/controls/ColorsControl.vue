<template>
  <ul class='colors'>
    <li class='colors__item' v-for='color in colorPalette' :key='color.id'>
      <label class='colors__label'>
        <input
          class='colors__radio sr-only'
          type='radio'
          :value='color.id'
          v-model='currentSelectedColor'
        >
        <span class='colors__value' :style='{backgroundColor: color.HEX}'>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ColorsControl',
  props: {
    colorPalette: {
      type: Object,
      requared: true
    },
    selectedColor: Number
  },
  emits: ['update:selectedColor'],
  computed: {
    currentSelectedColor: {
      get () {
        return this.selectedColor
      },
      set (value) {
        this.$emit('update:selectedColor', value)
      }
    }
  }
}
</script>
