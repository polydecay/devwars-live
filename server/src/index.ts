import http from 'http';
import { DataSource } from 'typeorm';
import { createHttpTerminator } from 'http-terminator';
import config from './config';
import koa from './koa';
import wsService from './modules/ws/ws.service';
import documentService from './modules/document/document.service';

(async function bootstrap() {
    const server = http.createServer(koa.callback());
    wsService.init(server);

    const httpTerminator = createHttpTerminator({ server, gracefulTerminationTimeout: 2000 });

    const dataSource = new DataSource(config.dataSource);
    await dataSource.initialize();

    await documentService.syncWithEditors();

    server.listen(config.app.port, config.app.host, () => {
        console.log(`\n  Server listening on http://localhost:${config.app.port}\n`);
    });

    async function handleShutdown() {
        // Give the server 2.5 seconds to gracefully shutdown.
        await Promise.race([
            httpTerminator.terminate(),
            new Promise(r => setTimeout(r, 2500)),
        ]);

        await dataSource.destroy();

        console.log('  Server shutdown gracefully');
        process.exit(0);
    }

    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);
    process.on('SIGABRT', handleShutdown);
}());
