export function getIsColor (item) {
  return item.productOffer.product.mainProp.code === 'color'
}

export function getOrderPropTitle (item) {
  return item.productOffer.product.mainProp.title
}

export function getOrderPropValue (item) {
  if (item.productOffer.product.mainProp.code === 'color') {
    return [item.color.color.title, item.color.color.code]
  }
  return item.productOffer.propValues[0].value
}

export function getOrderMainImg (item) {
  return item.productOffer.product.preview.file.url
}
