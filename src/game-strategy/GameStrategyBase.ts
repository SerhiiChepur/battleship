import { BattleField } from '../model/BattleField.model';
import { Ship } from '../model/Ship.model';
import { ShipBase } from '../model/ShipBase.model';

export abstract class GameStrategyBase {
    /**
     * checkAndPutShips
     */
     public putPlayerShipsOnBattleField(battleField: BattleField, newShips: ShipBase[]) {
        this.checkShipsForAllocation(newShips);
        const shipsAllocationMock = this.getShipsAllocationMock(battleField, newShips);

        shipsAllocationMock.forEach((value, key)=> {
            const shipsLinkedToCell = battleField.cells.get(key) || [];
            shipsLinkedToCell.push(...value);
            battleField.cells.set(key, shipsLinkedToCell);
        });
     }

     protected abstract checkShipsForAllocation(ships: ShipBase[]):void;
     protected abstract getShipsAllocationMock(battleField: BattleField, ships: ShipBase[]):Map<string, Ship[]>;
}