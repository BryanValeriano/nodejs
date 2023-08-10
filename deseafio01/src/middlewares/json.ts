import { ServerResponse } from "http";
import { IincomingMessage } from "../definitions";

export async function json(req: IincomingMessage, res: ServerResponse) {
  const buffers = [];

  for await (const chunk of req) { buffers.push(chunk); }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null;
  }

  //res.setHeader('Content-type', 'application/json');
}
