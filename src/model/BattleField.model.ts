import { Ship } from './Ship.model';
import { Shot } from './Shot.model';
import { BattleStatus } from '../enum/BattleStatus.enum';
import { GameStrategyMode } from '../enum/GameStrategyMode.enum';

export class BattleField {
    public readonly battleFieldId!: number;
    public readonly winnerId!: number;
    public readonly squareSideSize!: number;
    public readonly gameMode!: GameStrategyMode;
    public cells!: Map<string, Ship[]>;
    private currentStatus!: BattleStatus;
    private history!: Array<Shot>; 
}