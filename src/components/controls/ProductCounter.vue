<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent='reduceAmount'>
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="number" v-model.number='inputAmount'>

    <button type="button" aria-label="Добавить один товар" @click.prevent='increaseAmount'>
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
  data () {
    return {
      currentAmount: this.amount || 1
    }
  },
  emits: ['update:currentAmount'],
  methods: {
    increaseAmount () {
      this.$emit('update:currentAmount', this.currentAmount += 1)
    },
    reduceAmount () {
      if (this.currentAmount === 1) {
        this.$emit('update:currentAmount', this.currentAmount = 1)
      } else {
        this.$emit('update:currentAmount', this.currentAmount -= 1)
      }
    }
  },
  computed: {
    inputAmount: {
      get () {
        return this.currentAmount
      },
      set (value) {
        if (value < 1) {
          this.$emit('update:currentAmount', this.currentAmount = 1)
        } else {
          this.$emit('update:currentAmount', this.currentAmount = value)
        }
      }
    }
  }
}
</script>
