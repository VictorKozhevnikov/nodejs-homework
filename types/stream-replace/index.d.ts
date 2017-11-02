import stream = require('stream');

declare function replace(pattern: string, newString: string): stream.Transform;

export = replace;
