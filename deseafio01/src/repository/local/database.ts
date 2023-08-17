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

  delete(table: string, id: string) {
    const rowindex = this.#database[table].findIndex(row => row.id === id);
    if (rowindex !== -1) {
      this.#database[table].splice(rowindex, 1);
      this.#persist()
    }
  }

  public update(table: string, id: string, data: TBody) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex !== -1) {
      if (data) {
        if (data.title) {
          this.#database[table][rowIndex].title = data.title;
        }
        if (data.description) {
          this.#database[table][rowIndex].description = data.description;
        }
        this.#database[table][rowIndex].updated_at = new Date();
        this.#persist();
      }
    }
  }

  public changeComplete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);
    if (rowIndex !== -1) {
      const completed = this.#database[table][rowIndex].completed_at;
      this.#database[table][rowIndex].completed_at = (completed ? null : new Date())
      this.#persist();
    }
  }


  public checkIDExistence(table: string, id: string): boolean {
    return (this.#database[table].findIndex(row => row.id === id) !== -1);
  }
}
