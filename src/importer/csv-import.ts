import { Observable } from 'rxjs';

export type CsvImport = (filename: string) => Observable<Array<object>>;
