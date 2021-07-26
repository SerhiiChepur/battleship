export class CellCoordinate {
    public readonly row!: number;
    public readonly col!: number;
    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    /**
     * getPositionKey
     */
    public getPositionKey() {
        return `${this.col}:${this.row}`;
    }
}