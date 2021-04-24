export function validateEmail (value, maxLength) {
  if (!value) {
    return 'Это поле обязательно'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.trim())) {
    return 'Введите действующий E-mail.'
  }
  if (value.trim().length > maxLength) {
    return 'Введите корректный E-mail.'
  }
  return null
}

export function validateRequaredString (value, minLength, maxLength) {
  if (!value) {
    return 'Это поле обязательно'
  }
  const trimLen = value.trim().length
  if (trimLen > maxLength || trimLen < minLength) {
    return `Заполните поле строкой от ${minLength} до ${maxLength} символов.`
  }
  return null
}

export function validateString (value, minLength, maxLength) {
  if (!value) {
    return null
  }
  const trimLen = value.trim().length
  if (trimLen > maxLength || trimLen < minLength) {
    return `Заполните поле строкой от ${minLength} до ${maxLength} символов.`
  }
  return null
}

export function validatePhone (value) {
  if (!value) {
    return 'Это поле обязательно'
  }
  const phone = value.replace(/[^\d]/g, '')
  if (phone.length !== 11) {
    return 'Введите корректный номер телефона'
  }
  return null
}
