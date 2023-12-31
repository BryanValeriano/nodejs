import { ServerResponse } from "http";
import { IincomingMessage, TTask } from "../../definitions";
import { randomUUID } from "crypto";
import { IRepository } from "../../repository/IRepository";

export function PostTaskHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached POST /tasks endpoint')
  if (req.body && req.body.title && req.body.description) {
    const task: TTask = {
      id: randomUUID(),
      title: req?.body?.title,
      description: req?.body?.description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }
    database.insert('tasks', task);
    return res.writeHead(201).end();
  }
  return res.writeHead(422).end();
}

