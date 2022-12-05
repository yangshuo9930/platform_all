// 1. ES5 Array.isArray

// 2. instanceof => 监测变量是否是构造函数的实例, 或者说检测构造函数的prototype属性是否出现在对象的原型链上
//    ===> 变种, 可以监测变量的construct属性是否等于构造函数(利用原型链)

// 3.盗用对象原型的toString方法

document.querySelector('.isArray').addEventListener('click', () => {
  let arr = [1, 2, 3]
  console.log('Array.isArray', Array.isArray(arr))
  console.log('instanceof', arr instanceof Array)
  console.log(Object.prototype.toString.call(arr) === '[object Array]')
  console.log('push,pop,shift,unshift,reverse,splice,sort')
})
