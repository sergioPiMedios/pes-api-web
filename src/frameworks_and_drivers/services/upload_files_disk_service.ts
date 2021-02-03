import fs from 'fs';
import { idGen } from '../external_interfaces/uuid_factory';
import { Stream } from 'stream';

const DISK_PATH_STORAGE = process.env.DISK_PATH_STORAGE || "/tmp";

class FilesUploadDiskService {

    async uploadFile(
        stream: Stream,
        mimetype: string,
        filename: string
    ): Promise<string[]> {
        return new Promise ( (resolve, reject) => {
            try {
                const splittedFilename = this.separateExtensionFromFilename(filename);
                filename = splittedFilename[0];
                const filenameHash = `${filename}_${idGen()}`;
                const extension = `${splittedFilename[1]}`;
                const destinationPath = `${DISK_PATH_STORAGE}/${filenameHash}.${extension}`;
                const w = fs.createWriteStream(destinationPath);
                w.on('error', (err) => reject(err))
                w.on('close', () => resolve([destinationPath, filenameHash, extension]))
                stream.pipe(w);
            } catch (error) {
                reject(error);
            }
        })
    }

    async unlink(filePath: string) {
        try {
            fs.unlinkSync(filePath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    separateExtensionFromFilename(filename: string) {
        const pattern = /\.([^.]*?)(?=\?|#|$)/;
        const splitted = filename.split(pattern);
        return splitted;
    }
}

export {
    FilesUploadDiskService
}
