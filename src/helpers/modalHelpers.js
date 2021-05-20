import successImg from '@/assets/img/checked.svg'
import errorImg from '@/assets/img/error.svg'
import defaultImg from '@/assets/img/egg.svg'
import deleteImg from '@/assets/img/trash.svg'

export function getCurrentImg (modalType) {
  switch (modalType) {
    case 'success':
      return successImg
    case 'error':
      return errorImg
    case 'delete':
      return deleteImg
    default:
      return defaultImg
  }
}

export function getIsSuccess (modalType) {
  return modalType === 'success'
}

export function getIsDelete (modalType) {
  return modalType === 'delete'
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
