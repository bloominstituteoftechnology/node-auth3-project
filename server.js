
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/db');

const server = express();
server.use(express.json());


const port = 3333;

//GENERTATE TOKEN
const secret = 'Jenny Ive got your number';
function generateToken(user) {
    const payload = {
        id: user.id
    }
    const options = {
        expiresIn: '24h',
        //optional
        jwtid: '867-5309',
    }
    return jwt.sign(payload, secret, options)
}

//PROTECTED PAGE
const protected = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                return res.status(401).json({ error: 'Denied Access! - Token Invalid' })
            } else {
            req.jwtToken = decodedToken;
            next();
            }
        })
    } else {
        return res.status(401).json({ error: 'Denied Access! - No token' })
    }
}


//HOME
server.get('/', (req, res) => {
    res.send('Rock-n-Roll!!');
});

//USERS
server.get('/users',  protected, (req, res) => {
    db('users')
        .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err));    
});

//REGISTER version 3
server.post('/api/register', async (req, res, next) => {
    const { username, password, department } = req.body;
    if (!username || !password || !department) {
        return res.status(400).json(['Error-dataShape',
        {'username': 'REQUIRED / UNIQUE', 'password': 'REQUIRED', 'department': 'REQUIRED',}]
        )
    }
    // const  checkIfDeptIsValid = () => {
    //     db('departments').select('code').where('code', '=', department).then(result => {
    //         if (!result[0]) {            
    //             res.status(400).json({error: 'NO dept found'});
    //             return;              
    //         }                          
    //     })                       
    // }
    // await checkIfDeptIsValid();
    const newUser = {username, password, department};
    // const newUser = req.body;
    //HASH PASSWORD
    const hash = bcrypt.hashSync(newUser.password, 4);
    newUser.password = hash;
        try {           
            let response = await db('users').insert(newUser);
            //BELOW, PULLING ID FROM A RETURNED ARRAY
            response = response[0];
            await db('users').where({id: response}).first().then( user => {
                //BELOW, NO NEED TO DESTRUCTURE ARRAY 
                    //DUE TO CALLING first() ABOVE.
                // user = user[0];

                //GENERATE TOKEN
                const token = generateToken(user);
                //ATTACH TOKEN TO RESPONSE
                res.send(token);
            })
        } 
        catch (error) {
            if (error.errno === 19) {
                return res.status(409).json('username already exists');                
            }
                res.status(500).json(error);
                res.end();
        }
})

//LOGIN
server.post('/api/login', (req, res) => {
    const credentials = req.body;
    db('users')
        .where({ username: credentials.username })
        .first()
        .then(function(user) {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user); 
                res.status(200).json(token);
                // res.status(200).json(token);                
            } else {
                return res.status(401).json({error: 'Incorrect credentials'})
            }
        })
        .catch(function (error) {
            res.status(500).json({ error })
    })
})


server.listen(port, () =>
    console.log(`Rock-n-Roll @port: ${port}`)
);


//UPDATE users SET deptname = (SELECT dname FROM department) 
//WHERE (SELECT new.deptcode FROM users) = (SELECT dcode FROM department);

// CREATE VIEW myview as 

// SELECT * FROM users
// JOIN departments ON users.department = departments.code;

// SELECT id, username, password, department, name FROM MY_VIEW2;



//REGISTER version 1
{/*   
// server.post('/api/register', (req, res) => {
//     // const { username, password } = req.body;
//     // const user = {username, password};
//     const newUser = req.body;
//     const hash = bcrypt.hashSync(newUser.password, 4);
//     newUser.password = hash;
//     db('users')
//         .insert(newUser)
//         .then(response => {
//             db('users') 
//                 .where({ id: response })
//                 .then((user) => {
//                     const token = generateToken(user);
//                     res.status(201).send(token);
//                 })
//         }).catch((error) => {res.status(500).json({ error }) })
// })
*/};

//REGISTER version 2
{/*
// server.post('/api/register', (req, res) => {
// //server.post('/api/register', async (req, res) => {
//     const newUser = req.body;
//     const hash = bcrypt.hashSync(newUser.password, 4);
//     newUser.password = hash; 
//         //try {
//             db('users')
//                 .insert(newUser)
//                 .then(function(ids) {
//                     db('users')
//                         .where({ id: ids[0] })
//                         .first()
//                         .then(user => {
//                             const token = generateToken(user);
//                             res.status(201).json(token);
//                   });
//               })
//             //}        
//             .catch (error => {res.status(500).json({error: 'Server Error'});})
// })
*/};
