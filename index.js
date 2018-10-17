// Import
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const usersTable = require('./data/helpers/credsmodel');
const errorHandler = require('./api/ErrorHandler/errorhandler');
const tokenHelper = require('./data/helpers/tokens');



// Server init
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());



// Middleware
// ~~ Targeted protected route ~~ //
const protected = (req, res, next) => {
	const token = req.headers.authorization;
	
	if(token) {
        const verified = tokenHelper.verifyToken(token);
        if(verified.valid) {
            req.decodedToken = verified.payload;
            next();
        } else {
            next(["h401", verified.error]);
        }
	} else {
		next(["h401", "No token provided."]);
	}
};



// Routes
// ~~ User registration ~~ //
// addNewUser({username: 'string', password: 'hashed string', department: 'string'}) -> [id: int]
server.post('/api/register', (req, res, next) => {
    if(req.body.username && req.body.password && req.body.department) {
        const newUser = {
            username: req.body.username, 
            password: req.body.password, 
            department: req.body.department
        };
        const hash = bcrypt.hashSync(newUser.password, 13);
        newUser.password = hash;

        usersTable.addNewUser(newUser)
            .then((id) =>{
                res.status(201).json({"newUserId": id[0]});
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing properties!"]);
    }
});

// ~~ User login ~~ //
// authUser({username: 'string', password: 'string}) -> {id: int, username: 'string', password: 'hashed string', department: 'string'}
server.post('/api/login', (req, res, next) => {
    const credentials = {
        username: req.body.username, 
        password: req.body.password
    };

	usersTable.authUser(credentials)
		.then((user) => {
			if(user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = tokenHelper.generateToken(user.id);
				res.status(200).json({"message": `Affirmative, ${user.username}. I read you.`, token});
			} else {
				next(["h401", "You shall not pass!"]);
			}
		})
		.catch((err) => {
			next(["h500", err]);
		});
});

// ~~ A targeted protected route ~~ //
// find() -> [{id: int, username: 'string', department: 'string'}, ..., {id: int, username: 'string', department: 'string'}]
server.get('/api/users', protected, (req, res, next) => {
    usersTable.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~ Catch-all 404 ~~ //
server.use((req, res, next) => {
    next(["h404", `The requested path '${req.url}' doesn't exist.`]);
});

// ~~ Catch all the errors ~~ //
server.use(errorHandler);



// Listener
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
