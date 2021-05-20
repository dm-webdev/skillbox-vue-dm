import axios from '@/helpers/axiosConfig'

export default {
  postOrder (context, orderData) {
    context.commit('setIsLoading', true)
    return axios.post('orders', {
      ...orderData
    }, {
      params: {
        userAccessKey: context.state.currentUser.accessKey
      }
    })
      .then(response => {
        context.commit('setOrderInfo', response.data)
        context.commit('setMessage', {
          modalContent: 'Ваша корзина успешно отправлена',
          modalType: 'success',
          currentId: null,
          showCloseBtn: false
        })
      })
      .finally(() => context.commit('setIsLoading', false))
  },

  getDeliveryOptions (context) {
    context.commit('setIsLoading', true)
    return axios.get('deliveries')
      .catch(() => context.commit('setMessage', {
        modalContent: 'Что-то пошло не так, повторите запрос позднее',
        modalType: 'error'
      }))
      .finally(() => context.commit('setIsLoading', false))
  },

  getPaymentsOptions (context, id) {
    context.commit('setIsLoading', true)
    return axios.get('payments', {
      params: {
        deliveryTypeId: id
      }
    })
      .catch(() => context.commit('setMessage', {
        modalContent: 'Что-то пошло не так, повторите запрос позднее',
        modalType: 'error'
      }))
      .finally(() => context.commit('setIsLoading', false))
  },

  getCurrentOrderInfo (context, orderId) {
    context.commit('setIsLoading', true)
    return axios.get(`orders/${orderId}`, {
      params: {
        userAccessKey: context.state.currentUser.accessKey
      }
    })
      .then(response => {
        context.commit('setOrderInfo', response.data)
      })
      .catch(() => context.commit('setMessage', {
        modalContent: 'Что-то пошло не так, повторите запрос позднее',
        modalType: 'error'
      }))
      .finally(() => {
        context.commit('setIsLoading', false)
      })
  }
}
