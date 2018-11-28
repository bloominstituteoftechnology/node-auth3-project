const server = require('./server');
const port = 5000;
server.listen(port, () => 
  process.stdout.write(
    `\n\tListening on port: ${port}\n`
  )
)