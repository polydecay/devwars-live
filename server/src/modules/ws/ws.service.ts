import * as http from 'http';
import * as io from 'socket.io';
import devWarsService, { UserRole } from '../devwars/devwars.service';
import gameService from '../game/game.service';
import editorService from '../editor/editor.service';
import applicationService from '../application/application.service';
import documentService from '../document/document.service';
import { TextOperation } from '../document/TextOperation';

class WSService {
    server!: io.Server;

    init(server: http.Server) {
        this.server = io(server, { transports: ['websocket'] });
        this.server.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: io.Socket) {
        console.log('WS.Connect:', socket.id);

        socket.on('disconnect', () => {
            // TODO: Remove editor connections if any.
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

        socket.on('e.control', async (data) => {
            const id = Number(data.id);
            if (await this.isEditorOwner(socket, id)) {
                await editorService.setConnection(id, socket);
            }
        });

        socket.on('e.release', async (data) => {
            const id = Number(data.id);
            if (await this.isControllingEditor(socket, id)) {
                await editorService.deleteConnection(id);
            }
        });

        socket.on('e.save', async (data) => {
            const id = Number(data.id);
            if (await this.isEditorOwner(socket, id)) {
                if (await documentService.save(id)) {
                    socket.emit('o.save', { id });
                    socket.broadcast.emit('o.save', { id });
                }
            }
        });

        socket.on('e.getText', async (data) => {
            const id = Number(data.id);
            const text = documentService.getText(id);
            if (text !== null) {
                socket.emit('e.text', { id, text });
            }
        });

        socket.on('e.o', async (data) => {
            const id = Number(data.id);
            if (await this.isControllingEditor(socket, id)) {
                const op = TextOperation.fromDto(data.o);
                if (documentService.applyTextOperation(id, op)) {
                    socket.broadcast.emit('e.o', { id, o: data.o });
                }
            }
        });

        socket.on('e.s', async () => {});

        devWarsService.getUserFromHeaders(socket.handshake.headers).then((user) => {
            if (user) socket.client.user = user;
            socket.emit('init', user);
        });
    }

    private isModerator(socket: io.Socket): boolean {
        const role = socket.client.user?.role;
        return role === UserRole.MODERATOR || role === UserRole.ADMIN;
    }

    private async isEditorOwner(socket: io.Socket, id: number): Promise<boolean> {
        const user = socket.client.user;
        if (!user) return false;

        const editor = await editorService.getById(id).catch(() => null);
        if (!editor) return false;

        return editor.playerId === user.id || this.isModerator(socket);
    };

    private async isControllingEditor(socket: io.Socket, id: number): Promise<boolean> {
        const editor = await editorService.getById(id).catch(() => null);
        if (!editor?.connection?.socketId) return false;

        return editor.connection.socketId === socket.id;
    };

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
