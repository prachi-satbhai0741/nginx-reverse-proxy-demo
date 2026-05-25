const http = require('http');

const PORT = 3002;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    service: 'app2',
    message: 'Response from Service 2',
    path: req.url,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`app2 running on port ${PORT}`);
});
