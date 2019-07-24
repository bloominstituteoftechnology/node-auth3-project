const server = require('./api/server');

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Hi, what's going on, dude? ${port}`);
});
