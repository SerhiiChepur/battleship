import { ShipBase } from '../model/ShipBase.model';
import { Ship } from '../model/Ship.model';
import { BattleField } from '../model/BattleField.model';
export interface BattleFieldRepository {
    insertShips(battleFieldId: number, playerId: number, ships: ShipBase[]): Promise<Ship[]>;
    getBattleField(battleFieldId: number): Promise<BattleField>;
}