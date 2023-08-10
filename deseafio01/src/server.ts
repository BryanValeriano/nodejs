import http from 'node:http'
import { json } from './middlewares/json';
import { IincomingMessage, TRoute } from './definitions';
import { routes } from './routes';

const server = http.createServer(async (req: IincomingMessage, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route: TRoute) => {
    return route.method === method && route.path == url;
  })

  console.log("route: \n", route)
  console.log("body: \n", req.body)

  return res.end('Hello 8');
})

server.listen(3333);
