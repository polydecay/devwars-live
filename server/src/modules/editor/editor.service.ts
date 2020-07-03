import { Editor } from './editor.model';
import { PatchEditorDto } from './dto/patchEditor.dto';

class EditorService {
    async getById(id: number): Promise<Editor> {
        return Editor.findOneOrFail(id);
    }

    async getByName(teamId: number, fileName: string): Promise<Editor> {
        return Editor.findOneOrFail({ where: { teamId, fileName } });
    }

    async patch(id: number, patchDto: PatchEditorDto): Promise<Editor> {
        const editor = this.getById(id);
        Object.assign(editor, patchDto);
        return editor;
    }
}

export default new EditorService();
