const router = require('express').Router();
const mongoose = require( 'mongoose' );
const User = require( '../users/User' );
const jwt = require( 'jsonwebtoken' );

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username   }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken( user );
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => res.status(500).json(err));
} );
router.post( '/login', ( req, res ) =>
{
  //grab credentials
  const { username, password, race } = req.body;
  //find the user to get to the store password
  User.findOne( { username } )
    .then( user =>
    {
      if ( user )
      {

        user
          .validatePassword( password )
          .then( passwordsMatch =>
          {
            if ( passwordsMatch )
            {
              //generate token
              const token = generateToken( user );

              res.status( 200 ).json( { message: `welcome ${ username }!`, token } );
                          
            } else {
              res.status( 401 ).send( 'invalid credentails' );
            }

          } )
          .catch( err =>
          {
            res.send( 'error comparing passwords' );
          } );
      } else
      {
        res.status( 404 ).send( 'invalid creditials' );
      }

    } )
    .catch( err =>
    {
      res.send( err );


    } )
} );
function generateToken( user )
{
  const options = {
    expiresIn: '1h'
  }
  const secret = "toss me, but dont tell the elf!";
  const payload = { name: user.username };
 return jwt.sign( payload, secret, options );
  
};

module.exports = router;
