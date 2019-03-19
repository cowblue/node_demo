const path = require('path')
const { config } = require(path.join(__dirname,'../config/database'))
const knex = require('knex')({
    client: 'mysql',
    connection: config
});
// 查询所有
exports.findAll = (table) => {
    return knex.select().table(table)
}
// 查询单个
exports.findOne = (table,data) => {
    return knex(table).select().where(data)
}
// 插入一条数据
exports.insertOne = (table,data)=> {
    return knex(table).insert(data)
}