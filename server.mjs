import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('./public/', import.meta.url));
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function safePath(urlPath) {
  const pathname = decodeURIComponent((urlPath || '/').split('?')[0]);
  const candidate = pathname === '/' ? '/index.html' : pathname;
  const cleaned = normalize(candidate).replace(/^([.][.][/\\])+/, '');
  return join(ROOT, cleaned);
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'content-type': 'text/plain; charset=utf-8' });
    return res.end('Method not allowed');
  }

  try {
    let filePath = safePath(req.url);
    if (!filePath.startsWith(ROOT)) throw new Error('Unsafe path');

    let fileStat;
    try {
      fileStat = await stat(filePath);
    } catch {
      filePath = join(ROOT, 'index.html');
      fileStat = await stat(filePath);
    }

    if (fileStat.isDirectory()) filePath = join(filePath, 'index.html');
    const body = await readFile(filePath);
    const type = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';

    res.writeHead(200, {
      'content-type': type,
      'cache-control': extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=3600'
    });
    if (req.method === 'HEAD') return res.end();
    res.end(body);
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('HiddenVillage could not load this resource.');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`HiddenVillage is listening on port ${PORT}`);
});
