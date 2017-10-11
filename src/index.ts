import * as minimist from 'minimist';
import {
    inputOutput,
    transformFile,
    readCsv,
    transformCsv,
    bundleCss
} from './operations';

const minimistOptions: minimist.Opts = {
    alias: {
        action: 'a',
        file: 'f',
        help: 'h',
        path: 'p'
    }
};

const slicedArgs = process.argv.slice(2);
const argv = minimist(slicedArgs, minimistOptions);

const action = argv.action;
const file = argv.file;
const path = argv.path;

if (slicedArgs.length === 0 || argv.help) {
    printUsageInfo();
} else {
    switch (action) {
        case 'input-output':
            inputOutput(file);
            break;
        case 'transform-file':
            transformFile(file);
            break;
        case 'read-csv':
            readCsv(file);
            break;
        case 'transform-csv':
            transformCsv(file);
            break;
        case 'bundle-css':
            bundleCss(path);
            break;
        default:
            break;
    }
}

function printUsageInfo() {
    console.log(`
node ./dist options

options
    -h, --help
    -a="action name", --action="action name"
    -f="file path", --file="file path"
    -p="path", --path="path"

actions
    input-output: pipe the given file to process.stdout
    transform-file: upper-case data on process.stdout
    read-csv: convert file from csvto jsonand output data to process.stdout
    transform-csv: convert file from csvto jsonand output data to a result file with the same name but .json extension
    bundle-css: bundle css files from <path> to <path>/bundle.css
    `);
}
