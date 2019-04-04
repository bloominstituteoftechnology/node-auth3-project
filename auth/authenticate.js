const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET ||
  'This could be called anything, just keep it a secret and safe!';

// quickly see what this file exports
module.exports = {
  authenticate,
};

function authenticate(req, res, next) {
	//the auth token is normally sent in the Authorization header
	const token = req.headers.authorization
	if (token) {
		jwt.verify(token, jwtKey, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'invalid token' })
			} else {
				req.decodedToken = decodedToken
				next()
			}
		})
	} else {
		res.status(401).json({ message: 'no token provided' })
	}
}