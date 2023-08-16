import { ServerResponse } from "http";
import { IincomingMessage } from "../../definitions";

export function GetTaskHandler(req: IincomingMessage, res: ServerResponse) {
  console.log('Reached GET /tasks endpoint')
  res.writeHead(200).end();
  return;
}
