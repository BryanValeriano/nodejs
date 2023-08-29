import { ServerResponse } from "http";
import { IincomingMessage } from "../../definitions";
import { IRepository } from "../../repository/IRepository";
import { testCsvUpload } from "../../csvUpload/csvUploader";

export function CsvUploadHandler(req: IincomingMessage, res: ServerResponse, database: IRepository) {
  console.log('Reached POST /csvUpload endpoint')
  testCsvUpload();
  return res.writeHead(201).end();
}

