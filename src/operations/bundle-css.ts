import * as fs from 'fs';
import * as stream from 'stream';
import * as path from 'path';
import { Observable, Subject } from 'rxjs';

const readDir = Observable.bindNodeCallback(fs.readdir);

export function bundleCss(cssPath: string): void {
    const bundleFileName = 'bundle.css';
    const bundlePath = path.join(cssPath, bundleFileName);
    console.log(`bundle path: ${bundlePath}`);

    // a stream of 'end' events. need to start reading next file only when previous has been read
    const readStreams = new Subject<stream.Readable>();
    const readFinished = readStreams
        .flatMap(s => Observable.fromEvent(s, 'end', { once: true }));

    // create the write stream
    const writeStream = fs.createWriteStream(bundlePath);

    readDir(cssPath)
        // format file paths
        .flatMap(files => Observable.of(...files))
        .filter(fileName => fileName !== bundleFileName)
        .map(fileName => path.join(cssPath, fileName))

        // append null. This will be the end marker
        .concat(Observable.of(null))

        // only dispatch new filepath when read is finished
        .zip(readFinished.startWith(null)).map(([filePath, _]) => filePath)
        // log the file path
        .do(filePath => filePath ? console.log(filePath) : null)

        // create a read stream (or an empty observable in the end)
        .flatMap<string | null, stream.Readable>(filePath => filePath
            ? Observable.of(fs.createReadStream(filePath))
            : Observable.empty()
        )
        // push the stream to another pipe.
        .do(s => readStreams.next(s))

        // pipe to the write stream, when finished close it
        .subscribe(
        s => s.pipe(writeStream, { end: false }),
        e => console.log(e),
        () => writeStream.end());
}
