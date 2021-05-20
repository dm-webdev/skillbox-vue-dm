import axios from '@/helpers/axiosConfig'

export default {
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

  addToCart (context, { productOfferId, colorId, quantity }) {
    context.commit('setIsLoading', true)
    context.commit('setIsCartLoading', true)
    return axios.post('baskets/products', {
      productOfferId,
      colorId,
      quantity
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
        basketItemId: productId,
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
        basketItemId: productId
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
