const http = require('http');

const PORT = 3003;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    service: 'app3',
    message: 'Response from Service 3',
    path: req.url,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`app3 running on port ${PORT}`);
});
