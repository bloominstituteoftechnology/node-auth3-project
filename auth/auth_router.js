const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../users/users_model')

const validate = require('../auth/helperValid')


router.post('/register', (req, res) => {
    let use = req.body

    const hash = bcrypt.hashSync(use.password, 12);
    use.password = hash;

    Users.add(use)
    .then(registers => {
      res.status(201).json(registers);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    });
});

router.post('/login', validate, (req, res) => {
    const { username, password } = req.body

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = signToken(user)

            res.status(200).json({
                token,
                message: `Welcome ${user.username}!`,
            })
        } else {
            res.status(401).json({ message: "Invalid Credentials" })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

function signToken(user) {
    const payload = {
      id: user.id,
      //username: user.username,
      department: user.department
    };
    const secret = process.env.JWT_SECRET || "thiS Is vErY eAsy tO Break";
  
    options = {
      expiresIn: "2h"
    };
    return jwt.sign(payload, secret, options);
  }
  
  module.exports = router;