const path = require('path')
const db = require(path.join(__dirname,'../utils/db'))

exports.findUsername = async (data)=> {
    return await db.findOne('users',data)
}
exports.insertUser = async (data)=> {
    return await db.insertOne('users',data)
}