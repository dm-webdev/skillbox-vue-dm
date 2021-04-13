<template>
  <app-header />

  <router-view />
  <loader v-if='$store.state.apiConnection.isLoading' />
  <modal-message v-if='!!$store.state.apiConnection.modalContent' />
  <app-footer />
</template>

<script>
import AppHeader from '@/components/main/AppHeader.vue'
import AppFooter from '@/components/main/AppFooter.vue'
import Loader from '@/components/misc/Loader.vue'
import ModalMessage from './components/modals/modalMessage.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Loader,
    ModalMessage
  }
}
</script>
