import { Editor } from './editor.model';
import { PatchEditorDto } from './dto/patchEditor.dto';
import playerService from '../player/player.service';

class EditorService {
    async getById(id: number): Promise<Editor> {
        return Editor.findOneOrFail(id);
    }

    async getByName(teamId: number, fileName: string): Promise<Editor> {
        return Editor.findOneOrFail({ where: { teamId, fileName } });
    }

    async patch(id: number, patchDto: PatchEditorDto): Promise<Editor> {
        const editor = await this.getById(id);
        Object.assign(editor, patchDto);
        return editor.save();
    }

    async setPlayer(id: number, playerId: number): Promise<Editor> {
        const editor = await this.getById(id);
        editor.player = await playerService.getById(playerId);;
        return editor.save();
    }

    async deletePlayer(id: number): Promise<Editor> {
        // TODO: Remove player from game if no longer assigned to any editors.
        const editor = await this.getById(id);
        editor.playerId = null;
        return  editor.save();
    }
}

export default new EditorService();
