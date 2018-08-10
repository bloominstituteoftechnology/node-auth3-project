const express = require('express');
const db = require("./data/db.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const secret = "Peter Parker";

function protected(req, res, next) {
    const token = req.headers.authorization;
    // if (req.session && req.session.username) {
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({
                        error: "you shall not pass! bad token"
                    });
                }
                req.jwtToken = decodedToken;
                next();
            });
          } else {
            return res.status(401).json({ error: "you shall not pass! missing token" });
          }
        }
        //         next();
        //     } else {
        //         res.status(401).json({
        //             message: 'you shall not pass!!'
        //         });
        //     }
        // }

        function generateToken(user) {
            const payload = {
              username: user.username,
            };
            const options = {
              expiresIn: "1h",
              jwtid: "8728391"
            };
          
            return jwt.sign(payload, secret, options);
          }

        server.get('/', (req, res) => {
            res.send('authing... 53')
        })
        server.post('/api/register', (req, res) => {
            const user = req.body;
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
        
            db('users')
            .insert(user)
            .then( ids => {
                db('users')
                .where({ id: ids[0]})
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json(user);
                })
        
            })
        
            .catch(err => {
                res.status(500).json({error: "error reg"
            })
                
            })
        });
        server.get('/api/users', protected, (req, res) => {
            db('users').then(users => {
                res.status(200).json(users)
            }).catch(err => res.status(500).json(err))
        });
        server.post('/api/login',  (req, res) => {
            const credentials = req.body;
        
            db('users')
            .where({username: credentials.username})
            .first()
            .then(user => {
                if( user && bcrypt.compareSync(credentials.password, user.password)) {
                    // req.session.username = user.username;
                    const token = generateToken(user);

                    res.send(token)
        
                } else{
                    res.status(401).json({error: 'you shall not pass'})
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
            
        });
        const port = 5300;
        server.listen(port, function () {
            console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
        });