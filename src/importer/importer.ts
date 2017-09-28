import { DirWatcher } from '../dir-watcher';
import { CsvImport } from './csv-import';
import * as fs from 'fs';
import { Subject, Observable } from 'rxjs';

export class Importer extends DirWatcher {
    private readonly unsubscribe: Subject<void>;
    private readonly fileNamesSubject = new Subject<string>();

    public constructor(
        path: string,
        private readonly importStrategy: CsvImport
    ) {
        super(path);
        this.unsubscribe = new Subject<void>();

        Observable
            .fromEvent(this, DirWatcher.changed)
            .map(filename => filename as string)
            // .do(fileName => console.log(fileName))
            .concatMap(fileName => this
                .importStrategy(fileName)
                .catch(() => Observable.empty())
            )
            .takeUntil(this.unsubscribe)
            .subscribe(data => {
                console.log(data);
            });
    }

    public close(): void {
        super.close();
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
