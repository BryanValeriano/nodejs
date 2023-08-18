import http, { ServerResponse } from 'node:http'
import { json } from './middlewares/json';
import { IincomingMessage, TRoute } from './definitions';
import { routes } from './routes/routes';
import { DataBase } from './repository/local/database';
import { extractQueryParams } from './utils/extractQueryParams';
const database = new DataBase();

const server = http.createServer(async (req: IincomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route: TRoute) => {
    return route.method === method && route.path.test(url ? url : "");
  })

  if (route) {
    req.url ??= "";
    const routeParams = req?.url.match(route.path);

    if (routeParams?.groups) {
      routeParams.groups.query ??= "";
      const { query, ...params } = routeParams.groups;
      req.params = params;
      req.query = query ? extractQueryParams(query) : {};
    }

    return route.handler(req, res, database);
  }

  return res.end('Hello 8');
})

server.listen(3333);
