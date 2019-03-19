
// account路由

const express = require('express')
const path = require('path')
const router = express.Router()
const accountCtrl = require(path.join(__dirname,'../controller/account'))
// 路由
router.get('/login',accountCtrl.login) //登录页
      .post('/signin',accountCtrl.signin) //登录接口
      .get('/verify',accountCtrl.verify) //登录验证
      .get('/register_verify',accountCtrl.register_verify) //登录验证
      .post('/logout',accountCtrl.logout) //退出登录
      .get('/register',accountCtrl.register) //注册页面
      .post('/register',accountCtrl.registerApi) //注册接口

module.exports = router