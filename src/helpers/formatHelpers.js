export function numberFormat (num) {
  return new Intl.NumberFormat().format(num)
}

export function capitalizeFirstLetter (str) {
  return `${str[0].toUpperCase()}${str.substr(1)}`
}
