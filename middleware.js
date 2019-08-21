// const bcrypt = require('bcryptjs');
// const Users = require('./data-model');

module.exports = function restricted (req, res, next){
    if(req.session.user && req.session){
        next();
    }else{
        res.status(500).json({ message: 'No passage for you' })
    }
    // const { username, password} = req.headers;
    // if(username && password){
    //     Users.findBy({username})
    //         .first()
    //         .then(user => {
    //             if(user && bcrypt.compareSync(password, user.password)){
    //                 next();
    //             }else{
    //                 res.status(401).json({ message: 'Invalidd Credentials' })
    //             }
    //         })
    //         .catch(err => {
    //             res.status(500).json(err)
    //         })
    // }else{
    //     res.status(400).json({ message: 'Please provide valid credentials' })
    // }
}