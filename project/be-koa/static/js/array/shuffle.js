function shuffle(arr) {
  let len = arr.length
  while (len) {
    const idx = parseInt(Math.random() * len)
    ;[arr[len - 1], arr[idx]] = [arr[idx], arr[len - 1]]
    len--
  }

  return arr
}

document.querySelector('.shuffle').addEventListener('click', () => {
  console.log(shuffle(arr))
  console.log(_.shuffle([...arr]))
})
