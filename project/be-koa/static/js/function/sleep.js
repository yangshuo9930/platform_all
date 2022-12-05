// 1. setTimeout

// 2. promise

const sleep = (delay = 3000) => new Promise((resolve) => setTimeout(resolve, delay))

document.querySelector('.sleep').addEventListener('click', () => {
  sleep().then(() => {
    console.log('成功')
  })
})
