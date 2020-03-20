function restrictRole(role) {
	return (req, res, next) => {
		// restrict() has to be called before this or these values will be undefined
		if (req.token && req.token.userRole === role) {
			// user is authorized and matches the role we're looking for
			next()
		} else {
			// user does not match the role we're looking for
			return res.status(403).json({
				message: "You are not allowed here",
			})
		}
	}
}

module.exports = restrictRole
