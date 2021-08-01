import { ActionGetterFilter, BattleField, GameAction, PaginatedResult, PaginationConfig, Ship, ShipBase, ShipsGetterFilter, SortConfig } from '../model';
import { BattleFieldRepository } from './BattleFieldRepository.interface';

export class InMemoryBattleFieldRepository implements  BattleFieldRepository {
    insertShips(battleFieldId: number, playerId: number, ships: ShipBase[]): Promise<Ship[]> {
        throw new Error('Method not implemented.');
    }
    getBattleField(battleFieldId: number): Promise<BattleField> {
        throw new Error('Method not implemented.');
    }
    getShipCountByPlayer(battleFieldId: number, playerId: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
    updateBattleField(updateInput: Omit<Partial<BattleField>, 'gameMode'>): boolean {
        throw new Error('Method not implemented.');
    }
    isAllPlayersShipsAllocated(battleFieldId: number): boolean {
        throw new Error('Method not implemented.');
    }
    public getRelatedCellShips(filter: ShipsGetterFilter, paginationConfig?: PaginationConfig):Promise<PaginatedResult<Ship>> {
        throw Error();
    }
    public getActionHistory(filter: ActionGetterFilter, sortConfig: SortConfig, paginationConfig?: PaginationConfig): Promise<PaginatedResult<GameAction>>{
        throw Error();
    }

}