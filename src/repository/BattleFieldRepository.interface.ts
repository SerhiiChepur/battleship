import { ShipBase } from '../model/ShipBase.model';
import { Ship } from '../model/Ship.model';
import { BattleField } from '../model/BattleField.model';
import { ShipsGetterFilter, PaginationConfig, PaginatedResult, ActionGetterFilter, SortConfig, GameAction } from '../model';
export interface BattleFieldRepository {
    insertShips(battleFieldId: number, playerId: number, ships: ShipBase[]): Promise<Ship[]>;
    getBattleField(battleFieldId: number): Promise<BattleField>;
    getShipCountByPlayer(battleFieldId: number, playerId: number): Promise<number>;
    updateBattleField(updateInput: Omit<Partial<BattleField>, 'gameMode'>): boolean;
    isAllPlayersShipsAllocated(battleFieldId: number): boolean;
    getRelatedCellShips(filter: ShipsGetterFilter, paginationConfig?: PaginationConfig): Promise<PaginatedResult<Ship>>;
    getActionHistory(filter: ActionGetterFilter, sortConfig: SortConfig, paginationConfig?: PaginationConfig) :Promise<PaginatedResult<GameAction>>;
}