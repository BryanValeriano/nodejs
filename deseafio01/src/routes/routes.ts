import { TRoute } from "../definitions";
import { PostTaskHandler } from "./routeHandlers/PostTaskHandler";

export const routes: TRoute[] = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      console.log('Reached GET /tasks endpoint')
      res.writeHead(200).end();
      return;
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: PostTaskHandler
  }
];
