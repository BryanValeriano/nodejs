import { IncomingMessage, ServerResponse } from "http";

export interface IincomingMessage extends IncomingMessage {
  body?: {
    title?: string,
    description?: string
  } | null
}

export type TRoute = {
  method: string,
  path: string,
  handler: (req: IincomingMessage, res: ServerResponse) => void
}

export type TTask = {
  id: string,
  title: string,
  description: string,
  completed_at: Date,
  created_at: Date,
  updated_at: Date
}
