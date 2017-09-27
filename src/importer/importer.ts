import { DirWatcherInstance } from '../dir-watcher';
import { CsvImport } from './csv-import';
import * as fs from 'fs';
import { Subject, Observable } from 'rxjs';

export class Importer {
    private readonly unsubscribe: Subject<void>;
    private readonly fileNamesSubject = new Subject<string>();

    public constructor(
        private readonly dirWatcherInstance: DirWatcherInstance,
        private readonly importStrategy: CsvImport
    ) {
        this.unsubscribe = new Subject<void>();

        Observable
            .fromEvent(dirWatcherInstance.eventEmitter, DirWatcherInstance.changed)
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

    public StopListen(): void {
        this.dirWatcherInstance.close();
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
