import { ShipStatus } from '../../enum';
import { CellCoordinate } from '../CellCoordinate.model';


export interface ShipsGetterFilter {
    cellCoordinate: CellCoordinate;
    userId: number;
    battleFieldId: number;
    shipStatus: ShipStatus;
}
