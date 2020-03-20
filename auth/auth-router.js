
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');
const restrict = require('../middleware/restrict.js');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const authError = {
    message:"You shall not pass!",
  }

  try{
    let { username, password } = req.body;

    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401). json(authError)
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return res.status(401).json(authError)
    }
    console.log("got past username and password, ", passwordValid, user.id)
    const payload = {
      userId: user.id,
      userRole: 'admin',
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)
    console.log(token)

    res.cookie('token', token)

    res.json({
      message:`Welcome ${user.username}!`,
    })
  } catch(err) {

  }
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }


  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post('/register', async (req, res, next) => {
  try{
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();

    if(user){
      return res.status(409).json({
        message: "Username is already taken"
      })
    }

    res.status(201).json(await Users.add(req.body));

  } catch(err) {
    next(err);
  }

})

module.exports = router;
