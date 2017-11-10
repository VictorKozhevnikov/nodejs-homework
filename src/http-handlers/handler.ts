import { IncomingMessage, ServerResponse } from 'http';

export type Handler = (request: IncomingMessage, response: ServerResponse) => void;
