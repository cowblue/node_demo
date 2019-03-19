// index 控制器
// 导入svg验证码
const svgCaptcha = require('svg-captcha');
const path = require('path')
const accountSevice = require(path.join(__dirname,'../service/account'))
const tools = require(path.join(__dirname,'../utils/tools'))


// 登录页面
exports.login = async (req,res) => {
    res.render('login.html')
}
// 注册页面
exports.register = async (req,res) => {
    res.render('register.html')
}
// 登录方法
exports.signin = async (req,res) => {
    const {username,password,verify_code} = req.body
    let result = {
        code:0,
        msg:"登录成功",
        data:[]
    }
    // 验证验证码是否正确
    if(verify_code.toLowerCase() !== req.session.captcha.toLowerCase()) {
        result.code = 1
        result.msg = "验证码错误"
        return res.status(200).json(result)
    }
    // 数据库查询
    const user = await accountSevice.findUsername({
        username,
        password
    })
    // 验证账号是否存在
    if(user.length) {
        result.data = user
        req.session.user = user[0]
        return res.status(200).json(result)
    }else {
        result.code = 2
        result.msg = "账号或密码错误"
        return res.status(200).json(result)
    }
    
}
// 退出登录
exports.logout = (req,res) => {
    let result = {
        code:0,
        msg:"退出成功",
        data:[]
    }
    req.session.user = null
    res.status(200).json(result)
}
// 获取验证码
exports.verify = async (req,res) => {
    svgCaptcha.options.height = 40
    const captcha = svgCaptcha.create()
    req.session.captcha = captcha.text;
    res.type('svg')
    res.status(200).send(captcha.data)
}
// 获取注册验证码
exports.register_verify = async (req,res) => {
    svgCaptcha.options.height = 40
    const captcha = svgCaptcha.create()
    req.session.register_captcha = captcha.text;
    res.type('svg')
    res.status(200).send(captcha.data)
}
// 注册接口
exports.registerApi = async (req,res) => {
    console.log(req.body)
    let result = {
        code :1,
        msg:"",
        data:[]
    }
    let { username,password,phone,verify_code} = req.body
    username = tools.trim(username)
    password = tools.trim(password)
    phone = tools.trim(phone)
    const usernameForDatabase = await accountSevice.findUsername({username})
    // 验证表单
    if(!username) {
        result.msg = "用户名不能为空"
        return res.status(200).json(result)
    }
    if(!password) {
        result.msg = "密码不能为空"
        return res.status(200).json(result)
    }
    if(!phone) {
        result.msg = "电话号码不能为空"
        return res.status(200).json(result)
    }
    if(usernameForDatabase.length) {
        result.msg = "用户名已存在"
        return res.status(200).json(result)
    }

    // 验证验证码是否正确
    if(verify_code.toLowerCase() !== req.session.register_captcha.toLowerCase()) {
        result.code = 2
        result.msg = "验证码错误"
        return res.status(200).json(result)
    }
    // 成功
    const userid = await accountSevice.insertUser({
        username,
        password,
        phone,
        create_time:(new Date() - 0)
    })
    // 数据库查询
    const user = await accountSevice.findUsername({id:userid})
    result.code =0
    result.msg="注册成功"
    result.data=user[0]
    res.status(200).json(result)
}