function rabbitVar(n) {
  if (n === 1) return 1
  if (n === 2) return 2

  n1 = 2
  n2 = 1
  nn = 0

  for (let i = 3; i <= n; i++) {
    nn = n1 + n2
    n2 = n1
    n1 = nn
  }

  return nn
}

function rabbitArr(n) {
  let a = []
  ;(a[0] = 1), (a[1] = 1)
  for (let i = 2; i <= n; i++) {
    a[i] = a[i - 1] + a[i - 2]
  }
  return a[a.length - 1]
}

function rabbitFn(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  return rabbitFn(n - 1) + rabbitFn(n - 2)
}

document.querySelector('.rabbit').addEventListener('click', () => {
  console.log(rabbitVar(10))
  console.log(rabbitArr(10))
  console.log(rabbitFn(10))
})
