import BaseFormField from '@/components/cartComponents/BaseFormField.vue'

export default {
  components: { BaseFormField },
  props: {
    title: {
      type: String,
      required: true
    },
    errorText: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    }
  },
  emits: ['update:value'],
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value)
      }
    }
  }
}
