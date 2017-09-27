import * as fs from 'fs';

import { DirWatcherInstance } from './dir-watcher-instance';

export class DirWatcher {
    public constructor() {
    }

    public watch(path: string, delay: number = 0): DirWatcherInstance {
        const fsWatcher = fs.watch(path);
        const dirWatcherInstance = new DirWatcherInstance(fsWatcher, path);
        return dirWatcherInstance;
    }
}
