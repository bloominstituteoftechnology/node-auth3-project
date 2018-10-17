const jwt = require('jsonwebtoken');

const jwtSecret = `-MRUjQV"vsua!:}h?LmR},&t(zXe)a@b:z4ZpUHMd!WjKG:M@*<T(A^5#.,%'&@!`;

const generateToken = (user) => {
	// no PII/sensitive data in the payload!
	const jwtPayload = {...user};
	const jwtOptions = {
		expiresIn: '3m'
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
