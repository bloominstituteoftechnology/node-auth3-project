const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const cors=require('cors');

module.exports=server=>{
    server.use(morgan('dev')).use(helmet()).use(cors()).use(express.json());
}