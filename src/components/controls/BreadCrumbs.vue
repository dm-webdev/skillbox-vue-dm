<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" v-for='(name, index) in names.nameList' :key='name'>
      <router-link
        class="breadcrumbs__link"
        :to="{ name: slugs.slugsList[index] }"
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
    },
    slug: {
      type: String,
      requared: false
    }
  },
  computed: {
    names () {
      const list = this.name.split('/')
      const nameList = list.map((item) => capitalizeFirstLetter(item))
      const currentName = nameList.pop()

      return { nameList, currentName }
    },
    slugs () {
      const slugsList = (this.slug) ? this.slug.split('/') : 'catalog/catalog/catalog'.split('/')

      return { slugsList }
    }
  }
}
</script>
