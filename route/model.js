const db = require('../db/dbConfig.js');


function insert(user) {

    return  db('users').insert(user, 'id')
           .then(([id]) => id) 
    

};


function findBy(where) {
    return db('users').where(where);
};


function findByUserName(username) {
    return db('users').where(username);

};

function find() {
    return db('users').select('id', 'username', 'departments');
}

module.exports = {

    insert,
    findBy,
    findByUserName,
    find

};