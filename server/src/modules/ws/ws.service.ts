import * as http from 'http';
import * as io from 'socket.io';
import gameService from '../game/game.service';
import applicationService from '../application/application.service';

class WSService {
    server!: io.Server;

    init(server: http.Server) {
        this.server = io(server, { transports: ['websocket'] });
        this.server.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: io.Socket) {
        console.log('WS.Connect:', socket.id);

        socket.on('disconnect', () => {
            console.log('WS.Disconnect:', socket.id);
        });

        socket.on('game.refresh', async () => {
            const game = await gameService.getGame()
                .catch(() => null);

            socket.emit('game.state', game);
        });

        socket.on('admin.refresh', async () => {
            const applications = await applicationService.getAll();
            socket.emit('admin.state', { applications });
        });
    }

    async updateGame() {
        const game = await gameService.getGame()
            .catch(() => null);

        this.server.emit('game.state', game);
    }

    async updateAdmin() {
        const applications = await applicationService.getAll();
        this.server.emit('admin.state', { applications });
    }
}

export default new WSService();
