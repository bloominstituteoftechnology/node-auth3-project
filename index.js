const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./data/dbConfig");
const mw = require("./middleware");

const PORT = 4142;
const cl = console.log;

const server = express();

server.use(express.json(), cors());

// POST	/api/register	Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.
server.post("/api/register", (req, res) => {
  const creds = req.body;
  if (mw.passCheck(creds)) {
    creds.password = bcrypt.hashSync(creds.password, 12);
    db.addUser(creds)
      .then(ids => {
        const id = ids[0];
        db.findUserByID(id)
          .then(user => {
            const token = mw.generateToken(user);
            res.status(201).json({ id: user.id, token });
          })
          .catch(err => res.status(500).send(err));
      })
      .catch(err => {
        res
          .status(500)
          .json({ err: `There was an error adding that user: ${err}` });
      });
  } else {
    res
      .status(406)
      .send("Please structure your password according to the proper rules");
  }
});

// POST	/api/login	Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'
server.post("/api/login", (req, res) => {
  const creds = req.body;
  db.findUserByName(creds.username)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = mw.generateToken(creds);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).send("You shall not pass!");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// GET	/api/users	If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.
server.get("/api/users", mw.protected, (req, res) => {
  db.findUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
