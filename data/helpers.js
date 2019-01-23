//grab knex configuration
const db = require('./dbConfig');

//**HELPER FUNCTIONS */
module.exports = {

    //insert user
    addUser: function(newUser){
        return db('users')
            .insert(newUser)

    },

    getUserByUsername: function(username){
        return db('users')
            .where('users.username', username)
            .first();
    },

    getUsers: function(){
        return db('users')
    }
}