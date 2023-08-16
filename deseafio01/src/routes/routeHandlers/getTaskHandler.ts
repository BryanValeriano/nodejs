import { ServerResponse } from "http";
import { IincomingMessage, TSearch } from "../../definitions";
import { IRepository } from "../../repository/IRepository";

export function GetTaskHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached GET /tasks endpoint')
  const search: TSearch = req.body;
  const tasks = database.select('tasks', search);
  return res.end(JSON.stringify(tasks));
}
