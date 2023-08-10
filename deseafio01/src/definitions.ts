import { IncomingMessage } from "http";

export interface IincomingMessage extends IncomingMessage {
  body?: JSON | null
}
