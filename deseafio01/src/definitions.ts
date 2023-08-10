import { IncomingMessage } from "http";

export interface IincomingMessage extends IncomingMessage {
  body?: JSON | null
}

export type TRoute = {
  method: string,
  path: string,
  handler: () => void
}
