const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./data/dbConfig");

const PORT = 4242;

const server = express();

server.use(express.json(), cors());

// POST	/api/register	Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.

// POST	/api/login	Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'

// GET	/api/users	If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
