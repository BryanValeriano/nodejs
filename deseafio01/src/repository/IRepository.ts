import { TBody } from "../definitions";

export interface IRepository {
  insert: (table: string, data: TBody) => any;
  select: (table: string, search: TBody) => any;
}
