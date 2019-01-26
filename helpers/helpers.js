const express = require('express');
const dbConfig = require('../knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);

module.exports={
    addUser: (user)=>{
        return db('users').insert(user)
    },

    userById: (id)=>{
        return db('users').where('id', id).first()
    },
    login: (user)=>{
        return db('users').where('username', user.username).first();
    },
    grabUserInfo: ()=>{
        return db('users').select('id','username', 'department')
    }

}