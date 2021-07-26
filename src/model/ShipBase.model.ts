import { ShipDirection } from '../enum/ShipDirection.enum';
import { ShipStatus } from '../enum/ShipStatus.enum';
import { CellCoordinate } from './CellCoordinate.model';
import { ShipType } from '../enum/ShipType.enum';

export class ShipBase {
    public readonly shipType!: ShipType;
    public readonly direction!: ShipDirection;
    public readonly zeroPosition!: CellCoordinate;
    public readonly size!: number;
    public health!: number;
    public state!: ShipStatus;
}