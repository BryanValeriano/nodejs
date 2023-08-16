import { IncomingMessage, ServerResponse } from "http";
import { IRepository } from "./repository/IRepository";

export interface IincomingMessage extends IncomingMessage {
  body?: {
    title?: string,
    description?: string
  } | null
}

export type TRoute = {
  method: string,
  path: string,
  handler: (req: IincomingMessage, res: ServerResponse, database: IRepository) => void
}

export type TTask = {
  id: string,
  title: string,
  description: string,
  completed_at: Date,
  created_at: Date,
  updated_at: Date
}
