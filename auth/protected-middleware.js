const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model.js');
const { tokenSecret } = require('../secrets.js')

module.exports = ( req, res, next ) => {
  const { authorization: token } = req.headers;

  if ( token ) {
    jwt.verify( token, tokenSecret, (err) => {
      if ( err ) res.status( 401 ).json({ message: 'Nah' });
      else next()
    })
  } else {
    res.status( 400 ).json({ message: 'No credentials provided' });
  }
};
