<template>
  <ul :class='currentClass'>
    <li
      :class="`${currentClass}__item`"
      v-for='prop, index in propsPalette' :key='index'
    >
      <label :class="`${currentClass}__label`">
        <input
          :class="`${currentClass}__radio sr-only check-list__check`"
          :type='inputType'
          :value='prop.value'
          v-model='currentSelectedProp'
        >
        <span :class="`${currentClass}__value ${currentClass}__desc`">
          {{ prop.value }}
          <span v-if="prop.productsCount === 0 || !!prop.productsCount">({{ prop.productsCount }})</span>
        </span>
      </label>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'productPropsControl',
  props: {
    propsPalette: {
      type: Object,
      requared: true
    },
    selectedProp: {
      requared: false
    },
    inputType: {
      type: String,
      requared: true
    },
    currentClass: {
      type: String,
      requared: true
    }
  },
  emits: ['update:selectedProp'],
  computed: {
    currentSelectedProp: {
      get () {
        if (this.selectedProp === '-1' && this.inputType === 'radio') {
          this.$emit('update:selectedProp', this.propsPalette[0].value)
          return this.propsPalette[0].value
        } else {
          return this.selectedProp
        }
      },
      set (value) {
        this.$emit('update:selectedProp', value)
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
