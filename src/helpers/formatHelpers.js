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
