import * as io from 'socket.io';
import { Editor } from './editor.model';
import { PatchEditorDto } from './dto/patchEditor.dto';
import { User } from '../devwars/devwarsUser';
import playerService from '../player/player.service';
import documentService from '../document/document.service';
import wsService from '../ws/ws.service';

class EditorService {
    async getAll(): Promise<Editor[]> {
        return Editor.find();
    }

    async getById(id: number): Promise<Editor> {
        return Editor.findOneOrFail(id);
    }

    async getByName(teamId: number, fileName: string): Promise<Editor> {
        return Editor.findOneOrFail({ where: { teamId, fileName } });
    }

    async patch(id: number, patchDto: PatchEditorDto): Promise<Editor> {
        let editor = await this.getById(id);
        Object.assign(editor, patchDto);
        editor = await editor.save();

        if (patchDto.fileText) {
            wsService.broadcastEditorSave(editor.id);
        }

        return editor;
    }

    async reset(id: number): Promise<Editor> {
        const editor = await this.getById(id);

        // Connected editors will ignore content updates from the server so disconnect them first.
        this.deleteConnection(id);

        documentService.getById(id).setText(editor.template);
        documentService.save(id);

        return editor;
    }

    async setPlayer(id: number, playerId: number): Promise<Editor> {
        const editor = await this.getById(id);
        editor.player = await playerService.getById(playerId);
        editor.connection = null;
        return editor.save();
    }

    async deletePlayer(id: number): Promise<Editor> {
        // TODO: Remove player from game if no longer assigned to any editors.
        const editor = await this.getById(id);
        editor.playerId = null;
        editor.connection = null;
        return editor.save();
    }

    async setConnection(id: number, socket: io.Socket, user: User): Promise<Editor> {
        const editor = await this.getById(id);
        editor.connection = {
            socketId: socket.id,
            user,
        };

        return editor.save();
    }

    async deleteConnection(id: number): Promise<Editor> {
        const editor = await this.getById(id);
        editor.connection = null;
        return editor.save();
    }

    async lockAll(): Promise<Editor[]> {
        const editors = await this.getAll();
        editors.forEach(editor => editor.locked = true);
        return Editor.save(editors);
    }

    async unlockAll(): Promise<Editor[]> {
        const editors = await this.getAll();
        editors.forEach(editor => editor.locked = false);
        return Editor.save(editors);
    }
}

export default new EditorService();
