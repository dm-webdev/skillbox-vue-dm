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
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Loader,
    ModalMessage
  },
  setup () {
    const store = useStore()
    const userAccessKey = localStorage.getItem('userAccessKey')

    if (userAccessKey) {
      store.commit('updateUserAccessKey', userAccessKey)
    }
    store.dispatch('getCart')
  }
}
</script>
