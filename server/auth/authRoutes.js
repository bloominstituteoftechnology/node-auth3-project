const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      const payload = { username, race };
      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secret, options);

      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      res.status(201).json({ username, race });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  const { username, password, race } = req.body;

  User.findOne()
    .select( 'username race' )
    .where({ username })
    .exec((user, err) => {
    if (err)
      return res.status(500).json(err);
    
    if (!user)
      return res.status(404).json({ err: 'No user with that name' }); 
    
    bcrypt.compare(password, user.password, (errm,bcRes) => { 
      if (err)
        return res.status(500).json(err);
      
      if (!bcRes)
        return res.status(401).json({ err: 'Wrong Password' });
      const payload = { username, race };
      const options = { expiresIn: '1h' };
      const token = jwt.sign(payload, secret, options);

      res.json({ username: user.name, race: user.race, token });

    })
  })
})
  
module.exports = router;
