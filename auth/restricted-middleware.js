const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../configs/secrets.js');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'token is not valid' });
			} else {
				req.user = decodedToken.user;
				next();
			}
		})
	} else {
		res.status(401).json({ message: 'Please send me an authorization token' });
	}
}