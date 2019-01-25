/* User Table Database Access Helper 
Must be able to:
    Add new user, as username, password, and department (default)
    Authenticate an existing user by supplied username & password
    Return all users (DON'T RETURN PASSWORDS)
*/

// Dependencies 
const bcrypt = require('bcryptjs');
const config = require('./config.js');
const knexDB = require('./database.js');

// Configure and Export Helper 
module.exports = {
    addUser     ,
    authenticate,
    getUsers    ,
};


// Database Utilities 

// Transform Username to Canonical form 
function prepUsername(raw) {
    return raw.toLowerCase();
}

// Hash Password 
function prepPassword(raw) {
    return bcrypt.hashSync(raw, config.PASSWORD_HASH_DEPTH);
}

// Compare Password to Hash 
function comparePassword(raw, storedHash) {
    return bcrypt.compareSync(raw, storedHash);
}


// Database Access Functions 

// Add User 
async function addUser(rawUsername, rawPassword) {
    let username = prepUsername(rawUsername);
    let password = prepPassword(rawPassword);
    // Check for previous users
    const priorUser = await knexDB(config.TABLE_USERS)
        .select(config.FIELD_ID)
        .where({
            [config.FIELD_USERNAME]: username,
        })
        .first();
    if(priorUser){
        throw config.ERROR_AUTHENTICATION_NAMETAKEN;
    }
    // Insert new user
    const [userId] = await knexDB(config.TABLE_USERS).insert({
        [config.FIELD_USERNAME  ]: username                 ,
        [config.FIELD_PASSWORD  ]: password                 ,
        [config.FIELD_DEPARTMENT]: config.DEFAULT_DEPARTMENT,
    });
    const user = await knexDB(config.TABLE_USERS)
        .select(config.FIELD_ID, config.FIELD_USERNAME, config.FIELD_DEPARTMENT)
        .where({[config.FIELD_ID]: userId})
        .first();
    return user;
}

//Authenticate
async function authenticate(rawUsername, rawPassword) {
    const username = await prepUsername(rawUsername);
    const user = await knexDB(config.TABLE_USERS)
        .where({
            [config.FIELD_USERNAME]: username,
        })
        .first();
    const storedHash = user[config.FIELD_PASSWORD];
    if(!comparePassword(rawPassword, storedHash)){
        return null;
    }
    const userData = {
        [config.FIELD_ID        ]: user[config.FIELD_ID        ],
        [config.FIELD_USERNAME  ]: user[config.FIELD_USERNAME  ],
        [config.FIELD_DEPARTMENT]: user[config.FIELD_DEPARTMENT],
    };
    return userData;
}

// Get Users
async function getUsers() {
    return await knexDB(config.TABLE_USERS).select(
        config.FIELD_ID        ,
        config.FIELD_USERNAME  ,
        config.FIELD_DEPARTMENT,
    );
}