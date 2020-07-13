import { TextOperation } from './TextOperation';

export class Document {
    private buffer = [''];
    private textCache: string | null = null;

    constructor(text: string) {
        this.buffer = text.split('\n');
        this.textCache = null;
    }

    getText(): string {
        if (this.textCache === null) {
            this.textCache = this.buffer.join('\n');
        }

        return this.textCache;
    }

    setText(text: string) {
        this.buffer = text.split('\n');
        this.textCache = null;
    }

    applyTextOperation(textOperation: TextOperation) {
        const { startRow, startCol, endRow, endCol } = textOperation;
        const lines = textOperation.text.split('\n');

        lines[0] = this.buffer[startRow].slice(0, startCol) + lines[0];
        lines[lines.length - 1] += this.buffer[endRow].slice(endCol);

        this.buffer.splice(startRow, ((endRow - startRow) + 1), ...lines);
        this.textCache = null;
    }
}
