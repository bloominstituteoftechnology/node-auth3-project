const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  
insert: (user) =>{
    return db('users').insert(user);
},

findByUsername: (username) =>{
    return db('users').where({username}).first();
},

findById: (id) =>{
    return db('users').where({id}).first();
},

findUsers: ()=>{
    return db('users').select('username','department')
}


}
