<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" v-for='name in names.nameList' :key='name'>
      <router-link
        class="breadcrumbs__link"
        :to="{ name: 'catalog' }"
      >
        {{ name }}
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link">
        {{ names.currentName }}
      </a>
    </li>
  </ul>
</template>

<script>
import { capitalizeFirstLetter } from '@/helpers/formatHelpers'

export default {
  name: 'BreadCrumbs',
  props: {
    name: {
      type: String,
      requared: true
    }
  },
  computed: {
    names () {
      const list = this.name.split('/')
      const nameList = list.map((item) => capitalizeFirstLetter(item))
      const currentName = nameList.pop()

      return { nameList, currentName }
    }
  }
}
</script>
