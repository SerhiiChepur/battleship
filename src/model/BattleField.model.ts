import { BattleStatus } from '../enum/BattleStatus.enum';
import { GameStrategyMode } from '../enum/GameStrategyMode.enum';

export class BattleField {
    public readonly battleFieldId!: number;
    public readonly winnerId!: number;
    public readonly nextActionPlayerId!: number;
    public readonly squareSideSize!: number;
    public readonly gameMode!: GameStrategyMode;
    public readonly currentStatus!: BattleStatus;
}