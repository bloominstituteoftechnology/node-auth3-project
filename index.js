const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
    res.send('Its Alive!');      
})

//USER REGISTER... INTO DATABASE 'USERS'
server.post('/api/register', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 1);
    credentials.password = hash;
    db('users').insert(credentials)
               .then(ids => {
                    res.status(201).json(ids);
                })
               .catch(err => res.send(err));
});

//USER LOGIN...To check authenticated users
server.get('/api/login', (req, res) => {
        const credentials = req.body;
        db('users')
                .where({ username : credentials.username })
                .first()
                .then(user => {
                     if(user && bcrypt.compareSync(credentials.password, user.password)) {
                            res.status(200).json({message : "Logged In"});
                     } else {
                            res.status(401).json({message : "Invalid username or password.."})
                     }
                 })
                .catch(err => res.send({Message : "Error in Logging In..."}));
})
//USER LOGIN...To check uthenticated users
/*server.get('/api/login', (req, res) => {
    const credentials = req.body;
    db('users')
        .where({username : credentials.username})
        .first()
        .then(user => {
             if(user && bcrypt.compareSync(credentials.password, user.password)) {
                //req.session.userId = user.id; 
                res.status(200).json({message : "Logged In"})
             } else {
                 res.status(401).json({message : "Invalid username or password.."})
             }
         })
        .catch(err => res.send(err));
});*/


server.listen(3300, () => console.log('\nrunning on port 3300\n'));