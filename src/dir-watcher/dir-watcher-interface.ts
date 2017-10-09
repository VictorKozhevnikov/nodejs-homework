import { EventEmitter } from 'events';

export interface IDirWatcher extends EventEmitter {
    close(): void;
}
