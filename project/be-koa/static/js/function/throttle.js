// 防抖: 触发高频事件后n秒后在执行回调函数, 如果n秒内再次触发事件, 则重新计算时间
function debounce(fn, delay) {
  return function (args) {
    let that = this
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.apply(that, args)
    }, delay)
  }
}

// 节流: 触发事件后立即执行一次回调函数, 但是在设置的一个时间单位内, 即使多次触发事件, 也只执行一次回调函数
function throttle(fn, delay = 300) {
  let last, timer
  return function (args) {
    let that = this
    let now = Date.now()

    if (last && now < last + delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(that, args)
      }, delay)
    } else {
      last = now
      fn.apply(that, args)
    }
  }
}

const throttleFn = throttle(() => {
  console.log(1)
}, 1000)
document.querySelector('.throttle').addEventListener('click', throttleFn)

const debounceFn = debounce(() => {
  console.log(2)
}, 1000)

document.querySelector('.debounce').addEventListener('click', debounceFn)
