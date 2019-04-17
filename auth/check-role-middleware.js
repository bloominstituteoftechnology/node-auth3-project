module.exports = role => {
    return function(req, res, next) {
        if(req.decodeJwt.roles && req.decodedJwt.roles.include(role)) {
            next();
        } else {
            res.status(403).json({ You: 'Aren\'t you forgetting something!' })
        }
    }
}