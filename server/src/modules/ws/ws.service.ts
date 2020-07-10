import * as http from 'http';
import * as io from 'socket.io';
import devWarsService, { UserRole } from '../devwars/devwars.service';
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
            socket.emit('game.state', await this.getGameState());
        });

        socket.on('admin.refresh', async () => {
            if (this.isModerator(socket)) {
                socket.emit('admin.state', await this.getAdminState());
            }
        });

        devWarsService.getUserFromHeaders(socket.handshake.headers).then((user) => {
            if (user) socket.client.user = user;
            socket.emit('init', user);
        });
    }

    private isModerator(socket: io.Socket): boolean {
        const role = socket.client.user?.role;
        return role === UserRole.MODERATOR || role === UserRole.ADMIN;
    }

    private async getGameState() {
        return gameService.getGame().catch(() => null);
    }

    private async getAdminState() {
        const applications = await applicationService.getAll();
        return { applications };
    }

    async updateGameState() {
        this.server.emit('game.state', await this.getGameState());
    }

    async updateAdminState() {
        const adminState = await this.getAdminState();
        Object.values(this.server.sockets.sockets)
            .filter(this.isModerator)
            .forEach(socket => socket.emit('admin.state', adminState));
    }
}

export default new WSService();
