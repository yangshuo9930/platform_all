function getMaxCount(arr) {
  const obj = {}
  let max = 0,
    key
  arr.forEach((item) => {
    if (item in obj) {
      let temp = obj[item]++
      if (temp + 1 > max) {
        max = temp + 1
        key = item
      }
    } else {
      obj[item] = 1
    }
  })

  return {
    obj,
    max,
    key
  }
}
document.querySelector('.getMaxCount').addEventListener('click', () => {
  let aaa = ['a', 'a', 'b', 'c', 'a', 'b']
  console.log(getMaxCount(aaa))
})
