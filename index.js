const jwt = require('jsonwebtoken');


function generateToken(user){
    const payload = {
        username: user.username
    };

    const secret = '';

    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    }

    return jwt.sign(payload, secret, options);

}