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
        <span class='colors__value' :style='{backgroundColor: color.code}' :title='color.title' />
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
        if (this.selectedColor === -1) {
          this.$emit('update:selectedColor', this.colorPalette[0].id)
          return this.colorPalette[0].id
        } else {
          return this.selectedColor
        }
      },
      set (value) {
        this.$emit('update:selectedColor', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .colors__value {
    border: 1px solid #000000;
  }
</style>
