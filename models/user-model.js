const db = require('../data/dbconfig.js')

module.exports = {
    get,
    filtering,
    findById,
    insert
}

function findById(id){
    return db('users').where({ id }).first()
}

function get(){
    return db('users')
}

function filtering(usingThis) {
    return db('users').where(usingThis).first()
}

async function insert(user) {
    const [id] = await db('users').insert(user);
  
    return findById(id);
}