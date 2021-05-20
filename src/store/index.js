import mutations from './mutations'
import getters from './getters'
import actions from './actions/'
import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      apiConnection: {
        isLoading: false,
        isCartLoading: false,
        modalContent: null,
        modalType: null,
        showCloseBtn: true,
        currentId: null
      },
      currentUser: {
        accessKey: null,
        cartProducts: [],
        currentOrderInfo: null
      },
      catalog: {
        products: null,
        currentProduct: { id: -1 },
        categories: null
      }
    }
  },
  mutations,
  getters,
  actions
})
