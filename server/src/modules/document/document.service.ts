import editorService from '../editor/editor.service';
import { Document } from './Document';
import { TextOperation } from './TextOperation';

class DocumentService {
    private documents: Map<number, Document> = new Map();

    async syncWithEditors() {
        this.documents.clear();
        for (const editor of await editorService.getAll()) {
            this.documents.set(editor.id, new Document(editor.fileText));
        }
    }

    create(id: number, text: string): Document {
        const document = new Document(text);
        this.documents.set(id, document);
        return document;
    }

    delete(id: number): boolean {
        return this.documents.delete(id);
    }

    getText(id: number): string | null {
        return this.documents.get(id)?.getText() ?? null;
    }

    async save(id: number): Promise<boolean> {
        const fileText = this.getText(id);
        if (fileText === null) return false;

        return editorService.patch(id, { fileText })
            .then(() => true)
            .catch(() => false);
    }

    applyTextOperation(id: number, textOperation: TextOperation): boolean {
        const document = this.documents.get(id);
        if (!document) return false;

        document.applyTextOperation(textOperation);
        return true;
    }
}

export default new DocumentService();
