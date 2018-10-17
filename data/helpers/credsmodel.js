const db = require('../dbconfig');

// find() -> [{id: int, username: 'string'}, ..., {id: int, username: 'string'}]
// find(userId) -> {id: int, username: 'string'}
const find = (id) => {
    if(id) {
        return db('employees')
            .select('id', 'username')
            .where({id})
            .first();
    } else {
        return db('employees')
            .select('id', 'username');
    }
};

// addNewUser({username: 'string', password: 'hashed string'}) -> [id: int]
const addNewUser = (userObj) => {
    return db('employees')
        .insert(userObj)
        .into('employees');
};

// authUser({username: 'string'}) -> {id: int, username: 'string', password: 'hashed string'}
const authUser = (userObj) => {
    return db('employees')
		.where({username: userObj.username})
		.first();
};

module.exports = {
    find, 
    addNewUser,
    authUser
};
