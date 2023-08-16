import { ServerResponse } from "http";
import { IincomingMessage } from "../definitions";

export async function json(req: IincomingMessage, res: ServerResponse) {
  const buffers = [];

  for await (const chunk of req) { buffers.push(chunk); }

  try {
    const body = JSON.parse(Buffer.concat(buffers).toString())
    getAllowedBodyParams(body, req);
  } catch {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');
}

function getAllowedBodyParams(body: any, req: IincomingMessage) {
  if (body) {
    req.body = {};
    if (body.title) {
      req.body.title = body.title;
    }
    if (body.description) {
      req.body.description = body.description;
    }
  }
}
