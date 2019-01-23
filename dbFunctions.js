const knex = require("knex");
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const dbFuncs = {
    getUsers:  () => {
        return db('users')
    },
    getUser:  (creds) => {
        return db("users")
        .where({username: creds.username})
        .first()
    },
    addUser: (userInfo) => {
        return db('users').insert(userInfo)
    }
}

module.exports = dbFuncs;
