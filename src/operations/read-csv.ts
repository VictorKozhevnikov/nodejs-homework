import * as fs from 'fs';
import * as csv from 'csv-streamify';
import * as through from 'through2';
import * as stream from 'stream';
import { TransformFunction, TransformCallback } from 'through2';

export function readCsv(filePath: string): void {
    const parser = csv({
        columns: true,
        objectMode: true
    });

    fs.createReadStream(filePath).pipe(parser);

    // emits each line as a buffer or as a string representing an array of fields
    parser.on('data', line => {
        process.stdout.write(JSON.stringify(line, null, 4));
    });
}
