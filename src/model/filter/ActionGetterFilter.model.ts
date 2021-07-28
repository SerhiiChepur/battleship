import { CellCoordinate } from '../CellCoordinate.model';

export interface ActionGetterFilter {
    cellCoordinate: CellCoordinate;
    battleFieldId: number;
    userId: number;
}
