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
    await documentService.syncWithEditors();

    server.listen(config.app.port, config.app.host, () => {
        console.log(`\n  Server listening on http://localhost:${config.app.port}\n`);
    });

    function handleShutdown() {
        server.close(async () => {
            await database.close();

            console.log('  Server shutdown gracefully');
            process.exit(0);
        });
    }

    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);
    process.on('SIGABRT', handleShutdown);
})();
