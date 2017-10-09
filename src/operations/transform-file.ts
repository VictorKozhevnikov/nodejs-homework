import * as fs from 'fs';
import * as through from 'through2';
import * as stream from 'stream';
import { TransformFunction, TransformCallback } from 'through2';

function uppercase(this: stream.Transform, chunk: any, encoding: string, callback: TransformCallback) {
    const chunkBuffer: Buffer = chunk as Buffer;
    const chunkString: string = chunkBuffer.toString('utf8');
    this.push(chunkString.toUpperCase());
}

export function transformFile(filePath: string): void {
    fs
        .createReadStream(filePath)
        .pipe(through(uppercase))
        .pipe(process.stdout);
}
