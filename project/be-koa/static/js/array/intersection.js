function intersectionArr(arr1, arr2) {
  a = new Set(arr1)
  b = new Set(arr2)
  return [...a].filter((item) => [...b].includes(item))
}

function intersection(arr1, arr2) {
  let a1 = new Set(arr1)
  let a2 = new Set(arr2)
  return [...a1].filter((item) => a2.has(item))
}

let arr1 = [1, 2]
let arr2 = [3, 4, 5, 6, 7, 2, 2, 2, 2]

document.querySelector('.intersection').addEventListener('click', () => {
  console.log('arr1-arr2', arr1, arr2)
  console.log('es7 filter-includes', intersectionArr(arr2, arr1))
  console.log('es6 filter-set', intersection(arr1, arr2))
})
