import { fileURLToPath } from 'url'
import { dirname } from 'path'
import MongoStore from "connect-mongo";
import config from './config/credentials.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname


/// Session

export const MongoStoreInstance = {

    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        dbName: config.DB_NAME,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },

        ttl: 200

    }),
    secret: config.MONGO_SECRET,
    resave: true,
    saveUninitialized: false


}