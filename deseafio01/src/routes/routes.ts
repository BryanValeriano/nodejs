import { TRoute } from "../definitions";
import { buildRoutePath } from "../utils/buildRoutePath";
import { GetTaskHandler } from "./routeHandlers/getTaskHandler";
import { PostTaskHandler } from "./routeHandlers/postTaskHandler";
import { UpdateTaskHandler } from "./routeHandlers/updateTaskHandler";

export const routes: TRoute[] = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: GetTaskHandler
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: PostTaskHandler
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: UpdateTaskHandler
  }
];
