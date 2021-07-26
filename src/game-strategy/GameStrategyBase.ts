import { BattleField } from '../model/BattleField.model';
import { ShipBase } from '../model/ShipBase.model';

export abstract class GameStrategyBase {
     public checkShipsAllocation(battleField: BattleField, newShips: ShipBase[]) {
        this.checkShipCountConstraints(newShips);
        this.checkShipsAllocationConflicts(battleField.squareSideSize, newShips);
     }

     protected abstract checkShipCountConstraints(ships: ShipBase[]):void;
     protected abstract checkShipsAllocationConflicts(squareSideSize: number, ships: ShipBase[]): void;
}