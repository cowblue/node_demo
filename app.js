/**
 * 引包
 */
const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
/**
 * 使用中间件
 */
// 公开静态资源路径
app.use('/public',express.static(path.join(__dirname,'./public')))

// 使用bodyparse
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 使用session
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


// 使用nunjuck模板引擎
nunjucks.configure('view', {
    autoescape: true,
    express: app,
    // 不缓存
    watch:true
});

// 权限限制
app.all('*',(req,res,next)=> {
    if(req.path.includes('account')) {
        next()
    }else {
        if(req.session.user) {
            next()
        }else {
            return res.redirect('/account/login')
        }
    }
})

// 引入路由
const accountRouter = require(path.join(__dirname,'./router/account'))
const indexRouter = require(path.join(__dirname,'./router/index'))
// 使用路由中间件
app.use('/account',accountRouter)
app.use(indexRouter)

// 开启服务
app.listen('3000',err=> {
    err && console.log(err)
    console.log('服务开启成功')
    console.log('http://localhost:3000')
})