// 1. Set
let uuu = [1, 1, 2, , , 2, , 3, 3, 3, , 4, , , 1, 1, 2, 66]

// 2. includes/indexof
function unique(arr) {
  const newArr = []
  arr.forEach((item) => {
    if (!newArr.includes(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

// 3. for
function fo(arr) {
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) j = ++i
    }
    newArr.push(arr[i])
  }
  return newArr
}

document.querySelector('.unique').addEventListener('click', () => {
  console.log([...new Set(uuu)])
  console.log(unique(uuu))
})
