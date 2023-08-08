import fs from 'node:fs/promises'
const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath).then(data => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];
    console.log(search)
    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

    return data;
  }

  insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }
    this.#database[table].push(data);

    this.#persist();
    return data;
  }

  udpate(table, id, data) {
    const rowIndex = this.#database[table].findindex(row => row.id === id);
    if (rowIndex !== -1) {
      this.#database[table][rowIndex] = data;
      this.#persist();
    }
  }

  delete(table, id) {
    const rowindex = this.#database[table].findindex(row => row.id === id);
    if (rowindex !== -1) {
      this.#database[table].splice(rowindex, 1);
      this.#persist();
    }
  }
}
