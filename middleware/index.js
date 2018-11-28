const cors = require('cors');
const express = require('express');



module.exports = server => {

    server.use(cors());
    server.use(express.json());

    // server.use(protected());
  };
