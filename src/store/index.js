import { createStore } from 'vuex'
import products from '@/data/products'
import colors from '@/data/colorsBase'
import { numberFormat, capitalizeFirstLetter } from '@/helpers/formatHelpers'

export const store = createStore({
  state () {
    return {
      cartProducts: [
        // { productId: 1, amount: 2, colorId: 143 }
      ],
      apiConnection: {
        isLoading: false,
        modalContent: null,
        modalType: null
      }
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
    },
    updateCartProductAmount (state, { productId, amount, colorId }) {
      const item = state.cartProducts.find(item => item.productId === productId && item.colorId === colorId)
      if (item) {
        item.amount = amount
      }
    },
    deleteCartProduct (state, { productId, colorId }) {
      state.cartProducts = state.cartProducts.filter(item => !(item.productId === productId && item.colorId === colorId))
    },
    setMessage (state, { modalContent, modalType }) {
      state.apiConnection.modalContent = modalContent
      state.apiConnection.modalType = modalType
    },
    setIsLoading (state, isLoading) {
      state.apiConnection.isLoading = isLoading
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
          colorName: capitalizeFirstLetter(color.title),
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
