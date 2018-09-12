const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const restrictedRoutes = require('./routes/restrictedRoutes');

const server = express();
const mw = require('./middleware');

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

server.use('/api', authRoutes);
server.use('/api/restricted', mw.isLoggedIn, restrictedRoutes);

server.use(mw.errorHandler);

server.get('/', (req, res) => {
  res.send('ya made it mon');
});

server.listen(7000, () => console.log('ya made it to port 7000 mon'));
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
