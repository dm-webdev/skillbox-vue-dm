export default {
  modalOpen (context, data) {
    context.commit('setMessage', data)
  },

  cleanMessage (context) {
    context.commit('cleanMessage')
  },

  showLoader (context) {
    context.commit('setIsLoading', true)
  },

  hideLoader (context) {
    context.commit('setIsLoading', false)
  }
}
