import { TBody } from "../definitions";

export interface IRepository {
  insert: (table: string, data: TBody) => any;
  select: (table: string, search: TBody) => any;
  update: (table: string, id: string, search: TBody) => any;
}
