const router = require('express').Router();
const bc = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/secrets.js');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
	let user = req.body;
	bc.genSalt(13, function(err, salt) {
		bc.hash(user.password, salt, function(err, hash) {
			if (err) {
				res.status(500).json({ message: 'error with hash' });
			} else {
				user.password = hash;
				Users.add(user)
					.then(usr => {
						res.status(201).json(usr);
					})
					.catch(err => {
						res.status(500).json(err);
					});
			}
		});
	});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if(user) {
				bc.compare(password, user.password).then(match => {
					if (match) {
						const token = signToken(user);
						res.status(200).json({ token: token });
					} else {
						res.status(401).json({ message: 'Invalid Credentials' });
					}
				})
				.catch(err => {
					res.status(500).json({ message: `${err}`});
				})
			} else {
				res.status(400).json({ message: 'Could not find user' });
			}

		})
		.catch(err => {
			res.status(500).json({ message: 'Invalid Credentials' });
		})
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.json({ message: 'you can checkout any time you like, but you can never leave'})
      } else {
        res.status(200).json({ message: 'bye, thanks for playing!' });
      }
    })
  } else {
    res.status(200).json({ message: 'You were never here to begin with' });
  }
});

function signToken(user) {
	const payload = {
		user
	};

	const options = {
		expiresIn: '4h'
	}

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;