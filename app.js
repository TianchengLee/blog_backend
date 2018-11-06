const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const app = express()

// 托管静态资源
app.use('/node_modules', express.static('./node_modules'))

// 注册body-parser中间件  注册以后才可以在req中使用body对象获取客户端post提交过来的数据
app.use(bodyParser.urlencoded({ extended: false }))

// 自动注册 ./router 下的路由模块
// 读取router目录下所有的文件名
fs.readdir('./router', (err, result) => {
  if (err) return console.log('读取文件失败!')
  // 循环获取所有的文件名
  result.forEach(item => {
    // 依次导入对应的路由模块
    const router = require(path.join(__dirname, './router/', item))
    // 注册路由
    app.use(router)
  })
})

app.listen(80, () => {
  console.log('http://127.0.0.1');
})
