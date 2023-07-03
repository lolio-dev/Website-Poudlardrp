import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, promises as fs } from 'fs';

@Injectable()
export class FilesService {
  constructor() {}

  private path = './src/assets/';

  async upload(file: any, path: string): Promise<boolean> {
    const buffer = Buffer.from(file.buffer);
    await fs.mkdir(path, {recursive: true});

    createWriteStream(`${path}/${file.originalname}`).write(buffer);
    return true;
  }

  isFileExisting(fileName): boolean {
    const path = this.path + fileName;

    return existsSync(path);
  }
}
