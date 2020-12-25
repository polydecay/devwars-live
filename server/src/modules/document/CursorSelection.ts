// Array layout: [startRow, startCol, endRow, endCol, cursorAtStart]
// If "endRow" and "endCol" are not defined then
// "endRow = startRow" and "endCol = startCol".
// if cursorAtStart = 1 the cursor is at the beginning of the range, otherwise it's at the end.
export type CursorSelectionDto = [number, number, number?, number?, number?]

export class CursorSelection {
    constructor(
        public readonly startRow: number,
        public readonly startCol: number,
        public readonly endRow: number,
        public readonly endCol: number,
        public readonly cursorRow: number,
        public readonly cursorCol: number,
    ) {
        // Ensure the end range is >= to the start range.
        // TODO: Consider throwing instead.
        this.endRow = Math.max(this.startRow, this.endRow);
        if (this.startRow === this.endRow) {
            this.endCol = Math.max(this.startCol, this.endCol);
        }
    }

    hasSelection(): boolean {
        return this.startRow !== this.endRow || this.startCol !== this.endCol;
    }

    toDto(): CursorSelectionDto {
        const { startRow, startCol, endRow, endCol, cursorRow, cursorCol } = this;
        if (startRow === endRow && startCol === endCol) {
            return [startRow, startCol];
        }

        const cursorAtStart = cursorRow === startRow && cursorCol === startCol;

        return cursorAtStart
            ? [startRow, startCol, endRow, endCol, 1]
            : [startRow, startCol, endRow, endCol];
    }

    static fromDto(dto: CursorSelectionDto): CursorSelection {
        let [startRow, startCol, endRow, endCol, cursorAtStart] = dto;

        endRow = endRow ?? startRow;
        endCol = endCol ?? startCol;

        const cursorRow = cursorAtStart === 1 ? startRow : endRow;
        const cursorCol = cursorAtStart === 1 ? startCol : endCol;

        return new CursorSelection(
            startRow,
            startCol,
            endRow,
            endCol,
            cursorRow,
            cursorCol,
        );
    }

    toMonacoRanges(monaco: any) {
        if (!monaco) throw new Error('You need to provide the monaco instance for this operation');

        const selection = new monaco.Range(
            this.startRow,
            this.startCol,
            this.endRow,
            this.endCol,
        );

        const cursor = new monaco.Range(
            this.cursorRow,
            this.cursorCol,
            this.cursorRow,
            this.cursorCol,
        );

        return { selection, cursor };
    }

    static fromMonacoSelection(selection: any): CursorSelection {
        return new CursorSelection(
            selection.startLineNumber,
            selection.startColumn,
            selection.endLineNumber,
            selection.endColumn,
            selection.positionLineNumber,
            selection.positionColumn,
        );
    }
}
