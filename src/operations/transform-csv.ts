import * as fs from 'fs';
import * as csv from 'csv-streamify';
import * as through from 'through2';
import * as stream from 'stream';
import { TransformFunction, TransformCallback } from 'through2';

export function transformCsv(filePath: string): void {
    const parser = csv({
        columns: true,
        objectMode: true
    });
    const jsonFilePath = filePath.substring(0, filePath.lastIndexOf('.')) + '.json';
    const jsonStream = fs.createWriteStream(jsonFilePath);

    fs.createReadStream(filePath).pipe(parser);

    // emits each line as a buffer or as a string representing an array of fields
    parser.on('data', line => {
        jsonStream.write(JSON.stringify(line, null, 4));
    });
}
