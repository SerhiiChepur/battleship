import { GameStrategyBase } from './GameStrategyBase';
import { ShipType } from '../enum/ShipType.enum';
import { ShipBase } from '../model/ShipBase.model';
import { CellCoordinate } from '../model/CellCoordinate.model';
import { ShipDirection } from '../enum/ShipDirection.enum';

const RULES_VIOLATION_BOARD_MSG = 'Rules violation: board';

export class ShipsCanBePlacedNearby extends GameStrategyBase {
    private readonly shipCountConstraints!: Map<ShipType, number>;
    constructor() {
        super();
        this.shipCountConstraints = new Map<number, number>([
            [ShipType.Destroyer, 1], 
            [ShipType.Submarine, 2], 
            [ShipType.Cruiser, 1], 
            [ShipType.Battleship, 1],
        ]);
    }

    protected checkShipCountConstraints(ships: ShipBase[]): void {
        const countersPerShipTypes = new Map<ShipType, number>();
        ships.forEach(ship => {
            let shipCounter = countersPerShipTypes.get(ship.shipType) || 0;
            countersPerShipTypes.set(ship.shipType, ++shipCounter);
        });
        this.shipCountConstraints.forEach((requiredShipCount, shipType) => {
            const shipsCount = countersPerShipTypes.get(shipType) || 0;
            const countMatch = requiredShipCount === shipsCount;

            if (countMatch) {
                countersPerShipTypes.delete(shipType);
            }
        });

        const errorMessages = new Array<string>();
        if (countersPerShipTypes.values.length) {
            countersPerShipTypes.forEach((shipsCount, shipType) => {
                const requiredCount = this.shipCountConstraints.get(shipType);
                const errMessage = requiredCount 
                ? `${RULES_VIOLATION_BOARD_MSG} should contain ${requiredCount} of ${ShipType[shipType]} rather then ${shipsCount}`
                : `${RULES_VIOLATION_BOARD_MSG} could not contain ships of ${ShipType[shipType]} type`
                errorMessages.push(errMessage);
            });
            throw Error(errorMessages.join(',\n'));
        }
    }

    protected checkShipsAllocationConflicts(squareSideSize: number, ships: ShipBase[]) {
        //array used for support "air carrier" feature - some ships could have objects on their top floor
        const proposedAllocationIndex = new Map<string, ShipBase[]>(); 
        const allocationConflictsStrings = new Array<string>();

        for (const ship of ships) {
            const {errorMessage: cellBoundsError, affectedGridCells} = this.getShipReservedCellsOrError(ship, squareSideSize);
            if(cellBoundsError) {
                allocationConflictsStrings.push(cellBoundsError);
                continue
            }
            
            const shipCells = affectedGridCells.map(cell => cell.getPositionKey());
            const hasConflictsWithProposedAllocation = this.shipHasConflictsWithOtherProposedShips(shipCells, proposedAllocationIndex);
            this.populateAllocationIndex(shipCells, proposedAllocationIndex, ship);
            
            if (hasConflictsWithProposedAllocation) {
                const allocationError = `The ${ship.shipType} with zero position ${ship.zeroPosition.getPositionKey()} intercepts with other ships`;
                allocationConflictsStrings.push(allocationError);
                continue;
            }
        }

        if(allocationConflictsStrings.length) {
            throw Error(allocationConflictsStrings.join(',\n'));
        }
    }

    private populateAllocationIndex(shipCells: string[], proposedAllocationIndex: Map<string, ShipBase[]>, ship: ShipBase) {
        shipCells.forEach(cellKey => {
            const cellObjects = proposedAllocationIndex.get(cellKey) || [];
            cellObjects.push(ship);
            proposedAllocationIndex.set(cellKey, cellObjects);
        });
    }

    private shipHasConflictsWithOtherProposedShips(shipCellsKeys: string[], proposedAllocationIndex: Map<string, ShipBase[]>) {
        const usedCellIndexes = Array.from(proposedAllocationIndex.keys());
        return usedCellIndexes.some(usedCellIndex => shipCellsKeys.includes(usedCellIndex));
    }

    private getShipReservedCellsOrError(ship: ShipBase, squareSideSize: number) {
        const isHorizontal = ship.direction === ShipDirection.horizontal;
        let errorMessage = '';
        const affectedGridCells = new Array<CellCoordinate>();

        let startPosition = isHorizontal ? ship.zeroPosition.col : ship.zeroPosition.row;
        if (startPosition < 0 || startPosition >= squareSideSize) {
            errorMessage = 'Ship start position out of bounds';
        }

        let endPosition = startPosition + ship.size;
        if (endPosition < 0 || endPosition > squareSideSize) {
            errorMessage = 'Ship end position out of bounds';
        }

        for (let index = startPosition; index < endPosition; index++) {
            if(isHorizontal){
                affectedGridCells.push(new CellCoordinate(startPosition, index));
            } else {
                affectedGridCells.push(new CellCoordinate(index, startPosition));
            }
        }

        return {errorMessage, affectedGridCells};
    }
}