<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent='currentAmount--'
      :disabled='this.amount === 1'
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="number"
      v-model.number='currentAmount'
      min="1"
      required
    >

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent='currentAmount++'
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  name: 'ProductCounter',
  props: {
    amount: Number
  },
  emits: ['update:amount'],
  computed: {
    currentAmount: {
      get () {
        return this.amount
      },
      set (value) {
        this.$emit('update:amount', value > 0 ? value : 1)
      }
    }
  }
}
</script>
