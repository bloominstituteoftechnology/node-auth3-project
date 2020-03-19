const bcrypt = require('bcryptjs')
const db = require('../data/config')

async function add(user) {
   user.password = await bcrypt.hash(user.password, 14) //encrypts password and gives it a time
   const [id] = await db('users').insert(user) //gives id and adds user to database
   return findById(id) //looks for the id 
}

function find(){
   return db('users').select('id', 'username')//finds all the users
}

function findBy(filter){
   return db('users')
   .select('id','username', 'password') //selects username and password, id
   .where(filter)
}

function findById(id) {
   return db('users')
   .select('id', 'username')
   .where({id})
   .first()
}

module.exports ={
   add,
   find,
   findById,
   findBy
   }

