import http from 'node:http'
import { json } from './middlewares/json';
import { IincomingMessage } from './definitions';

const server = http.createServer(async (req: IincomingMessage, res) => {
  //const { method, url } = req;

  await json(req, res);
  console.log(req.body)

  return res.end('Hello 8');
})

server.listen(3333);
