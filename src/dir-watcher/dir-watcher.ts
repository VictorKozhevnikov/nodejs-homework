import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';

export class DirWatcher extends EventEmitter {
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
