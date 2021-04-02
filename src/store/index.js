import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      cartProducts: [
        // { productId: 1, amount: 2, colorId: 143 }
      ]
    }
  },
  mutations: {
    addProductToCart (state, { productId, amount, colorId }) {
      const item = state.cartProducts.find(item => item.productId === productId && item.colorId === colorId)
      if (item) {
        item.amount += amount
      } else {
        state.cartProducts.push({ productId, amount, colorId })
      }
    }
  }
})
