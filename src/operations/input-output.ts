import * as fs from 'fs';

export function inputOutput(filePath: string): void {
    fs.createReadStream(filePath).pipe(process.stdout);
}
