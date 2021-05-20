export default {
  getCatalog (state) {
    return state.catalog.products?.items
  },

  getCurrentProduct (state) {
    return state.catalog.currentProduct
  },

  getCategories (state) {
    return state.catalog.categories
  },

  getPagination (state) {
    return state.catalog.products?.pagination.total || 0
  },

  cartDetailProducts (state) {
    return state.currentUser.cartProducts.map(item => {
      return {
        ...item,
        isColor: getIsColor(item),
        propTitle: getOrderPropTitle(item),
        propValue: getOrderPropValue(item),
        img: getOrderMainImg(item),
        totalProductPrice: item.price * item.quantity
      }
    })
  },

  productInCartCount (state, getters) {
    return getters.cartDetailProducts.reduce((sum, item) => sum + item.quantity, 0)
  },

  cartTotalPrice (state, getters) {
    return getters.cartDetailProducts.reduce((sum, item) => sum + item.totalProductPrice, 0)
  },

  getCurrentOrderInfo (state) {
    return state.currentUser.currentOrderInfo
  },

  getTotalCountOfOrder (state) {
    return state.currentUser.currentOrderInfo?.basket.items.reduce((sum, item) => sum + item.quantity, 0)
  },

  getModalData (state) {
    return state.apiConnection
  },

  getIdToDel (state) {
    return state.apiConnection.currentId
  }
}

function getIsColor (item) {
  return item.productOffer.product.mainProp.code === 'color'
}

function getOrderPropTitle (item) {
  return item.productOffer.product.mainProp.title
}

function getOrderPropValue (item) {
  if (item.productOffer.product.mainProp.code === 'color') {
    return [item.color.color.title, item.color.color.code]
  }
  return item.productOffer.propValues[0].value
}

function getOrderMainImg (item) {
  return item.productOffer.product.preview.file.url
}
