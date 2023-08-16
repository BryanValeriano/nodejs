import { ServerResponse } from "http";
import { IincomingMessage } from "../../definitions";
import { IRepository } from "../../repository/IRepository";

export function UpdateTaskHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached PUT /tasks/:id endpoint')
  return res.writeHead(201).end();
  //return res.writeHead(422).end();
}
