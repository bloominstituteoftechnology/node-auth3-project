const router = require('express').Router();

const User = require('./User');

router.get('/', restricted, (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
function restricted( req, res, next )
{
  const token = req.headers.authorization;
  if ( token )
  {
    next();
  } else
  {
    res.status( 401 ).json( { message: 'you shall not pass!' } );
  }
}


module.exports = router;
