const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)
const table = "userInfo"

module.exports = {
    get,
    addUser,
    getAllUsernames,
    getUserByUsername,

}

function get(){
    return db(table)
}

function addUser(user){
    const {username, password} = user
   return db(table).insert({username, password, department: 'default'})
     
}

function getAllUsernames(){
    return db(table).select('username')
} 

function getUserByUsername(username){
    return db(table).where({username}).first()
}