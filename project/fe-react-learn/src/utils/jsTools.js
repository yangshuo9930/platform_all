/** 防抖函数 */
export function debounce (fn, delay = 300) {
  return function (args) {
    const that = this
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.call(that, args)
    }, delay)
  }
}

/** 节流函数 */
export function throttle (fn, delay = 30) {
  let last, timer
  return function (args) {
    const that = this
    const now = Date.now()
    if (last && now < last + delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.call(that, args)
      }, delay)
    } else {
      last = now
      fn.call(that, args)
    }
  }
}