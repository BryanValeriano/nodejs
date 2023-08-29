import { ServerResponse } from "http";
import { IincomingMessage } from "../../definitions";
import { IRepository } from "../../repository/IRepository";

export function DeleteTaskHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached PUT /tasks/:id endpoint')
  const { id } = req.params;
  if (!database.checkIDExistence('tasks', id)) {
    return res.writeHead(422).end();
  }
  database.delete('tasks', id)
  return res.writeHead(204).end();
}
