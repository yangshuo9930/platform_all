// 我们都知道在JS中，await操作符的作用就是当我们碰到一个promise的时候，我们可以使用await来暂停当前代码的执行，
// 等到这个promise被settled(fulfilled或者rejected)了，我们才继续当前代码的执行。
// 可是之前使用await的时候有个很头疼的地方就是一定要在一个async的函数里面使用而不能在全局作用域里面使用

// es13 解决了这个问题

function setTimeoutAsync(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

// 慢慢地等时间流逝吧
await setTimeoutAsync(3000)
console.log('我等待了3S, 开始执行了') // 如果报错 SyntaxError: await is only valid in async function, 请注意你的Node环境是否支持最新的ES13
// 可以使用最新的浏览器运行这段代码
