import { CellCoordinate } from './CellCoordinate.model';
import { ActionType } from '../enum/ActionType.enum';

export class Interaction {
    public readonly interactionId!: number;
    public readonly interactionType!: ActionType;
    public readonly targetCell!: CellCoordinate;
    public readonly ownerId!: number;
}