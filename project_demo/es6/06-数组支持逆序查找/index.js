// findLast, findLastIndex

const letters = [
  { value: 'v' },
  { value: 'w' },
  { value: 'x' },
  { value: 'y' },
  { value: 'z' },
]

// 后序查找一下子快了，有木有
const found = letters.findLast((item) => item.value === 'y')
const foundIndex = letters.findLastIndex((item) => item.value === 'y')

console.log(found) // { value: 'y' }
console.log(foundIndex) // 3
