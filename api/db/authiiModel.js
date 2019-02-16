const knex=require('knex');
const dbConfig=require('../knexfile.js');
const db= knex(dbConfig.development);

module.exports={
registerUser:(function(user){
    return db('users').insert(user).then(id=>id).catch(err=>err)
    }),
getUser:(function(user){
    return db('users').where({userName:user}).first().then(user=>user).catch(err=>err)
        }),

getUsers:(function(){
        return db.select('*').from('users').then(users=>users).catch(err=>err)
        }),
}

