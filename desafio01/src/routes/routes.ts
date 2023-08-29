import { TRoute } from "../definitions";
import { buildRoutePath } from "../utils/buildRoutePath";
import { CsvUploadHandler } from "./routeHandlers/csvUploadHandler";
import { DeleteTaskHandler } from "./routeHandlers/deleteTaskHandler";
import { GetTaskHandler } from "./routeHandlers/getTaskHandler";
import { PatchTaskHandler } from "./routeHandlers/patchTaskHandler";
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
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: DeleteTaskHandler
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: PatchTaskHandler
  },
  {

    method: 'POST',
    path: buildRoutePath('/csvUpload'),
    handler: CsvUploadHandler
  },
];
