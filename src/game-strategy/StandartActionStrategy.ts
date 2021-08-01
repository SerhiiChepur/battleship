import { ActionType, ActionResult } from '../enum';
import { 
    CellCoordinate, 
    BattleField, 
    Ship } from '../model';
import { ActionStrategyBase } from './ActionStrategyBase';
import { ActionHistoryGetter, CellShipsGetter } from './type/ActionStrategy.types';


export class StandartActionStrategy implements ActionStrategyBase {
    cellInteractAsync(
        userId: number, 
        cellCoordinate: CellCoordinate, 
        action: ActionType, 
        battleField: BattleField, 
        actionHistoryGetter: ActionHistoryGetter, 
        cellShipsGetter: CellShipsGetter
        ): Promise<{ result: ActionResult; affectedShips?: Ship[] | undefined; }> {

        throw new Error('Method not implemented.');
    }
}