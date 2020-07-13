export default class TextOperation {
    constructor(text, startRow, startCol, endRow, endCol) {
        this.text = text;
        this.startRow = startRow;
        this.startCol = startCol;
        // Ensure the end range is greater than the start range.
        // TODO: Consider throwing instead.
        this.endRow = Math.max(startRow, endRow);
        this.endCol = Math.max(startCol, endCol);
    }

    toDto() {
        const { text, startRow, startCol, endRow, endCol } = this;
        if (startRow === endRow && startCol === endCol) {
            return [text, startRow, startCol];
        }

        return [text, startRow, startCol, endRow, endCol];
    }

    static fromDto(dto) {
        const [text, startRow, startCol, endRow, endCol] = dto;
        return new TextOperation(
            text,
            startRow,
            startCol,
            endRow ?? startRow,
            endCol ?? startCol,
        );
    }

    toMonacoChange(monaco) {
        if (!monaco) throw new Error('You need to provide the monaco instance for this operation');

        return {
            forceMoveMarkers: true,
            text: this.text,
            range: new monaco.Range(
                this.startRow + 1,
                this.startCol + 1,
                this.endRow + 1,
                this.endCol + 1,
            ),
        };
    }

    static fromMonacoChange(change) {
        const { startLineNumber, startColumn, endLineNumber, endColumn } = change.range;
        return new TextOperation(
            change.text.replace(/\r/g, ''),
            startLineNumber - 1,
            startColumn - 1,
            endLineNumber - 1,
            endColumn - 1,
        );
    }
}
