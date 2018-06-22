const router = require( 'express' ).Router();
const jwt = require( 'jsonwebtoken' );
const User = require( '../models/index' );
const secret = 'Cwk6sjAYd7qxrgGLFamWfNK8Q4HMn3Bzc5JUeTpXDubEv9Py2Zt8SngvD9G6yk3hMadK4fxZFBREqY7zAceCPpjrQLW5bwTVu2Hs'

router
  .route('/register')
  .post( '/register', function ( req, res )
{
  User.create( req.body )
    .then( ( { username, race } ) =>
    {
      res.status( 201 ).json( { username, race } );
    } )
    .catch( err => res.status( 500 ).json( err ) );
} );


router
  .route('/login')
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
              res.status( 500 ).json( { Error: err.message } );
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
