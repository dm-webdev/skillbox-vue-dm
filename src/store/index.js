import { createStore } from 'vuex'
import products from '@/data/products'
import colors from '@/data/colorsBase'
import { numberFormat, capitalizeFirstLetter } from '@/helpers/formatHelpers'

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
  },
  getters: {
    cartDetailProducts (state) {
      return state.cartProducts.map(item => {
        const product = products.find(p => p.id === item.productId)
        const color = colors.find(c => c.id === item.colorId)
        return {
          ...item,
          product,
          color,
          colorName: capitalizeFirstLetter(color.name),
          totalProductPrice: numberFormat(product.price * item.amount)
        }
      })
    },
    productInCartCount (state, getters) {
      return getters.cartDetailProducts.reduce((sum, item) => sum + item.amount, 0)
    },
    cartTotalPrice (state, getters) {
      return getters.cartDetailProducts.reduce((sum, item) => sum + (item.product.price * item.amount), 0)
    }
  }
})
