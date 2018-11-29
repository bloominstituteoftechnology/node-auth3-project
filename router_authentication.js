

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
const express      = require('express'     );
const jsonWebToken = require('jsonwebtoken');
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
function loginUser(user) {
    // Compile User data
    const tokenData = {
      id        : user.id        ,
      username  : user.username  ,
      department: user.department,
    };
    // Retrieve token secret from environment
    const secret = process.env.JSONWEBTOKEN_SECRET;
    // Compile Token Options
    const options = {
      expiresIn: config.TIME_TOKEN_EXPIRATION,
    };
    // Return generated token
    return jsonWebToken.sign(tokenData, secret, options);
}

//-- Turn Callbacks into Promises ----------------
function callbackPromise() {
    let callback;
    const promise = new Promise(function (resolve, reject) {
        callback = function (error, result) {
            if(error) { reject(error);}
            resolve(result);
        }
    });
    return {promise, callback};
};

//-- End Point Protection Middleware -------------
async function protected(request, response, next) {
    try {
        console.log(1)
        // Fail if no token provided
        const token = request.headers.authorization;
        console.log(2)
        if(!token){ throw config.ERROR_AUTHENTICATION_FAILURE;}
        console.log(3)
        // Fail if token not valid
        let validChecker = callbackPromise();
        console.log(4)
        jsonWebToken.verify(
            token,
            process.env.JSONWEBTOKEN_SECRET,
            validChecker.callback,
        );
        console.log(5)
        let decodedToken = await validChecker.promise;
        console.log(6)
        // Set token on request
        request.token = decodedToken;
        console.log(7)
        // Move to next middleware
        next();
        console.log(8)
    }
    catch(error) {
        response.status(401).json({
            [config.RESPONSE_MESSAGE]: config.MESSAGE_RESTRICTED,
        });
    }
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
        const user = await databaseUsers.addUser(username, password);
        // Login User and respond with success
        const loginToken = loginUser(user);
        response.status(201).json({
            [config.RESPONSE_MESSAGE]: config.MESSAGE_AUTHENTICATION_SUCCESS,
            [config.RESPONSE_TOKEN  ]: loginToken,
        });
        // Move to next middleware
        next();
    } catch(error){ console.log(error); next(error);}
}

//-- User Log In ---------------------------------
async function handleLogin(request, response, next) {
    try{
        // Check if supplied username and password are valid
        const username = request.body.username;
        const password = request.body.password;
        const user = await databaseUsers.authenticate(username, password);
        // Handle failed authentication
        if(!user){
            response.status(401).json({
                [config.RESPONSE_MESSAGE]: config.MESSAGE_AUTHENTICATION_FAILURE,
            });
            next();
            return;
        }
        // Login User and respond with success
        const loginToken = loginUser(user);
        response.status(201).json({
            [config.RESPONSE_MESSAGE]: config.MESSAGE_AUTHENTICATION_SUCCESS,
            [config.RESPONSE_TOKEN  ]: loginToken,
        });
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
