// Array layout: [text, startRow, startCol, endRow, endCol]
// If "endRow" and "endCol" are not defined then
// "endRow = startRow" and "endCol = startCol".
type TextOperationDto
    = [string, number, number, number, number]
    | [string, number, number];

export class TextOperation {
    constructor(
        public readonly text: string,
        public readonly startRow: number,
        public readonly startCol: number,
        public readonly endRow: number,
        public readonly endCol: number,
    ) {
        // Ensure the end range is >=to the start range.
        // TODO: Consider throwing instead.
        this.endRow = Math.max(this.startRow, this.endRow);
        this.endCol = Math.max(this.startCol, this.endCol);
    }

    toDto(): TextOperationDto {
        const { text, startRow, startCol, endRow, endCol } = this;
        if (startRow === endRow && startCol === endCol) {
            return [text, startRow, startCol];
        }

        return [text, startRow, startCol, endRow, endCol];
    }

    static fromDto(dto: TextOperationDto): TextOperation {
        const [text, startRow, startCol, endRow, endCol] = dto;
        return new TextOperation(
            text,
            startRow,
            startCol,
            endRow ?? startRow,
            endCol ?? startCol,
        );
    }

    toMonacoEdit(monaco: any) {
        if (!monaco) throw new Error('You need to provide the monaco instance for this operation');

        return {
            forceMoveMarkers: true,
            text: this.text,
            range: new monaco.Range(
                this.startRow + 1,
                this.startCol + 1,
                this.endRow + 1,
                this.endCol + 1
            ),
        };
    }

    static fromMonacoChange(change: any) {
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
