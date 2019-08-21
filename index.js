const server = require("./server");

const port = process.env.PORT || 4444;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
