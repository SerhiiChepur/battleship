import { ActionType, ActionResult } from "../enum";
import { 
    ActionGetterFilter, 
    BattleField, 
    CellCoordinate, 
    GameAction, 
    PaginatedResult, 
    PaginationConfig, 
    Ship, 
    ShipsGetterFilter, 
    SortConfig } from "../model";

export interface ActionStrategyBase {
    cellInteractAsync(
        userId:number, 
        cellCoordinate: CellCoordinate, 
        action: ActionType, 
        battleField: BattleField, 
        actionHistoryGetter: (
            filter: ActionGetterFilter, 
            sortConfig: SortConfig, 
            paginationConfig?: PaginationConfig,
        ) => Promise<PaginatedResult<GameAction>>,
        cellShipsGetter: (
            filter: ShipsGetterFilter, 
            paginationConfig?: PaginationConfig,
            ) => Promise<PaginatedResult<Ship>>,
        ): Promise<{result:ActionResult, affectedShips?: Ship[]}>;
}