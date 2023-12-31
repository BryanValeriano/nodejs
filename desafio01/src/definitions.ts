import { IncomingMessage, ServerResponse } from "http";
import { IRepository } from "./repository/IRepository";

export type TBody = {
  title?: string,
  description?: string
} | null | undefined;

export interface IincomingMessage extends IncomingMessage {
  body?: TBody,
  query?: any,
  params?: any
}

export type TRoute = {
  method: string,
  path: RegExp,
  handler: (req: IincomingMessage, res: ServerResponse, database: IRepository) => void
}

export type TTask = {
  id: string,
  title: string,
  description: string,
  completed_at: Date | null,
  created_at: Date,
  updated_at: Date
}
