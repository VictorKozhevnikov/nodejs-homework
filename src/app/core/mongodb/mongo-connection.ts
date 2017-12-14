import * as mongoose from 'mongoose';

const mongoUrl = 'mongodb://localhost:27017/nodejsHomework';

export const mongoConnection = mongoose.createConnection(mongoUrl);
