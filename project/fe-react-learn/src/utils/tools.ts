let local = {
  token: 'APP-TOKEN',
}

type Local = typeof local
type LocalItem = keyof Local

/** 设置本地存储 */
export const setLocalItem = (name: LocalItem, item: any) => {
  localStorage.setItem(local[name], JSON.stringify(item))
}

/** 移除本地存储 */
export const removeLocalItem = (name: LocalItem) => {
  localStorage.removeItem(local[name])
}

// export function getLocalItem(name: 'token', initValue?: string): Token
// export function getLocalItem(name: 'channels', initValue?: string): Channel[]

/** 获取本地存储, 默认为 '' */
export function getLocalItem (name: LocalItem, initValue = '""') {
  return JSON.parse(localStorage.getItem(local[name]) || initValue)
}

/** 阻断函数 */
export const sleep = (ms: number = 3000) => new Promise((resolve) => setTimeout(resolve, ms))
