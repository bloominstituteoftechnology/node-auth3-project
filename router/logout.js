const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if(req.session){
    req.session.destroy(err=>{
      if(err){
        res.status(500).json({
          message : " you can do anything"
        })
      }else {
        res.status(200).json({ message: "bye, thanks for visit" })
       }
      });
    }else {
      res.status(200).json({ message: "bye, thanks for visiting"})
    }
  });

module.exports = router;
