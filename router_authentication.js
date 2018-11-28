

/*== Authentication Route Handler ==============================================

POST /api/register
    Creates a user using the information sent inside the body of the request.
    Hash the password before saving the user to the database.
POST /api/login
    Use the credentials sent inside the body to authenticate the user. On
    successful login, create a new JWT with the user id as the subject and send
    it back to the client. If login fails, respond with the correct status code
    and the message: 'You shall not pass!'
GET  /api/users
    If the user is logged in, respond with an array of all the users contained
    in the database. If the user is not logged in repond with the correct status
    code and the message: 'You shall not pass!'. Use this endpoint to verify
    that the password is hashed before it is saved.

*/

//-- Dependencies --------------------------------
const express = require('express');
const config        = require('./config.js'        );
const databaseUsers = require('./database_users.js');


//== Router Configuration ======================================================

//-- Export Route Handler ------------------------
const router = module.exports = express.Router();

//-- Route Definitions ---------------------------
router.post(config.URL_AUTHENTICATION_REGISTER ,            handleRegistration);
router.post(config.URL_AUTHENTICATION_LOGIN    ,            handleLogin       );
router.get (config.URL_AUTHENTICATION_USERSLIST, protected, handleGetAllUsers );

//-- Error Handling ------------------------------
router.use(errorHandler);


//== Utility Functions =========================================================

//-- Login ---------------------------------------
function loginUser(request, userId) {
}

//-- End Point Protection Middleware -------------
function protected(request, response, next) {
    // Proceed to next() if user is logged in
    if(false) {
        next();
        return;
    }
    // Inform user of login error
    response.status(401).json({
        [config.RESPONSE_MESSAGE]: config.MESSAGE_RESTRICTED,
    });
};

//-- Error Handling ------------------------------
function errorHandler(error, request, response, next) {
    if(error !== config.ERROR_AUTHENTICATION_NAMETAKEN){
        error = config.ERROR_DATABASE_INTERNAL;
    }
    response.status(500).json({
        [config.RESPONSE_ERROR]: error,
    });
    next(error);
}


//== Route Handlers ============================================================

//-- Register New User ---------------------------
async function handleRegistration(request, response, next) {
    try {
        // Attempt to register a new user
        const username = request.body.username;
        const password = request.body.password;
        const userId = await databaseUsers.addUser(username, password);
        // Inform of success
        loginUser(request, userId);
        response.status(201).end();
        // Move to next middleware
        // next() <-- Not called when using end()
    } catch(error){ next(error);}
}

//-- User Log In ---------------------------------
async function handleLogin(request, response, next) {
    try{
        // Check if supplied username and password are valid
        const username = request.body.username;
        const password = request.body.password;
        const userId = await databaseUsers.authenticate(username, password);
        // Handle failed authentication
        if(!userId){
            response.status(401).json({
                [config.RESPONSE_MESSAGE]: config.MESSAGE_AUTHENTICATION_FAILURE,
            });
        // Set Id on session and alert agent of success
        } else {
            setSession(request, userId);
            response.status(200).json({
                [config.RESPONSE_MESSAGE]: config.MESSAGE_AUTHENTICATION_SUCCESS,
            });
        }
        // Move to next middleware
        next();
    } catch(error){ next(error);}
}

//-- Display All Registered Users ----------------
async function handleGetAllUsers(request, response, next) {
    try {
        // Respond with users list from database
        const users = await databaseUsers.getUsers();
        response.status(200).json(users);
        // Move to next middleware
        next();
    } catch(error){ next(error);}
}
