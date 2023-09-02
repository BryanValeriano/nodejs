// eslint-disable-next-line
import { Knex } from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string,
      ownerId: string,
      ownerId: string,
      title: string,
      description: string,
      date: Date,
      isDiet: boolean
    }
  }
}
