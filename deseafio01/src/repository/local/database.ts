import { IRepository } from "../IRepository";
import fs from 'node:fs/promises';
import path from 'node:path';
const databasePath = path.join(__dirname, './db.json');

export class DataBase implements IRepository {
  #database: { [key: string]: any[] } = {};

  constructor() {
    fs.readFile(databasePath).then(data => {
      this.#database = JSON.parse(data.toString());
    }).catch(() => {
      console.log("catch");
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  public select(table: string, search: any) {
    let data = this.#database[table] ?? [];
    console.log(search)
    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes((value as string).toLowerCase());
        })
      })
    }

    return data;
  }

  public insert(table: string, data: any) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);
    this.#persist();
    return data;
  }
}
