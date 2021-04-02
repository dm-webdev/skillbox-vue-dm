<template>
  <app-header />

  <router-view />

  <app-footer />
</template>

<script>
import AppHeader from '@/components/main/AppHeader.vue'
import AppFooter from '@/components/main/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
