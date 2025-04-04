import fs from 'node:fs'
import path from 'node:path'
import uploadConfing from '../configs/upload'

export class DiskStorage {
  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadConfing.TMP_FOLDER, file)
    const destinationPath = path.resolve(uploadConfing.UPLOADS_FOLDER, file)

    try {
      await fs.promises.access(tmpPath)
    } catch (error) {
      throw new Error(`Arquivo não encontrado: ${tmpPath}`)
    }

    await fs.promises.mkdir(uploadConfing.UPLOADS_FOLDER, { recursive: true })
    await fs.promises.rename(tmpPath, destinationPath)

    return file
  }

  async deleteFile(file: string, type: 'tmp' | 'upload') {
    const pathFile =
      type === 'tmp' ? uploadConfing.TMP_FOLDER : uploadConfing.UPLOADS_FOLDER

    const filePath = path.resolve(pathFile, file)

    try {
      await fs.promises.stat(filePath)
    } catch {}

    await fs.promises.unlink(filePath)
  }
}
