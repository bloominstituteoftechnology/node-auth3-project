const db = require('../data/db')

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
    }
}