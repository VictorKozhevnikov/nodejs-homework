import { CsvImport } from './csv-import';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import * as parse from 'csv-parse';

const parserOpitons: parse.Options = {
    auto_parse: true
};

const readFile = Observable.bindNodeCallback<string, string, string>(fs.readFile);
const parseCsv = Observable.bindNodeCallback<string, parse.Options, Array<object>>(parse);

export const AsyncCsvImport: CsvImport = (fileName: string) => {
    return readFile(fileName, 'utf8')
        .flatMap(fileText => parseCsv(fileText, parserOpitons));
};
