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
    const {username, password, department} = user
   return db(table).insert({username, password, department})
     
}

function getAllUsernames(){
    return db(table).select('username', 'id', 'department')
} 

function getUserByUsername(username){
    return db(table).where({username}).first()
}