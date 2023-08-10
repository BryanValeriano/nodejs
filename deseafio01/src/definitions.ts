import { IncomingMessage } from "http";

export interface IincomingMessage extends IncomingMessage {
  body?: JSON | null
}

export type TRoute = {
  method: string,
  path: string,
  handler: () => void
}

export type TTask = {
  id: number,
  title: string,
  description: string,
  completed_at: Date,
  created_at: Date,
  updated_at: Date
}
