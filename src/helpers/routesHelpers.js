import eventBus from '@/eventBus'

export function gotoPage (pageName, pageParams) {
  eventBus.emit('gotoPage', pageName, pageParams)
  console.log(pageName, pageParams)
}
