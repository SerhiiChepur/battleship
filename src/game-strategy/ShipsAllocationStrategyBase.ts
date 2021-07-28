import { BattleField, ShipBase } from "../model";

export abstract class ShipsAllocationStrategyBase {
     public checkShipsAllocation(battleField: BattleField, newShips: ShipBase[]) {
        this.checkShipCountConstraints(newShips);
        this.checkShipsAllocationConflicts(battleField.squareSideSize, newShips);
     }

     protected abstract checkShipCountConstraints(ships: ShipBase[]):void;
     protected abstract checkShipsAllocationConflicts(squareSideSize: number, ships: ShipBase[]): void;
}