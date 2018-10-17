const jwt = require('jsonwebtoken');

const jwtSecret = 'mother, I killed a man!';

const generateToken = (user) => {
	// no PII/sensitive data in the payload
	const jwtPayload = {...user, hello: 'FSW13', role: 'admin'};
	const jwtOptions = {
		expiresIn: '1m'
	};
	return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};

const verifyToken = (token) => {
	return jwt.verify(token, jwtSecret, (err, decodedToken) => {
		if(err) {
			return {valid: false, payload: '', error: err};
		} else {
			return {valid: true, payload: decodedToken, error: ''};
		}
	});
};

module.exports = {
	generateToken,
	verifyToken
};
