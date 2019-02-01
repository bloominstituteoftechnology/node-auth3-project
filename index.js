const express = require('express');
const server = express();
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs')

const db = require('./database/dbHelpers');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Hello, world!!`)
})

server.post('/api/register', (req, res) => {
    const user = req.body;
    console.log(`session`, req.session)
    user.password = bcrypt.hashSync(user.password, 14)
    db.insert(user)
    .then(ids => {
        res.status(500).send(`Nope, wrong`)
    })

})

server.listen(9876, () => {console.log(`Hello, world!`)})