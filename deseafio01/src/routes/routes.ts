import { TRoute } from "../definitions";
import { GetTaskHandler } from "./routeHandlers/getTaskHandler";
import { PostTaskHandler } from "./routeHandlers/postTaskHandler";

export const routes: TRoute[] = [
  {
    method: 'GET',
    path: '/tasks',
    handler: GetTaskHandler
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: PostTaskHandler
  }
];
