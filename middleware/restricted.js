const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        const secret = process.env.JWT_SECRET

        jwt.verify(token, secret, (error, decodedToken) => {
            if(error){
                res.status(401).json({message: `tampered token. invalid creds.`})
            }
            else{
                res.decodeJwt = decodedToken;
                next();
            }
        })
    }
    else{
        res.status(400).json({ message: 'No credentials provided' });
    }
}