export default {
  setProducts (state, products) {
    state.catalog.products = products
  },

  setCurrentProduct (state, product) {
    state.catalog.currentProduct = product
  },

  setCategories (state, categories) {
    state.catalog.categories = categories
  },

  setMessage (state, {
    modalContent,
    modalType,
    currentId = null,
    showCloseBtn = true
  }) {
    state.apiConnection.modalContent = modalContent
    state.apiConnection.modalType = modalType
    state.apiConnection.currentId = currentId
    state.apiConnection.showCloseBtn = showCloseBtn
  },

  cleanMessage (state) {
    state.apiConnection.modalContent = null
    state.apiConnection.modalType = null
    state.apiConnection.currentId = null
    state.apiConnection.showCloseBtn = true
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
  },

  setOrderInfo (state, orderInfo) {
    state.currentUser.currentOrderInfo = orderInfo
  }
}
