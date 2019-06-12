module.exports = function(role) {
    return function(req, res, next) {
        if (req.user) {
            if (
                req.user.roles &&
                Array.isArray(req.user.roles) &&
                req.user.roles.includes(role)
            ) {
                next();
            } else {
                res.status(403).json({ message: 'Must be logged in to access this information.'})
            }
        } else {
            res.status(401).json({ message: 'You cannot access this information.'})
        }
    }
}