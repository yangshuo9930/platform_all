let $ = {
  ajax(options) {
    let { method = 'get', url, data, success } = options

    if (typeof data === 'object') {
      const temp = []
      for (let key in data) temp.push(`${key}=${data[key]}`)
      data = temp.join('&')
    }

    let xhr = new XMLHttpRequest() // 创建XHR对象

    if (method === 'get') {
      xhr.open('get', url + '?' + data) // 设置请求行
      data = null
    }

    if (method === 'post') {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded') // 设置请求头
      xhr.open('post', url)
    }

    xhr.send(data) // 设置请求体

    xhr.onload = function () {
      // xhr获取结果后执行回调
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText))
      }
    }
  }
}
