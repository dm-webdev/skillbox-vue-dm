<template>
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item" v-for="tab, index in currentTabs" :key="tab.id + index">
        <a
          :class="{'tabs__link': true, 'tabs__link--current': tab.id === contentKey}"
          @click.prevent='contentKey = tab.id'>
          {{ tab.title }}
        </a>
      </li>
    </ul>

    <empty-request
      v-if='!currentContent.content'
      :text="`${currentContent.title} товара не найдено.`"
    />
    <div v-else class="item__content">
      <p v-if="typeof currentContent.content === 'string'">{{ currentContent.content }}</p>

      <ul v-else-if="typeof currentContent.content === 'object'">
        <li v-for='property, index in currentContent.content' :key='index'>
          <h3>{{ property.title }}</h3>
          <p>{{ property.value }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import EmptyRequest from '@/components/misc/EmptyRequest.vue'

export default {
  name: 'AccordionProduct',
  props: {
    productData: {
      type: Object,
      requared: true
    }
  },
  components: { EmptyRequest },
  computed: {
    currentTabs () {
      const currentTabs = this.tabs
      if (this.productData) {
        currentTabs[0].content = this.productData.content
        currentTabs[1].content = this.productData.specifications
      }
      return currentTabs
    }
  },
  setup () {
    const tabs = reactive([
      { title: 'Описание', id: 1 },
      { title: 'Характеристики', id: 2 }
    ])
    const contentKey = ref(1)
    const currentContent = ref(setCurrentContent(contentKey.value, tabs))

    function setCurrentContent (key, data) {
      return data?.find(item => item.id === key)
    }

    watch(contentKey, () => {
      currentContent.value = setCurrentContent(contentKey.value, tabs)
    })

    return {
      contentKey,
      tabs,
      currentContent
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    cursor: pointer;
  }
</style>
