const router= require('express').Router();
const bcrypt= require('bcryptjs');
const Users= require('./users/users-model')


//register: /api/register
router.post('/register', (req, res) => {
    let user= req.body;
    const hash= bcrypt.hashSync(user.password, 10);
    user.password= hash;

    Users.add(user)
    .then(saved => {
        const token = generatedToken(saved) 
        res.status(201).json({
            user:saved,
            token //token generated
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token= generateToken(user); //generates token
            console.log('token:', token); //encrypted token
        res.status(200).json({
            message: 'Welcome!'
        })
        } else {
            res.status(401).json({
                message: 'You shall not pass!'
            })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })

})

function generateToken(user) {
    const payload= {
        sub: user.id,
        username: user.username,
        department: user.department
    }; //payload


    const options = {
        expiresIn: '1d'
    } //expiration

    return jwt.sign(payload, process.env.JWT_SECRET); //verify signature- secret
};




module.exports= router;