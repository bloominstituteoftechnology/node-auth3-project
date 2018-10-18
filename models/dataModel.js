const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    register,
    login,
    getUsers
};

function register(user){
    return db('users').insert(user);
};

function login(username){
    return db('users').where({username}).first();
};

function getUsers(){
    return db('users').select('id','username','department');
}