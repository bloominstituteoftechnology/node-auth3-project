const db = require('../../data/dbConfig');

module.exports = {
    find : () => {
        return db('users');
    }
}