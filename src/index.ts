import * as minimist from 'minimist';
import {
    inputOutput,
    transformFile
} from './operations';

const minimistOptions: minimist.Opts = {
    alias: {
        action: 'a',
        file: 'f',
        help: 'h'
    }
};

const argv = minimist(process.argv.slice(2), minimistOptions);

console.dir(argv);

const action = argv.action;
const file = argv.file;

switch (action) {
    case 'input-output':
        inputOutput(file);
        break;
    case 'transform-file':
        transformFile(file);
        break;
    default:
        break;
}
