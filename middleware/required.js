const jwt = require('jsonwebtoken');
const config = require('../data/config');

function postCheck(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ errorMessage: "Please provide a username and password!" });
    req.username = username;
    req.password = password;
    next();
}

function loginCheck(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.secret, (err, decodedToken) => {
            if (err) return res.status(401).json({ error: 'Token invalid' });
            req.jwtToken = decodedToken;
            next();
        })
    } else {
        return res.status(401).json({ error: 'No Token' });
    }
}

function generateToken(user) {
    const payload = { username: user.username };
    const options = { expiresIn: '1h' }

    return jwt.sign(payload, config.secret, options);
}

module.exports.postCheck = postCheck;
module.exports.loginCheck = loginCheck;
module.exports.generateToken = generateToken;