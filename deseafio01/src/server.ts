import http from 'node:http'
const server = http.createServer((req, res) => {
  return res.end('Hello 8')
})

server.listen(3333);
