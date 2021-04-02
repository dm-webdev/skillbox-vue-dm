export function numberFormat (num) {
  if (Number.isFinite(num)) {
    return new Intl.NumberFormat().format(num)
  }
  return ''
}

export function capitalizeFirstLetter (str) {
  return `${str[0].toUpperCase()}${str.substr(1)}`
}
