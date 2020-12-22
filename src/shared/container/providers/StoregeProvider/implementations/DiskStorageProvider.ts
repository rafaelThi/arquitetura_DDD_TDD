import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStoregeProvider from '../models/IStoregeProvaider';

class DiskStorageProvider implements IStoregeProvider {
  public async saveFile(file:string):Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file:string):Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      console.error(err);
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
