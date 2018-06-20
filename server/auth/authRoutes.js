const router = require( 'express' ).Router();
const webtoken = require( 'jsonwebtoken' );
const User = require( '../users/User' );
const secret = 'Cwk6sjAYd7qxrgGLFamWfNK8Q4HMn3Bzc5JUeTpXDubEv9Py2Zt8SngvD9G6yk3hMadK4fxZFBREqY7zAceCPpjrQLW5bwTVu2Hs'

router.post( '/register', function ( req, res )
{
  User.create( req.body )
    .then( ( { username, race } ) =>
    {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status( 201 ).json( { username, race } );
    } )
    .catch( err => res.status( 500 ).json( err ) );
} );

function generateToken( user )
{
  const options = {
    expiresIn: '15m'
  }
  const payload = { name: user.username };
  return webtoken.sign( payload, secret, options );
}

router
  .post( '/login', ( req, res ) =>
  {
    const { username, password } = req.body;
    User
      .findOne( { username } )
      .then( user =>
      {
        if ( user )
        {
          user
            .validatePassword( password )
            .then( passwordMatch =>
            {
              if ( passwordMatch )
              {
                const token = generateToken( user );
                res.status( 200 ).json( { message: `Hey ${ username }! Your credentials are up to date. You may enter.`, token } )
              } else
              {
                res.status( 401 ).send( 'A member of our staff will be right with you. Your are number 37 in the queue.' )
              }
            } )
            .catch( err =>
            {
              res.json( { 'error': err } );
            } );
        } else
        {
          res.status( 401 ).send( 'INCORRECT! EXTERMINATE EXTERMINATE!' )
        }
      } )
      .catch( err =>
      {
        res.send( err );
      } )
  } )


module.exports = router;
