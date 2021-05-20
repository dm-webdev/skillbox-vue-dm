import apiProducts from './apiProducts'
import apiCart from './apiCart'
import apiOrder from './apiOrder'
import appActions from './appActions'

export default {
  ...apiProducts,
  ...apiCart,
  ...apiOrder,
  ...appActions
}
