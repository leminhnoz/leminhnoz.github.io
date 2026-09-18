// Simple static file server for local development
// Usage: node local_server.js [port] [root]

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = parseInt(process.argv[2], 10) || 8000;
const root = process.argv[3] || path.resolve(__dirname);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  try {
    const parsed = url.parse(req.url);
    let pathname = decodeURIComponent(parsed.pathname);
    if (pathname === '/') pathname = '/index.html';
    // Prevent path traversal
    const safePath = path.normalize(path.join(root, pathname));
    if (!safePath.startsWith(root)) {
      res.statusCode = 403;
      res.end('403 Forbidden');
      return;
    }

    if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'no-cache');

    const stat = fs.statSync(safePath);
    res.setHeader('Content-Length', stat.size);

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
    stream.on('error', () => {
      res.statusCode = 500;
      res.end('500');
    });
  } catch (err) {
    res.statusCode = 500;
    res.end('500');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static server running at http://127.0.0.1:${port}/`);
});

// keep process alive
process.on('SIGINT', () => process.exit());
process.on('SIGTERM', () => process.exit());
