import { DirWatcher } from './dir-watcher';
import { Importer, IIMporter, CsvImport, SyncCsvImport, AsyncCsvImport } from './importer';

let importStrategy: CsvImport | null = null;

switch (process.argv.splice(2, 1)[0]) {
    case 'sync':
        importStrategy = SyncCsvImport;
        break;
    case 'async':
        importStrategy = AsyncCsvImport;
        break;
    default:
        console.log('Please specify sync or async import strategy');
        break;
}

if (importStrategy) {
    const importer: IIMporter = new Importer('./data', importStrategy);

    console.log('Watching the ./data folder');
}
