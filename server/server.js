const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')

const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const User = require('./users/User');
const userRouter = require('./users/userRoutes');
const authRouter = require('./auth/authRoutes')

const corsOption = {
  origin: 'http://localhost:3000',
  credential: true,
}

const server = express();

setupMiddleware(server);
setupRoutes(server);

server.use(express.json());
server.use(cors({corsOption}));
server.use(helmet());

db.connectTo('authii')
  .then(() => {
    console.log('\n... API Connected to authii Database ...\n');
    server.listen(5500, () =>
      console.log('\n=== API running on port 5500 ===\n')
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });
