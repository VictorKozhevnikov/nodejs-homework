import * as fs from 'fs';
import * as stream from 'stream';
import * as path from 'path';
import { Observable, Subject } from 'rxjs';

const readDir = Observable.bindNodeCallback(fs.readdir);

export function bundleCss(cssPath: string): void {
    const bundleFileName = 'bundle.css';
    const bundlePath = path.join(cssPath, bundleFileName);
    console.log(`bundle path: ${bundlePath}`);

    const readStreams = new Subject<stream.Readable>();
    const readFinished = readStreams
        .flatMap(s => Observable.fromEvent(s, 'end', { once: true }));

    const writeStream = fs.createWriteStream(bundlePath);
    readDir(cssPath)
        .flatMap(files => Observable.of(...files))
        .filter(fileName => fileName !== bundleFileName)
        .map(fileName => path.join(cssPath, fileName))
        .zip(readFinished.startWith(null)).map(([filePath, _]) => filePath)
        .do(filePath => console.log(filePath))
        .map(filePath => fs.createReadStream(filePath))
        .do(s => readStreams.next(s))
        .subscribe(
        s => s.pipe(writeStream, { end: false }),
        e => console.log(e),
        () => writeStream.end());
}
