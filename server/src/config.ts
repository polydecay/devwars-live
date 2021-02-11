import fs from 'fs';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

const { env } = process;
env.NODE_ENV = env.NODE_ENV ?? 'development';

const app = {
    port: Number(env.PORT ?? 8000),
    host: env.HOST ?? '0.0.0.0',
    apiKey: env.API_KEY ?? '',
};

const database: ConnectionOptions = {
    type: 'better-sqlite3',
    database: env.DATABASE_PATH ?? ':memory:',
    // HACK: TypeORM is destroying tables even when the models haven't changed.
    // As a workaround only synchronize when the database is missing.
    synchronize: env.DATABASE_PATH ? !fs.existsSync(env.DATABASE_PATH) : false,
    entities: [
        path.resolve(__dirname, 'modules/**/*.model.{ts,js}'),
    ],
};

const devwarsApi = {
    url: env.DEVWARS_API_URL ?? '',
    apiKey: env.DEVWARS_API_KEY ?? '',
};

export default {
    env: env.NODE_ENV,
    app,
    database,
    devwarsApi,
};
