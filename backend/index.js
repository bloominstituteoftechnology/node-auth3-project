const express = require('express');
const cors = require('cors');

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');

const server = express();
const PORT = 5000;

server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('API is Active');
});

server.listen(PORT, () => console.log(`\nServer running on port ${PORT}\n`));