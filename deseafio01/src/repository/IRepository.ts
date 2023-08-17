import { TBody } from "../definitions";

export interface IRepository {
  insert: (table: string, data: TBody) => any;
  update: (table: string, id: string, search: TBody) => any;
  select: (table: string, search: TBody) => any;
  delete: (table: string, id: string) => any;
  checkIDExistence: (table: string, id: string) => boolean;
}
