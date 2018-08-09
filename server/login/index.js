const express = require('express');
const router = express.Router();
const db = require('../data/helpers/index');
const bcrypt = require('bcryptjs');
const mw = require('../data/middleware/index');

// routers
const userRouter = require('../users/index');

// mount routers
router.use('/users', userRouter);

// register
router.post('/register', async (req, res) => {
    try {
        const newRecord = { ...req.body };
        const hash = bcrypt.hashSync(newRecord.password, 14);
        newRecord.password = hash;
        const record = await db.add(newRecord);
        const getRecord = await db.get(newRecord);
        const token = mw.genToken(getRecord);

        // res.status(200).json({message: 'Register Successful'});
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const newRecord = { ...req.body };
        const record = await db.get(newRecord);
        
        if(record.username && bcrypt.compareSync(newRecord.password, record.password)) {
            const token = mw.genToken(record);

            // res.status(200).json({message: 'Login Successful'});
            res.status(200).json({token});
        } else {
            res.status(401).json({message: 'Incorrect Credentials'});
        }

    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

// logout
router.get('/logout', async (req, res) => {
    try {
        res.status(200).json({message: 'Logout Successful'});
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

module.exports = router;
