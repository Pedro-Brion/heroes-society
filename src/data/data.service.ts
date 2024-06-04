import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';

@Injectable()
export class DataService {
  /**
   * Write data to file async
   * @param {string} fileName The file to write
   * @param {object} data Data to write
   */
  async write(fileName: string, data: JSON | object | JSON[] | object[]) {
    const content = JSON.stringify({data}, null, 2);
    try {
      await writeFile(`./storage/${fileName}.json`, content);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Read data from file async
   * @param {string} fileName The file to read
   */
  async read(fileName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const contents = await readFile(`./storage/${fileName}.json`, {encoding:'utf-8'});
        resolve(JSON.parse(contents).data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
