import * as nodemon from 'nodemon';
import { EventEmitter } from 'eventemitter3';

import { DirWatcherInstance } from './dir-watcher-instance';

export class DirWatcher {
    private static readonly nodemonConfig = {};

    public constructor() {
    }

    public watch(path: string, delay: number = 0): void {
        const eventEmitter = nodemon({
            watch: [path],
            script: './dist/dir-watcher/dummy-worker.js',
            ext: 'csv'
        })
            .on('start', () => {
                console.log('---- start');
            });
    }
}
