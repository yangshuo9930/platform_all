const local = {
  token: 'H5-APP-TOKEN',
  channels: 'H5-APP-CHANNELS'
}

type Local = typeof local
type LocalItem = keyof Local

export const setLocalItem = (name: LocalItem, item: any) => {
  localStorage.setItem(local[name], JSON.stringify(item))
}

export const removeLocalItem = (name: LocalItem) => {
  localStorage.removeItem(local[name])
}

export function getLocalItem(name: 'token', initValue?: string): Token
export function getLocalItem(name: 'channels', initValue?: string): Channel[]

export function getLocalItem(name: LocalItem, initValue = '') {
  return JSON.parse(localStorage.getItem(local[name]) || initValue)
}

export const sleep = (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms))
