// index路由

const express = require('express')
const path = require('path')
const router = express.Router()
const indexCtrl = require(path.join(__dirname,'../controller/index'))
// 路由
router.get('/',indexCtrl.index) //主页
      .get('/index/index',indexCtrl.index)


module.exports = router