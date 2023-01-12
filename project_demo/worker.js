const cluster = require('cluster')

const http = require('http')

const numCPUs = require('os').cpus().length

// 如果是主进程
if (cluster.isMaster) {
  // 根据 CPU 核心数量来创建 worker 进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died')
  })
}
// 如果是子进程, 同时监听一个端口
else {
  console.log('CPU 核心数量')
  http
    .createServer(function (req, res) {
      res.writeHead(200)
      res.end('hello world')
    })
    .listen(3000)
}
