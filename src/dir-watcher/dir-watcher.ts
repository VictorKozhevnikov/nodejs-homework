import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';
import { IDirWatcher } from './dir-watcher-interface';

export class DirWatcher extends EventEmitter implements IDirWatcher {
    public static readonly changed: string = 'dirwatcher:changed';

    private readonly fsWatcher: fs.FSWatcher;

    public constructor(watchPath: string, delay: number = 0) {
        super();
        this.fsWatcher = fs.watch(watchPath, (eventType: string, fileName: string) => {
            const fullPath = path.resolve(watchPath, fileName);
            this.emit(DirWatcher.changed, fullPath);
        });
    }

    public close() {
        this.fsWatcher.close();
    }
}
