import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

const { env } = process;
env.NODE_ENV = env.NODE_ENV ?? 'development';

const app = {
    port: Number(env.PORT ?? 8000),
    host: env.HOST ?? '0.0.0.0',
};

const database: ConnectionOptions = {
    type: 'sqlite',
    database: env.DB_PATH ?? ':memory:',
    entities: [
        path.resolve(__dirname, 'modules/**/*.model.{ts,js}'),
    ],
};

const devwarsApi = {
    url: env.DEVWARS_API_URL ?? '',
    token: env.DEVWARS_API_TOKEN ?? '',
};

export default {
    env: env.NODE_ENV,
    app,
    database,
    devwarsApi,
};
