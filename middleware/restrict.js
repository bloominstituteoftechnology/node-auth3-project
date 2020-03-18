const jwt = require("jsonwebtoken")

function restrict() {
    const authError = {
        message: "You shall not pass!",
    }

    return async (req, res, next) => {
        try {
            const { token } = req.cookies
            if(!token) {
                return res.status(401).json(authError)
            }
            jwt.verify(token, "hello there", (err, decoded) => {
                if(err) {
                    return res.status(401).json(authError)
                }
                req.token = decoded
                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict;