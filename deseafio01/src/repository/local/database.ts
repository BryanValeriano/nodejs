import { IRepository } from "../IRepository";
import fs from 'node:fs/promises';
import path from 'node:path';
import { TBody } from "../../definitions";
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

  public select(table: string, search: TBody) {
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

  public insert(table: string, data: TBody) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);
    this.#persist();
    return data;
  }

  public update(table: string, id: string, data: TBody) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex !== -1) {
      if (data && data.title) {
        this.#database[table][rowIndex].title = data.title;
      }
      if (data && data.description) {
        this.#database[table][rowIndex].description = data.description;
      }
      this.#persist();
    }
  }
}
