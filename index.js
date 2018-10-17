// Import
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const usersTable = require('./data/helpers/credsmodel');
const errorHandler = require('./api/ErrorHandler/errorhandler');
const tokenHelper = require('./data/tokens');



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
            next(["h401", "Invalid token!"]);
        }
	} else {
		next(["h401", "No token provided."]);
	}
};

// ~~ Global restricted routes ~~ //
// const restricted = (req, res, next) => {
// 	if(req.url.includes('/api/restricted')) {
// 		if(req.session && req.session.username) {
// 			next();
// 		} else {
// 			next(["h401", "Not authorized!"]);
// 		}
// 	} else {
// 		next();
// 	}
// };
// server.use(restricted);



// Routes
// ~~ User registration ~~ //
// addNewUser({username: 'string', password: 'hashed string'}) -> [id: int]
server.post('/api/register', (req, res, next) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 13);
    credentials.password = hash;

    usersTable.addNewUser(credentials)
        .then((id) =>{
            res.status(201).json({"newUserId": id[0]});
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~ User login ~~ //
// authUser({username: 'string'}) -> {id: int, username: 'string', password: 'hashed string'}
server.post('/api/login', (req, res, next) => {
    const credentials = req.body;

	usersTable.authUser(credentials)
		.then((user) => {
			if(user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = tokenHelper.generateToken(user);
				res.status(200).json({"message": 'Welcome home. Country roads.', token});
			} else {
				next(["h401", "You shall not pass!"]);
			}
		})
		.catch((err) => {
			next(["h500", err]);
		});
});

// ~~ A targeted protected route ~~ //
// find() -> [{id: int, username: 'string'}, ..., {id: int, username: 'string'}]
server.get('/api/users', protected, (req, res, next) => {
    usersTable.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~ A global restricted route ~~ //
// find() -> [{id: int, username: 'string'}, ..., {id: int, username: 'string'}]
// server.get('/api/restricted/users', (req, res, next) => {
//     usersTable.find()
//         .then((users) => {
//             res.status(200).json(users);
//         })
//         .catch((err) => {
//             next(["h500", err]);
//         });
// });

// ~~ Catch-all 404 ~~ //
server.use((req, res, next) => {
    next(["h404", `The requested path '${req.url}' doesn't exist.`]);
});

// ~~ Catch all the errors ~~ //
server.use(errorHandler);



// Listener
const port = 8080;
server.listen(port, () => console.log(`\n~~~ Server listening on port ${port} ~~~\n`));
