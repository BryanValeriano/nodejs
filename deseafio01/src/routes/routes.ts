import { TRoute } from "../definitions";
import { PostTaskHandler } from "./routeHandlers/PostTaskHandler";

export const routes: TRoute[] = [
  {
    method: 'GET',
    path: '/tasks',
    handler: () => {
      console.log('Reached GET /tasks endpoint')
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: PostTaskHandler
  }
];
