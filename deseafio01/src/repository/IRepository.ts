import { TSearch } from "../definitions";

export interface IRepository {
  insert: (table: string, data: any) => any;
  select: (table: string, search: TSearch) => any;
}
