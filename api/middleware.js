const db = require('../data/db')
const jwt = require('jsonwebtoken')

const secret = "nobody tosses a dwarf!"

module.exports = {
    getUser: function(req,res,next) {
        let { userName } = req.body
        try{
            db('users')
                .where({ userName })
                .first()
                .then(user => {
                    if(user){
                        req.userIn = user
                        next()
                    }else{
                        res.status(500).json("Error with user name or password")
                    }
                })
        }catch(err){
            res.status(500).json("Error with user name or password")
        }
    },

    generateToken: function(user){
        const payload = {
            username: user.username
        }

        const options = {
            expiresIn: '1h',   // 15 minutes
            jwtid: '12345'
        }

        return jwt.sign(payload, secret, options)
    }
}