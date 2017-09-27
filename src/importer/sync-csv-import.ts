import { CsvImport } from './csv-import';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { Options as ParserOpitons } from 'csv-parse';
import parse = require('csv-parse/lib/sync');

const parserOpitons: ParserOpitons = {
    auto_parse: true
};

export const SyncCsvImport: CsvImport = (fileName: string) => {
    try {
        const fileContents: string = fs.readFileSync(fileName, 'utf8');
        const csvData = parse(fileContents, parserOpitons);
        return Observable.of(csvData);
    } catch {
        // just throw something
        return Observable.throw(null);
    }
};
