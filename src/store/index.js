import { createStore } from 'vuex'
import { numberFormat, capitalizeFirstLetter } from '@/helpers/formatHelpers'
import axios from '@/helpers/axiosConfig'

export const store = createStore({
  state () {
    return {
      apiConnection: {
        isLoading: false,
        isCartLoading: false,
        modalContent: null,
        modalType: null,
        currentId: null
      },
      currentUser: {
        accessKey: null,
        cartProducts: []
      }
    }
  },
  mutations: {
    setMessage (state, { modalContent, modalType, currentId = null }) {
      state.apiConnection.modalContent = modalContent
      state.apiConnection.modalType = modalType
      state.apiConnection.currentId = currentId
    },
    cleanMessage (state) {
      state.apiConnection.modalContent = null
      state.apiConnection.modalType = null
      state.apiConnection.currentId = null
    },
    setIsLoading (state, isLoading) {
      state.apiConnection.isLoading = isLoading
    },
    setIsCartLoading (state, isCartLoading) {
      state.apiConnection.isCartLoading = isCartLoading
    },
    updateUserAccessKey (state, accessKey) {
      state.currentUser.accessKey = accessKey
    },
    updateCartProducts (state, items) {
      state.currentUser.cartProducts = items
    }
  },
  getters: {
    cartDetailProducts (state) {
      return state.currentUser.cartProducts.map(item => {
        return {
          ...item,
          colorName: capitalizeFirstLetter(item.product.colors[0].title),
          totalProductPrice: numberFormat(item.price * item.quantity)
        }
      })
    },
    productInCartCount (state, getters) {
      return getters.cartDetailProducts.reduce((sum, item) => sum + item.quantity, 0)
    },
    cartTotalPrice (state, getters) {
      return getters.cartDetailProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    getState (state) {
      return state
    }
  },
  actions: {
    getCart (context) {
      context.commit('setIsLoading', true)
      context.commit('setIsCartLoading', true)
      return axios.get('baskets', {
        params: {
          userAccessKey: context.state.currentUser.accessKey
        }
      })
        .then(response => {
          if (!context.state.currentUser.accessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProducts', response.data.items)
        })
        .catch(() => context.commit('setMessage', {
          modalContent: 'Что-то пошло не так, повторите запрос позднее',
          modalType: 'error'
        }))
        .finally(() => {
          context.commit('setIsLoading', false)
          context.commit('setIsCartLoading', false)
        })
    },
    addToCart (context, { productId, amount }) {
      context.commit('setIsLoading', true)
      context.commit('setIsCartLoading', true)
      return axios.post('baskets/products', {
        productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.currentUser.accessKey
        }
      })
        .then(response => {
          context.commit('updateCartProducts', response.data.items)
          context.commit('setMessage', {
            modalContent: 'Товар успешно добавлен в корзину',
            modalType: 'success'
          })
        })
        .catch((err) => context.commit('setMessage', {
          modalContent: `${err.response.data.error.message}`,
          modalType: 'error'
        }))
        .finally(() => {
          context.commit('setIsLoading', false)
          context.commit('setIsCartLoading', false)
        })
    },
    updateProductAmount (context, { productId, amount }) {
      if (Number.isFinite(amount) && amount > 0) {
        context.commit('setIsLoading', true)
        context.commit('setIsCartLoading', true)
        return axios.put('baskets/products', {
          productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: context.state.currentUser.accessKey
          }
        })
          .then(response => {
            context.commit('updateCartProducts', response.data.items)
          })
          .catch((err) => {
            context.commit('setMessage', {
              modalContent: `${err.response.data.error.message}`,
              modalType: 'error'
            })
          })
          .finally(() => {
            context.commit('setIsLoading', false)
            context.commit('setIsCartLoading', false)
          })
      }
    },
    deleteProductFromCart (context, { productId }) {
      context.commit('setIsLoading', true)
      context.commit('setIsCartLoading', true)
      return axios.delete('baskets/products', {
        params: {
          userAccessKey: context.state.currentUser.accessKey
        },
        data: {
          productId: productId
        }
      })
        .then(response => {
          context.commit('updateCartProducts', response.data.items)
          context.commit('cleanMessage')
          context.commit('setMessage', {
            modalContent: 'Товар успешно удален из корзины',
            modalType: 'success'
          })
        })
        .catch((err) => context.commit('setMessage', {
          modalContent: `${err.response.data.error.message}`,
          modalType: 'error'
        }))
        .finally(() => {
          context.commit('setIsLoading', false)
          context.commit('setIsCartLoading', false)
        })
    }
  }
})
