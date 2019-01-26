const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs')

//const session = require('express-session')
//
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const db = require('./data/dbConfig.js');
const server = express();
const secret = 'shhhthisissecret';



// custom middleware
function protect(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token'}); 
    } else {
      next();
    }
  });
}
//************************************************** */
function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options);
}
//**************************************************** */
server.use(express.json());
server.use(cors());
server.use(logger('tiny'));
//********************************************** */
server.get('/', (req, res) => {
  res.send('Its Alive!');
});
//******************************************************* */
 server.post('/api/register', (req, res) => {
  const user = req.body;
  
  user.password = bcrypt.hashSync(user.password, 10);
  db.insert(user)
  .then(ids => {
    db.findById(ids[0])
    .then(user => {
      const token = generateToken(user)
      res.status(201).json({id: user.id, token});
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });
}); 
//******************************************************************************** */
 /* server.post('/api/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
 // db('users')
 // .insert(user)

  .then(ids => {
    const id = ids[0];
    generateToken(user.username);
    res.status(201).json(id);
  })
  .catch(err => res.status(500).send(err));
}); */

//****************************************************************************** */
server.post('/api/login', (req, res) => {
  const creds = req.body;
  db.findByUsername(creds.username)
  .then(user => {
      // username valid   hash from client == hash from db
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      // redirect
      res.json({ id: user.id, token });
    } else {
      // we send back info that allows the front end 
      // to display a new error message
      res.status(404).json({err: "invalid username or password"});
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

server.post('/api/login', (req, res) => {
  const creds = req.body;
  db.findByUsername(creds.username)
  .then(user => {
      // username valid   hash from client == hash from db
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user)
      // redirect
      res.json({ id: user.id, token });
    } else {
      // we send back info that allows the front end 
      // to display a new error message
      res.status(404).json({err: "invalid username or password"});
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

//********************************************************************** */
/* server.post('/api/login', (req, res) => {
  // check that username exists AND that passwords match
  const bodyUser = req.body;
  db.findByUsername(bodyUser.username)
    .then(users => {
      // username valid   hash from client == hash from db
      if (users.length && bcrypt.compareSync(bodyUser.password, users[0].password)) {
        req.session.userId = users[0].id;
        res.json({ info: "correct" });
      } else {
        res.status(404).json({ err: "invalid username or password" });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
}); */



//****************************************************************** */
// protect this route, only authenticated users should see it
server.get('/api/users', protect, (req, res) => {
  db.findUsers()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).send(err);
  })
});
//***************************************************/
/* server.get('/api/users/', (req, res) => {
  const user = req.body;
  const userId = req.body;
     db.find()
     .then(users => {
       if (req.session && userId) {     
         res.json(users);    
       } else {
         res.status(404).json({ err: "unable to access users, must be logged in..." });
       }
     })
     .catch(err => res.send(err));
 }); */
//*************************************************** */
server.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('failed to logout');
    } else {
      res.send('logout successful');
    }
  });
});
//*************************************************************** */
/* server.post('/api/logout', (req, res) => {
  if (req.session && req.session.userId) {
    res.status(500).send('Not logged in.');
  } else {
    req.session.destroy(err => {
    if (err) {
      res.status(500).send('failed to logout.');
    } else {
      res.send('logout successful.')
    }
 
  })}
}); */

// psuedo code for if we were managing messages
// server.get('/api/messages', (req, res) => {
//   // check for session and user id
//   db.findMessagesByUser(req.session.userId)
// })

server.listen(3300, () => console.log('\nrunning on port 3300\n'));











//********************************************************************************************************************** */
/* server.use(express.json());
server.use(cors());
server.use(session({
  name: 'notsession', // default is connect.sid
  secret: 'nobody tosses a dwarf!',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000
  }, // 1 day in milliseconds
  httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
  resave: false,
  saveUninitialized: false,
}))
 */
/* server.get('/', (req, res) => {
  res.send('Its Alive!');
}); */








