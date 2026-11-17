#!/usr/bin/env node
/*
 * Tiny static server for the ATAP demo. No dependencies: only Node 14+ is needed.
 *
 *   node serve.js            -> http://localhost:8080
 *   PORT=3000 node serve.js  -> http://localhost:3000
 *
 * Serves ./app and falls back to index.html for client-side routes (e.g. /advertisers, /oba/plans).
 */
const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, 'app')
const PORT = Number(process.env.PORT) || 8080

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.map': 'application/json',
}

const send = (res, status, headers, body) => {
  res.writeHead(status, headers)
  res.end(body)
}

const server = http.createServer((req, res) => {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  } catch {
    return send(res, 400, { 'Content-Type': 'text/plain' }, 'Bad request')
  }

  // Resolve inside ROOT only (blocks ../ traversal).
  let filePath = path.normalize(path.join(ROOT, pathname))
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return send(res, 403, { 'Content-Type': 'text/plain' }, 'Forbidden')
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexFile = path.join(filePath, 'index.html')
    filePath = fs.existsSync(indexFile) ? indexFile : path.join(ROOT, 'index.html')
  } else if (!fs.existsSync(filePath)) {
    // Files with an extension that don't exist are real 404s; anything else is an app route.
    if (path.extname(pathname)) return send(res, 404, { 'Content-Type': 'text/plain' }, 'Not found')
    filePath = path.join(ROOT, 'index.html')
  }

  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
  // Hashed bundles can be cached; HTML must always be fresh.
  const cache = filePath.endsWith('.html') ? 'no-cache' : 'public, max-age=3600'
  fs.readFile(filePath, (error, data) => {
    if (error) return send(res, 500, { 'Content-Type': 'text/plain' }, 'Server error')
    send(res, 200, { 'Content-Type': type, 'Cache-Control': cache }, data)
  })
})

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try: PORT=${PORT + 1} node serve.js`)
  } else {
    console.error(error)
  }
  process.exit(1)
})

server.listen(PORT, () => {
  console.log(`\nATAP demo is running: http://localhost:${PORT}\nPress Ctrl+C to stop.\n`)
})
