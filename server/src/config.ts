import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

const { env } = process;
env.NODE_ENV = env.NODE_ENV ?? 'development';

const app = {
    port: Number(env.PORT ?? 8000),
    host: env.HOST ?? '0.0.0.0',
    apiKey: env.API_KEY ?? '',
};

const database: ConnectionOptions = {
    type: 'sqlite',
    database: env.DATABASE_PATH ?? ':memory:',
    synchronize: true,
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
