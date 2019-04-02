const db = require('../../data/dbConfig');

const findByID = id => {
    return db('users')
             .where({ id })
             .first();
}

module.exports = {
    find: () => {
        return db('users');
    },

    add: user => {
        return db('users')
                 .insert(user)
                 .then(id =>{
                     return findByID(id);
                 })
                 .catch(err => {
                     return err;
                 });
    }
}