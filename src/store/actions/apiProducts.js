import axios from '@/helpers/axiosConfig'

export default {
  getProducts (context, params) {
    context.commit('setIsLoading', true)
    return axios.get('products/', { params })
      .then(response => {
        context.commit('setProducts', response.data)
      })
      .catch(() => context.commit('setMessage', {
        modalContent: 'Что-то пошло не так, повторите запрос позднее',
        modalType: 'error'
      }))
      .finally(() => context.commit('setIsLoading', false))
  },

  getCurrentProduct (context, slug) {
    context.commit('setIsLoading', true)
    return axios.get(`products/${slug}`)
      .then(response => {
        context.commit('setCurrentProduct', response.data)
      })
      .catch((err) => {
        context.commit('setMessage', {
          modalContent: `${err.response.data.error.message}`,
          modalType: 'error'
        })
      })
      .finally(() => context.commit('setIsLoading', false))
  },

  cleanCurrentProduct (context, slug) {
    context.commit('setCurrentProduct', { id: -1 })
  },

  getCategories (context) {
    context.commit('setIsLoading', true)
    axios.get('productCategories/')
      .then(response => {
        context.commit('setCategories', response.data)
      })
      .catch(() => context.commit('setMessage', {
        modalContent: 'Что-то пошло не так, повторите запрос позднее',
        modalType: 'error'
      }))
      .finally(() => context.commit('setIsLoading', false))
  }
}
