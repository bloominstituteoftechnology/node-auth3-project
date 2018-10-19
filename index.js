const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());
server.use(cors());

const jwtSct = process.env.JWT_SCT || 'add a secret';

// function checkDept(dept) {
//     return function(req, res, next) {
//         if (req.decodedToken && req.decodedToken.usrs_dpt.includes(dept)) {
//             next();
//         } else {
//             res.status(403).json({ message: 'Wrong department' });
//         };
//     };
// };

function generateToken(usridv) {
    const jwtPyd = {
        ...usridv,
        height: '6\'0\"',
        weight: '200lbs',
    };
    const jwtOpt = {
        expiresIn: '1m',
    }

    return jwt.sign(jwtPyd, jwtSct, jwtOpt);
}

function protected (req, res, next) {
    const tkn = req.headers.authorization;
    if (tkn) {
        jwt.verify(tkn, jwtSct, (err, dcdtkn) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                req.decodedToken = dcdtkn;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token found' });
    }
}

server.get('/api/usrs', protected, (req, res) => {
    const usridv = req.decodedToken;

    db('usrs')
        .where('usrs_nme', usridv.usrs_nme)
        .first()
        .then(usridv => {
            db('usrs')
                .where('usrs_dpt', usridv.usrs_dpt)
                .select('id', 'usrs_nme', 'usrs_pwd')
                .then(usrs => {
                    console.log(usrs);
                    res.status(200).json({ usrs });
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

server.post('/api/rgtr', (req, res) => {
    const crds = req.body;
    
    const hash = bcrypt.hashSync(crds.usrs_pwd, 14);
    crds.usrs_pwd = hash;

    db('usrs')
        .insert(crds)
        .then(ids => {
        const id = ids[0];
        db('usrs')
            .where({ id })
            .first()
            .then(usridv => {
                const tkn = generateToken(usridv);
                res.status(201).json({ nwId: usridv.id, tkn });
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/api/lgn', (req, res) => {
    const crds = req.body;

    db('usrs')
        .where({ usrs_nme: crds.usrs_nme })
        .first()
        .then(usridv => {
            if (usridv && bcrypt.compareSync(crds.usrs_pwd, usridv.usrs_pwd)) {
                const tkn = generateToken(usridv);
                res.status(200).json({ welcome: usridv.usrs_nme, tkn });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('\nRunning on port 5000\n'));