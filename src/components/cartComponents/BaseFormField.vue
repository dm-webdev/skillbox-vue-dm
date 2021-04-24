<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="isTouched && !!errorText">{{ errorText }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',
  props: {
    title: {
      type: String,
      required: true
    },
    errorText: {
      type: String,
      required: false
    },
    isTouched: {
      type: Boolean,
      required: false
    }
  }
}
</script>
