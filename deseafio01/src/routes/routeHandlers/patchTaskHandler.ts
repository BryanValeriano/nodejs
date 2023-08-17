import { ServerResponse } from "http";
import { IincomingMessage } from "../../definitions";
import { IRepository } from "../../repository/IRepository";

export function PatchTaskHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached PATCH /tasks/:id/complete endpoint')
  const { id } = req.params;
  if (!database.checkIDExistence('tasks', id)) {
    return res.writeHead(422).end();
  }
  database.changeComplete('tasks', id)
  return res.writeHead(204).end();
}
