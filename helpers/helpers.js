const express = require('express');
const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

module.exports={
    addUser: (user)=>{
        return db('users').insert(user)
    },

    userById: (id)=>{
        return db('users').where('id', id).fisrt()
    }

}