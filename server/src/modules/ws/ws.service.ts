import * as http from 'http';
import * as io from 'socket.io';
import devWarsService, { User, UserRole } from '../devwars/devwars.service';
import gameService from '../game/game.service';
import editorService from '../editor/editor.service';
import applicationService from '../application/application.service';
import documentService from '../document/document.service';
import { TextOperation } from '../document/TextOperation';
import { validateDocumentIdDto } from './dto/documentId.dto';
import { validateDocumentTextOpDto } from './dto/documentTextOp.dto';
import { PromiseQueue } from '../../common/promiseQueue';
import devwarsService from '../devwars/devwars.service';
import { Vote } from '../vote/vote.model';

class WSService {
    server!: io.Server;
    usersBySocket: WeakMap<io.Socket, User> = new WeakMap();

    init(server: http.Server) {
        this.server = new io.Server(server, { transports: ['websocket'] });
        this.server.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: io.Socket) {
        console.log('WS.Connect:', socket.id);

        const errorWrapper = (handler: (data: any) => Promise<void>) => {
            return (data: any) => {
                handler(data).catch(error => console.log(error));
            }
        }

        socket.on('disconnect', () => {
            // TODO: Remove editor connections if any.
            console.log('WS.Disconnect:', socket.id);
            this.usersBySocket.delete(socket);
        });

        socket.on('game.refresh', errorWrapper(async () => {
            socket.emit('game.state', await this.getGameState());
        }));

        socket.on('admin.refresh', errorWrapper(async () => {
            if (this.isModerator(socket)) {
                socket.emit('admin.state', await this.getAdminState());
            }
        }));

        socket.on('e.control', errorWrapper(async (data) => {
            const { id } = validateDocumentIdDto(data);
            const user = this.usersBySocket.get(socket);

            // TODO: Prevent users taking control from admins and moderators.
            if (user && await this.isEditorOwner(socket, id)) {
                await editorService.setConnection(id, socket, user);
            }
        }));

        socket.on('e.release', errorWrapper(async (data) => {
            const { id } = validateDocumentIdDto(data);
            if (await this.isControllingEditor(socket, id)) {
                await editorService.deleteConnection(id);
            }
        }));

        socket.on('e.save', errorWrapper(async (data) => {
            const { id } = validateDocumentIdDto(data);
            if (await this.isEditorOwner(socket, id)) {
                await documentService.save(id);
                socket.emit('e.save', { id });
                socket.broadcast.emit('e.save', { id });
            }
        }));

        socket.on('e.getText', errorWrapper(async (data) => {
            const { id } = validateDocumentIdDto(data);
            const text = documentService.getText(id);
            socket.emit('e.text', { id, text });
        }));

        const editorOperationQueue = new PromiseQueue();
        socket.on('e.o', errorWrapper(async (data) => {
            const { id, o } = validateDocumentTextOpDto(data);
            editorOperationQueue.add(async () => {
                if (await this.isControllingEditor(socket, id)) {
                    documentService.applyTextOperation(id, TextOperation.fromDto(o));
                    socket.broadcast.emit('e.o', { id, o });
                }
            });
        }));

        socket.on('e.s', errorWrapper(async () => {}));

        const token = devwarsService.getTokenFromHeaders(socket.handshake.headers as http.IncomingHttpHeaders);
        devWarsService.getUserFromToken(token).then((user) => {
            if (user) this.usersBySocket.set(socket, user);
            socket.emit('init', user);
        });
    }

    private userFromSocket(socket: io.Socket): User | undefined {
        return this.usersBySocket.get(socket);
    }

    private isModerator(socket: io.Socket): boolean {
        const role = this.userFromSocket(socket)?.role;
        return role === UserRole.MODERATOR || role === UserRole.ADMIN;
    }

    private async isEditorOwner(socket: io.Socket, id: number): Promise<boolean> {
        const user = this.userFromSocket(socket);
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
        return gameService.getGameWithRelations().catch(() => null);
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
        this.server.sockets.sockets.forEach((socket) => {
            if (this.isModerator(socket)) {
                socket.emit('admin.state', adminState);
            }
        });
    }

    broadcastVote(vote: Vote) {
        this.server.emit('game.vote', vote);
    }
}

export default new WSService();
