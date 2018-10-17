const db = require('../dbconfig');

// find() -> [{id: int, username: 'string', department: 'string'}, ..., {id: int, username: 'string', department: 'string'}]
// find(userId) -> {id: int, username: 'string', department: 'string'}
const find = (id) => {
    if(id) {
        return db('employees')
            .select('id', 'username', 'department')
            .where({id})
            .first();
    } else {
        return db('employees')
            .select('id', 'username', 'department');
    }
};

// addNewUser({username: 'string', password: 'hashed string', department: 'string'}) -> [id: int]
const addNewUser = (userObj) => {
    return db('employees')
        .insert(userObj)
        .into('employees');
};

// authUser({username: 'string', password: 'string'}) -> {id: int, username: 'string', password: 'hashed string', department: 'string'}
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
