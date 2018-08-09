# Authentication Day 3 and 4

## Day 1 Objectives

- Use Node.js, Express and Knex to build an API that provides _Authentication_ functionality using SQLite to store _User_ information. **The user schema should include: username, password and department**. The department should be a string used to group the users. No need for a _departments_ table or setting up relationships.
- Use **JSON Web Tokens** to keep users authenticated across requests.
- Design and build the follwoing endpoints.

#### Endpoints

| Method | Endpoint      | Description                                                                                                                                                                                                                                                                                         |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.                                                                                                                                                         |
| POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!' |
| GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'. Use this endpoint to verify that the password is hashed before it is saved.                    |


## 1. Inititialize yarn to create package.json

```
$ yarn init
```

## 2. Update the package.json by adding dependencies and a start script

```
$ yarn add bcryptjs express knex nodemon sqlite3 jsonwebtoken

  "scripts": {
    "start": "nodemon server.js"
  },
```

```
{
  "name": "auth-i",
  "version": "1.0.0",
  "main": "server.js",
  "repository": "https://github.com/blkfltchr/auth-i.git",
  "license": "MIT",
  "scripts": {
    "start": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "express": "^4.16.3",
    "knex": "^0.15.2",
    "nodemon": "^1.18.3",
    "sqlite3": "^4.0.2"
  }
}
```

## 3. Create a basic server.js file and make sure the server is up and running

```
const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Up and running...')
})

const port = 8000;

server.listen(port, function() {
    console.log(`\n--- Web API Listening on http://localhost:${port} ---\n`);
})
```

## 4. Start using knex: (a) initialize it, (b) create a user table with migrations, (c) update /migrations/[TIME_STAMP]_create_users_table

```
$ knex init

$ knex migrate:make create_users_table

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('department').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
```

## 5. Update the `knexfile.js` with the appropriate `filename` and `useNullAsDefault`

```
  development: {
    client: 'sqlite3',
    connection: {
      filename: './migrations/20180808183725_create_users_table'
    },
    useNullAsDefault: true,
  },
```

## 6. Create `/auth` folder and fill it with `db.js`

```
// db.js

const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);
```

## 7. Add three require lines to server.js

```
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./auth/db');
```

## 8. Create a `generateToken()` function and add it to server.js

const secret = 'snoop doggy dogg';

function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}

## 9. Build out the POST /signup method with bcryptjs: (a) define the `/signup` route, (b) hash the password, (c) save the user

```
server.post('/register', (req, res) => {

	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // Auto-gen a salt and hash
	user.password = hash; // store hash in password DB

    db('users') // go into users
        .insert(user) // insert new users
        .then(ids => {
            db('users')
                .where({ id: ids[0] }) // find the appropriate user
                .first() // the first one
                .then(user => {
                const token = generateToken(user); // generate the token
                    res.status(201).json(token); // return new token
                });
        })
        .catch(err => {
            res.status(500).json(err); // throw err if it fails
        });
});
```

## 10. Build out a simple GET /users method

```
server.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err));
});
```

## 11. Build out the POST /login method: (a) set login information as `credentials = req.body`, (b) find user by username, (c) make sure `user.password` and `credentials.password` match using `compareSync`, (d) add an error message

```
server.post('/login', (req, res) => {
	const credentials = req.body;

    db('users')
        .where({username: credentials.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                res.send(token)
            } else {
                res.status(401).json({ error: 'You shall not pass'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
```

## 12. Create protected routes: (1) create a `protected` function, (2) add `protected` to the route you want to protect

```
function protected(req, res, next) {
  const token = req.headers.authorization; // grab the header

  if (token) { // check for token
    jwt.verify(token, secret, (err, decodedToken) => { // check if it's valid (err = didn't decode, decodedToken = success)
      if (err) { // if it didn't validate correctly
        return res.status(401).json({ error: 'you shall not pass!! - token invalid' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' }); // return an error
  }

server.get('/users', protected, (req, res) => {
    console.log('token', req.jwtToken); // add a console.log of the token and the decoded token
    db('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err));
});
```

## Day 2 objectives

- implement a React client:
  - use `create-react-app` to generate a application to server as the client for the Web API.
  - inside the React application add **client-side routes** and components for `signup`, `signin` and showing the `list of users` stored in the database.
  - the `/signup` route should provide a form to gather `username`, `password` and `department` for the user and make a `POST` request to the `/api/register` route on the API. If the user is created successfully, take the returned token, save it to the browser's local storage and redirect the user to the `/users` route, where they should see the list of users.
  - the `/signin` route should provide a form to gather `username` and `password` for the user and make a `POST` request to the `/api/login` route on the API. Upon successful login, persist the returned token to the browser's local storage and redirect the user to the `/users` route.
  - the `/users` route should read the token from local storage and make a `GET` request to the `/api/users` route on the API attaching the token as the value of the `Authorization` header.
  - provide a button to `sign out` that will remove the token from local storage.

## . Create a server folder and drag everything into it

## . Create react app

```
$ create-react-app client

$ cd client

$ cd yarn start
```

# . Add dependencies

```
$ yarn add react-router-dom axios reactstrap
```

## . Wrap <App /> on index.js with <Router>

```
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <App />
    </Router>
        , document.getElementById('root'));
registerServiceWorker();
```

## . Add routes to App.js

```
import {Route} from 'react-router-dom'

<Route path='/login' component={Login} />
<Route path='/register' component={Register} />
```

## . Set up reactstrap

```
$ yarn add reactstrap bootsrap

import 'bootstrap/dist/css/bootstrap.css' // on index.js
```

## . Create basic login and register components in /auth

```
import React from 'react';
import '../App.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
          <h1>Log in</h1>
            <Form>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input
                        name="username"
                        placeholder="Username"
                        // onChange={}
                        value={this.state.username}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        // onChange={}
                        value={this.state.password}
                    />
                </FormGroup>
                <Button>Log in</Button>
            </Form>
      </div>
    );
  }
}

export default Login;
```

## . Style the form with `className="form-wrapper"

```
<div className="formWrapper">

.formWrapper {
  margin: 0 auto;
  width: 40vw;
  padding: 10px;
  border: 1px solid darkgray;
}
```

## . Create an `inputChangeHandler`

```
inputChangeHandler = event => {this.setState({ [event.target.name]: event.target.value})};
```

## . Create a `submitHandler`

```
submitHandler = event => {
    event.preventDefault();
    axios
        .post('http://localhost:8000/login', this.state)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        });
    console.log(this.state);
  }
```

## . Add cors

```
cd server

yarn add cors

server.use(cors()); // on server.js
```

## . Create `/users/Users.js`: (1) add an empty array of users to state, (2) componenDidMount with axios, (3) fetch the token from local storage and attach it to the header, (4) map over the list of users and return their usernames

```
import React, {Component} from 'react';
import '../App.css';
import axios from 'axios'

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    const token = localStorage.getItem('jwt');

    const requestOptions = {
        headers: {
            Authorization: token
        }
    };

    axios
        .get('http://localhost:8000/users', requestOptions)
        .then((response) => {
          this.setState({ users: response.data })
        })
        .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="formWrapper">
          <h1>Users</h1>
            {this.state.users.map(user => <div key={user.id}>{user.username}</div>)}
      </div>
    );
  }
}

export default Users;
```
