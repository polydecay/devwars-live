import io from 'socket.io';
import sass from 'sass';
import playerService from '../player/player.service';
import documentService from '../document/document.service';
import { User } from '../devwars/devwarsUser';
import wsService from '../ws/ws.service';
import { Editor } from './editor.model';
import { PatchEditorDto } from './dto/patchEditor.dto';

class EditorService {
    async getAll(): Promise<Editor[]> {
        return Editor.find();
    }

    async getById(id: number): Promise<Editor> {
        return Editor.findOneOrFail(id);
    }

    async getByFileName(teamId: number, fileName: string): Promise<Editor> {
        return Editor.findOneOrFail({ where: { teamId, fileName } });
    }

    async patch(id: number, patchDto: PatchEditorDto): Promise<Editor> {
        let editor = await this.getById(id);
        Object.assign(editor, patchDto);
        editor = await editor.save();

        return editor;
    }

    async setFileText(id: number, fileText: string): Promise<Editor> {
        let editor = await this.getById(id);
        editor.fileText = fileText;

        if (editor.language === 'scss') {
            try {
                const { css } = await sass.compileStringAsync(fileText, {
                    alertColor: false,
                    logger: sass.Logger.silent,
                });

                editor.outputText = css;
                editor.outputError = null;
            } catch (error: any) {
                editor.outputError = error.message;
            }
        } else {
            editor.outputText = editor.fileText;
        }

        await editor.save();
        wsService.broadcastEditorOutput(editor.id);

        return editor;
    }

    async reset(id: number): Promise<Editor> {
        const editor = await this.getById(id);

        documentService.getById(id).setText(editor.template);
        documentService.save(id);
        wsService.broadcastEditorReset(editor.id, documentService.getText(id));

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
