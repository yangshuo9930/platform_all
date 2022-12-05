const v = '2022-05-15T09:10:23 SHVDJVD/asdasd'

function json(params) {
  const res = params.split(' ')[0].replace(/-|:/g, ',').split(',')
  console.log(res)
}

json(v)

let config = {
  alert: setInterval(function () {
    console.log(111)
  }, 1000)
}

config = null

let a = setInterval(function () {
  console.log(222)
}, 1000)
