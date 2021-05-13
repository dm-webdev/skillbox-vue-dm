export function numberFormat (num) {
  if (Number.isFinite(num)) {
    return new Intl.NumberFormat().format(num)
  }
  return ''
}

export function capitalizeFirstLetter (str) {
  if (!str) return null
  return `${str[0].toUpperCase()}${str.substr(1)}`
}

export function normalizeString (string) {
  if (typeof string === 'string') {
    return string.toLowerCase().replace(/ё/g, 'е')
  }
}

export function getColors (data) {
  if (data && data.mainProp.code !== 'color') {
    return data.colors.map(item => item.color)
  }
  if (data && data.mainProp.code === 'color') {
    const allProductColors = data.colors.map(item => item.color)
    const allAvailableColors = data.offers.map(item => normalizeString(item.propValues[0].value))
    return allProductColors.filter(item => allAvailableColors.includes(normalizeString(item.title)))
  }
  return null
}

export function getPropsList (list) {
  if (list && typeof list === 'object') {
    const propsList = []
    list.forEach(item => {
      if (propsList.find(prop => prop.title === item.productProp.title)) {
        const index = propsList.findIndex(prop => prop.title === item.productProp.title)
        propsList[index].values.push({ value: item.value })
      } else {
        propsList.push({ title: item.productProp.title, values: [{ value: item.value }] })
      }
    })
    return propsList
  }
}
