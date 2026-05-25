const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    service: 'app1',
    message: 'Response from Service 1',
    path: req.url,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`app1 running on port ${PORT}`);
});
