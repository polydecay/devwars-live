import * as http from 'http';
import { createConnection } from 'typeorm';
import config from './config';
import koa from './koa';
import wsService from './modules/ws/ws.service';
import documentService from './modules/document/document.service';

(async function bootstrap() {
    const server = http.createServer(koa.callback());
    wsService.init(server);

    const database = await createConnection(config.database);
    // await database.synchronize(true);

    await documentService.syncWithEditors();

    server.listen(config.app.port, config.app.host, () => {
        console.log(`\n  Server listening on http://localhost:${config.app.port}\n`);
    });
})();
