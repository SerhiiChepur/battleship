import { ActionResult } from '../enum/ActionResult.enum';
import { Ship } from '../model/Ship.model';
import { CellCoordinate } from '../model/CellCoordinate.model';
import { ActionType } from '../enum/ActionType.enum';
import { BattleField } from '../model/BattleField.model';
import { ShipStatus } from '../enum/ShipStatus.enum';
import { SortOrder } from '../enum/SortOrder.enum';
import { GameAction } from '../model/GameAction.model';
interface ActionGetterFilter {
    cellCoordinate: CellCoordinate;
    battleFieldId: number; 
    userId: number;
}
interface PaginationConfig {
    recLimit: number; 
    recOffset: number; 
}

interface SortConfig {
    sortOrder: SortOrder;
    sortByField: string;
}

interface ShipsGetterFilter {
    cellCoordinate: CellCoordinate;
    userId: number;
    battleFieldId: number;
    shipStatus: ShipStatus
}

interface PaginatedResult<T> {
    totalRecords: number;
    currentPage: number; 
    actions: T[];
}

export interface ActionStrategyBase {
    cellInteractAsync(
        userId:number, 
        cellCoordinate: CellCoordinate, 
        action: ActionType, 
        battleField: BattleField, 
        actionHistoryGetter: (filter: ActionGetterFilter, sortConfig: SortConfig, paginationConfig?: PaginationConfig ) => Promise<PaginatedResult<GameAction>>,
        cellShipsGetter: (filter: ShipsGetterFilter) => Promise<Ship[]>,
        ): Promise<{result:ActionResult, affectedShips?: Ship[]}>;
}