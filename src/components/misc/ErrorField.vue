<template>
  <div class="cart__error form__error-block">
    <h4 class='error-title'>{{ title }}</h4>
    <p class='error-description'>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorField',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .error-title {
    text-transform: uppercase;
  }

  .error-description {
    color: inherit
  }
</style>
