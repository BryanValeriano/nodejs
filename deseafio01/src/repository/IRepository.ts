export interface IRepository {
  insert: (table: string, data: any) => any;
  select: (table: string, search: any) => any;
}
