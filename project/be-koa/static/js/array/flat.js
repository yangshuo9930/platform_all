let fff = [1, , 3, [, 2, 3], 4, , 5, , [, 7, 6, 4, [3, 3, 3, [1]]]]

// 1.使用ES6数组的flat方法, 参数可设置降维层数, 设置 Infinity 可让数组将至1层
// Array.prototype.flat(Infinity)

// 2. while循环判断数组项为数组类型时, 重新赋值数组为[].concat(...arr)
function flatFn(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 3. 递归函数
function flatF(arr, newArr = []) {
  arr.forEach((item) => {
    Array.isArray(item) ? flatF(item, newArr) : newArr.push(item)
  })

  return newArr
}

function flatFn1(arr) {
  const newArr = []
  arr.forEach((item) => {
    Array.isArray(item) ? newArr.push(...flatFn1(item)) : newArr.push(item)
  })

  return newArr
}

const ffff = []
for (let i = 0; i < 100000; i++) {
  ffff.push(fff)
}
const aaaa = _.cloneDeep(ffff)
const bbbb = _.cloneDeep(ffff)

document.querySelector('.flat').addEventListener('click', () => {
  console.log(fff.flat(Infinity)) // 自动删除 empty
  console.log(flatFn([...fff]))

  console.log(flatF(bbbb))

  console.log(flatFn1(aaaa))
})
