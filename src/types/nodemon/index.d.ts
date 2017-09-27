declare module 'nodemon' {
    import { EventEmitter } from 'events';

    interface NodemonConfig {
        restartable?: 'rs';
        ignore?: Array<string>;
        verbose?: boolean;
        // execMap: {
        //     "js": "node --harmony"
        // },
        watch?: Array<string>;
        ext?: string;
        script?: string;
    }

    const nodemon: (config: NodemonConfig) => EventEmitter;
    // function nodemon(config: NodemonConfig): EventEmitter;

    export = nodemon;
}
