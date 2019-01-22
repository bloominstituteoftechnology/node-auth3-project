const Joi = require('joi');


module.exports={
    user:{
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        department: Joi.string().required()
    }, 
    creds:{
        username:Joi.string().required(),
        password:Joi.string().required()
    }
}