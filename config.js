

//== Project Constants =========================================================

module.exports = {
    // Server
    SERVER_MESSAGE_LISTEN: `Server Listening on port ${process.env.PORT}`,
    // Database
    TABLE_USERS: 'users',
    FIELD_USERNAME  : 'username'  ,
    FIELD_PASSWORD  : 'password'  ,
    FIELD_DEPARTMENT: 'department',
    LIMIT_USERNAME  : 128,
    LIMIT_PASSWORD  : 128,
    LIMIT_DEPARTMENT: 128,
    DEFAULT_DEPARTMENT: 'Test Department',
    // URL
    URL_AUTHENTICATION: '/api',
    URL_AUTHENTICATION_REGISTER : '/register',
    URL_AUTHENTICATION_LOGIN    : '/login'   ,
    URL_AUTHENTICATION_USERSLIST: '/users'   ,
    // User Feedback
    RESPONSE_MESSAGE: 'message',
    RESPONSE_ERROR  : 'error'  ,
    MESSAGE_RESTRICTED            : 'You shall not pass!',
    MESSAGE_AUTHENTICATION_FAILURE: 'You shall not pass!',
    MESSAGE_AUTHENTICATION_SUCCESS: 'Login Successful'   ,
    // Errors
    ERROR_DATABASE_INTERNAL: 'Internal Error',
}
