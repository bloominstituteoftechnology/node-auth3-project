const express = require('express');
const router = express.Router();

router.get('/', restrictedmd, (req, res) => {
    res.send("You successfully access Mds. Because, You are cool");
});




function restrictedmd(req, res, next) {
  try {
    if(req && req.session && req.session.user){
      next();
    }else{
      res.status(401).json({message : "Please log in first to access me"})
    }   
  } catch (error) {
    res.status(500).json({message: 'you broke the it'})
  }
}


module.exports = router;