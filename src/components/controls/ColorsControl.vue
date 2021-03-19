<template>
  <ul class='colors' :class="{'colors--black': isBlack}">
    <li class='colors__item' v-for='color in colorPalette' :key='color.colorId'>
      <label class='colors__label'>
        <input
          class='colors__radio sr-only'
          type='radio'
          :name='name'
          :value='color.HEX'
          v-model='curentSelectedColor'
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
  props: ['colorPalette', 'isBlack', 'name', 'selectedColor'],
  emits: ['update:selectedColor'],
  computed: {
    curentSelectedColor: {
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
