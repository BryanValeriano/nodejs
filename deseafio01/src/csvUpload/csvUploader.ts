import path from 'node:path';
import fs from 'node:fs/promises';
import { parse } from 'csv-parse';
import axios from 'axios';

export async function testCsvUpload() {
  const csvFilePath = path.join(__dirname, './testCsvUpload.csv');
  const content = await fs.readFile(csvFilePath);
  const records = parse(content, { bom: true });
  let count = 0;
  for await (const record of records) {
    if (count == 0) {
      count++;
      continue;
    }
    const postData = {
      title: record[0],
      description: record[1],
    }
    axios.post('http://localhost:3333/tasks', postData)
  }
}
