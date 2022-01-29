import { NotFound } from 'http-errors';
import editorService from '../editor/editor.service';
import { Document } from './Document';
import { TextOperation } from './TextOperation';

class DocumentService {
    private readonly documents: Map<number, Document> = new Map();

    async syncWithEditors() {
        this.documents.clear();
        for (const editor of await editorService.getAll()) {
            this.documents.set(editor.id, new Document(editor.fileText));
        }
    }

    getById(id: number): Document {
        const document = this.documents.get(id);
        if (!document) throw new NotFound();

        return document;
    }

    create(id: number, text: string): Document {
        const document = new Document(text);
        this.documents.set(id, document);
        return document;
    }

    delete(id: number): boolean {
        return this.documents.delete(id);
    }

    getText(id: number): string {
        return this.getById(id).getText();
    }

    applyTextOperation(id: number, textOperation: TextOperation): boolean {
        this.getById(id).applyTextOperation(textOperation);
        return true;
    }

    async save(id: number): Promise<void> {
        const fileText = this.getText(id);
        await editorService.patch(id, { fileText });
    }
}

export default new DocumentService();
