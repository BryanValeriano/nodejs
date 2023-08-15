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

  public insert(table: string, data: any) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);
    this.#persist();
    return data;
  }
}
