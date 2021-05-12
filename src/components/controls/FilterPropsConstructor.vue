<template>
    <fieldset
      class='form__block'
      v-for='prop, index in currentPropsData'
      :key='index'
    >
      <legend class='form__legend'>{{ prop.title }}</legend>
      <colors-control
        v-if="prop.code === 'color'"
        :color-palette='colorsBase'
        v-model:selected-color='currentSelectedProps'
        input-type='checkbox'
      />

      <product-props-control
        v-else
        :propsPalette='prop.availableValues'
        v-model:selected-prop='currentSelectedProps'
        input-type='checkbox'
        current-class='check-list'
      />
    </fieldset>
</template>

<script>
import { ref, watch } from 'vue'
import axios from '@/helpers/axiosConfig'
import { useStore } from 'vuex'
import ColorsControl from '@/components/controls/ColorsControl.vue'
import ProductPropsControl from './productPropsControl.vue'
import { normalizeString } from '@/helpers/formatHelpers'

export default {
  name: 'FilterPropsConstructor',
  components: {
    ColorsControl,
    ProductPropsControl
  },
  emits: ['update:selectedProps'],
  props: {
    propsData: Object,
    selectedProps: Object
  },
  setup (props, context) {
    const store = useStore()
    const currentPropsData = ref(props.propsData?.productProps)
    const colors = ref(null)
    const colorsBase = ref(null)
    const currentSelectedProps = ref([])

    watch(props, () => {
      currentPropsData.value = props.propsData?.productProps
      colors.value = currentPropsData.value?.find(item => item.code === 'color')
        ?.availableValues.filter(item => item.productsCount !== 0) || null

      if (colors.value) {
        store.commit('setIsLoading', true)
        axios.get('colors/')
          .then(response => {
            colorsBase.value = response.data.items.filter(
              item => colors.value.find(
                availableColor => normalizeString(availableColor.value) === normalizeString(item.title)
              ))
          })
          .catch(() => store.commit('setMessage', {
            modalContent: 'Что-то пошло не так, повторите запрос позднее',
            modalType: 'error'
          }))
          .finally(() => store.commit('setIsLoading', false))
      }
    })

    watch([currentSelectedProps], () => {
      const propsList = {}
      currentSelectedProps.value.forEach(selectedProp => {
        const key = currentPropsData.value?.find(
          item => item.availableValues.map(item => normalizeString(item.value)).includes(normalizeString(selectedProp))
        )?.code

        if (key in propsList) {
          propsList[key].push(selectedProp)
        } else {
          propsList[key] = [selectedProp]
        }
      })
      context.emit('update:selectedProps', propsList)
    })

    return {
      currentPropsData,
      colorsBase,
      currentSelectedProps
    }
  }
}
</script>
