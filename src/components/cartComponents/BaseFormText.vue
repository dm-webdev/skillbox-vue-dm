<template>
  <base-form-field :title="title" :errorText="errorText" :isTouched="isTouched">
    <input
      class="form__input"
      :type="fieldType"
      :placeholder="placeholder"
      v-model="currentValue"
      @blur="() => setIsTouched()"
      v-maska="fieldMask"
      autocomplete
    >
  </base-form-field>
</template>

<script>
import { ref } from 'vue'
import formFieldMixin from '@/mixins/formFieldMixin'
import { maska } from 'maska'

export default {
  name: 'BaseFormText',
  mixins: [formFieldMixin],
  props: {
    fieldMask: {
      type: String,
      required: false
    },
    fieldType: {
      default: 'text',
      type: String,
      required: false
    }
  },
  directives: {
    maska
  },
  setup () {
    const isTouched = ref(false)
    const setIsTouched = () => {
      isTouched.value = true
    }

    return { setIsTouched, isTouched }
  }
}
</script>
