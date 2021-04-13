import successImg from '@/assets/img/checked.svg'
import errorImg from '@/assets/img/error.svg'
import defaultImg from '@/assets/img/egg.svg'
import deleteImg from '@/assets/img/trash.svg'

export function getCurrentImg (modalType) {
  if (modalType === 'success') {
    return successImg
  }
  if (modalType === 'error') {
    return errorImg
  }
  if (modalType === 'delete') {
    return deleteImg
  }
  return defaultImg
}

export function getIsSuccess (modalType) {
  if (modalType === 'success') {
    return true
  }
  return false
}

export function getIsDelete (modalType) {
  if (modalType === 'delete') {
    return true
  }
  return false
}

export function getToPath (modalType, route) {
  if (modalType === 'success' || modalType === 'delete') {
    return { path: route.path }
  }
  return { name: 'catalog' }
}

export function closeModalWithTimeOut (isClose, f) {
  if (isClose) {
    setTimeout(f, 3000)
  }
}
