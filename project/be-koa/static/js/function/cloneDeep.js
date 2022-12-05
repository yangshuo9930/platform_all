// 浅拷贝: 拷贝对象的一层属性, 如果对象中还有对象, 则拷贝的是其地址, 两者修改会有影响.
// 1. 扩展运算 {...obj}
// 2. for in 遍历对象
function clone(obj) {
  const newObj = {}
  for (let key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}

// 深拷贝: 拷贝对象的多层属性, 如果对象中还有对象, 则继续拷贝
// 1. JSON
// 2. Object.assign()
// 3. $.extend()
// 4. lodash._cloneDeep()
// 5. 递归函数
function cloneDeep(obj) {
  let newObj = null
  if (typeof obj === 'object' && obj !== null) {
    newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
      newObj[key] === cloneDeep(obj[key])
    }
  } else {
    newObj = obj
  }
  return newObj
}

const apples = { name: 'Apples' }
const bananas = { name: 'Bananas' }
const oranges = { name: 'Oranges' }

// 创建新的 Map
const fruits = new Map()
// 往Set中添加使用add方法
fruits.set(bananas, 300)
fruits.set(oranges, 200)
fruits.set(0, 100)

console.log(fruits)

const m = new Map([
  [apples, 500],
  [bananas, 300],
  [0, 200]
])
console.log(m)
