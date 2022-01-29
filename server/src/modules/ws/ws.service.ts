import http from 'http';
import _ from 'lodash';
import io from 'socket.io';
import devwarsService from '../devwars/devwars.service';
import { User, isModerator } from '../devwars/devwarsUser';
import gameService from '../game/game.service';
import editorService from '../editor/editor.service';
import applicationService from '../application/application.service';
import documentService from '../document/document.service';
import { TextOperation } from '../document/TextOperation';
import { validateDocumentIdDto } from './dto/documentId.dto';
import { validateDocumentTextOpDto } from './dto/documentTextOp.dto';
import { PromiseQueue } from '../../common/promiseQueue';
import { validateEditorSelectionsDto } from './dto/editorSelections.dto';

class WSService {
    server!: io.Server;
    usersBySocket: WeakMap<io.Socket, User> = new WeakMap();

    constructor() {
        this.updateGameState = _.throttle(this.updateGameState, 100) as any;
    }

    init(server: http.Server) {
        this.server = new io.Server(server, { transports: ['websocket'] });
        this.server.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: io.Socket) {
        const errorWrapper = (handler: (data: any) => Promise<void>) => {
            return (data: any) => {
                handler(data).catch(error => console.error(error));
            };
        };

        socket.on('disconnect', async () => {
            this.usersBySocket.delete(socket);

            // Remove any associated editor connections.
            // TODO: Optimize?
            (await editorService.getAll())
                .filter(editor => editor.connection?.socketId === socket.id)
                .forEach(editor => editorService.deleteConnection(editor.id));
        });

        socket.on('game.refresh', errorWrapper(async () => {
            socket.emit('game.state', await this.getGameState());
        }));

        socket.on('admin.refresh', errorWrapper(async () => {
            const user = this.usersBySocket.get(socket);
            if (!user) return;

            if (isModerator(user)) {
                socket.emit('admin.state', await this.getAdminState());
            }
        }));

        socket.on('e.control', errorWrapper(async (data) => {
            const { id } = validateDocumentIdDto(data);
            const user = this.usersBySocket.get(socket);

            if (user && await this.isEditorOwner(user, id)) {
                // Prevent users from taking control over admins and moderators.
                const editor = await editorService.getById(id);
                const editorUser = editor.connection?.user;
                if (editorUser && isModerator(editorUser) && !isModerator(user)) {
                    return;
                }

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
            if (await this.isControllingEditor(socket, id)) {
                await documentService.save(id);
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

        socket.on('e.s', errorWrapper(async (data) => {
            const { id, s } = validateEditorSelectionsDto(data);
            if (await this.isControllingEditor(socket, id)) {
                socket.broadcast.emit('e.s', { id, s });
            }
        }));

        const token = devwarsService.getTokenFromHeaders(socket.handshake.headers as http.IncomingHttpHeaders);
        devwarsService.getUserFromToken(token).then((user) => {
            if (user) this.usersBySocket.set(socket, user);
            socket.emit('init', user);
        });
    }

    private async isEditorOwner(user: User, id: number): Promise<boolean> {
        const editor = await editorService.getById(id).catch(() => null);
        if (!editor) return false;

        return editor.playerId === user.id || isModerator(user);
    }

    private async isControllingEditor(socket: io.Socket, id: number): Promise<boolean> {
        const editor = await editorService.getById(id).catch(() => null);
        if (!editor?.connection?.socketId) return false;

        return editor.connection.socketId === socket.id;
    }

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
            const user = this.usersBySocket.get(socket);
            if (user && isModerator(user)) {
                socket.emit('admin.state', adminState);
            }
        });
    }

    async broadcastEditorReset(id: number, text: string) {
        this.server.emit('e.text', { id, text });
    }

    async broadcastEditorSave(id: number) {
        this.server.emit('e.save', { id });
    }
}

export default new WSService();
