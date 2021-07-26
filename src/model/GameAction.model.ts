import { ActionType } from '../enum/ActionType.enum';
export class GameAction { 
    battleFieldId!: number; 
    playerId!: number; 
    actionType!: ActionType; 
    cellY!: number; 
    cellX!: number; 
}