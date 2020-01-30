const jwt = require ('jsonwebtoken');


module.exports = (req, res, next) =>{
   const token = req.headers.authorization;

   if (token){
        jwt.verify(token,process.env.JWT_SECRET || 'oaijdjoijgoija', (err, decodedToken) =>{
            if(err){
                res.status(401).json({message: 'token not valid'})
            } else {
                req.user = decodedToken;
                next();
            }
        })
   } else{
       res.status(400).json({ message: "no auth token provided"});
   }
    // if (req.session && req.session.user){
    //     next();
    // } else {
    //     res.status(401) .json({message: 'unauthorized access'});
    // }
}
    