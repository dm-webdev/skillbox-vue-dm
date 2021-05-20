export default {
  modalOpen (context, data) {
    context.commit('setMessage', data)
  },

  cleanMessage (context) {
    context.commit('cleanMessage')
  },

  showLoader (context) {
    context.commit('isLoading', true)
  },

  hideLoader (context) {
    context.commit('isLoading', true)
  }
}
