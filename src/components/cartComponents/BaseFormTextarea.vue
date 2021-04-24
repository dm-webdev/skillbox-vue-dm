<template>
  <base-form-field :title="title" :errorText="errorText" :isTouched="isTouched">
    <textarea
      class="form__input form__input--area"
      :placeholder="placeholder"
      v-model="currentValue"
      @blur="setIsTouched"
    />
  </base-form-field>
</template>

<script>
import { ref } from 'vue'
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  name: 'BaseFormTextarea',
  mixins: [formFieldMixin],
  setup () {
    const isTouched = ref(false)
    const setIsTouched = () => {
      isTouched.value = true
    }

    return { setIsTouched, isTouched }
  }
}
</script>
