const http = require('http');
const port = process.env.PORT || 3020;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello my name is soham and this is my Node project!\n'
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on the http://localhost:${port}/`);
});
