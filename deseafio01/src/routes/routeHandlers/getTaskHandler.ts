import { ServerResponse } from "http";
import { IincomingMessage } from "../../definitions";
import { IRepository } from "../../repository/IRepository";

type TSearch = {
  title?: string,
  description?: string
} | null | undefined;

export function GetTaskHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached GET /tasks endpoint')
  const search: TSearch = req.body;
  const tasks = database.select('tasks', search);
  return res.end(JSON.stringify(tasks));
}
