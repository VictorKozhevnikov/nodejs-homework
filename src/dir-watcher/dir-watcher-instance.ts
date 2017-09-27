import { EventEmitter } from 'events';
import { FSWatcher } from 'fs';
import * as path from 'path';

export class DirWatcherInstance {
    public static readonly changed: string = 'dirwatcher:changed';

    public readonly eventEmitter: EventEmitter;

    public constructor(
        private readonly fsWatcher: FSWatcher,
        private readonly basePath: string
    ) {
        this.eventEmitter = new EventEmitter();
        this.fsWatcher.on('change', (eventType: string, fileName: string) => {
            const fullPath = path.resolve(this.basePath, fileName);
            this.eventEmitter.emit(DirWatcherInstance.changed, fullPath);
        });
    }

    public close() {
        this.fsWatcher.close();
    }
}
