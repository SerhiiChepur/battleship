import { BattleField } from '../model/BattleField.model';
import { Ship } from '../model/Ship.model';
import { GameStrategyBase } from './GameStrategyBase';
import { ShipType } from '../enum/ShipType.enum';
import { ShipBase } from '../model/ShipBase.model';
import { CellCoordinate } from '../model/CellCoordinate.model';
import { ShipDirection } from '../enum/ShipDirection.enum';

const RULES_VIOLATION_BOARD_MSG = 'Rules violation: board';

export class ShipsCanBePlacedNearby extends GameStrategyBase {
    private readonly shipsConstraints!: Map<ShipType, number>;
    constructor() {
        super();
        this.shipsConstraints = new Map<number, number>([
            [ShipType.Destroyer, 1], 
            [ShipType.Submarine, 2], 
            [ShipType.Cruiser, 1], 
            [ShipType.Battleship, 1],
        ]);
    }

    protected checkShipsForAllocation(ships: ShipBase[]): void {
        const countersPerShipTypes = new Map<ShipType, number>();
        ships.forEach(ship => {
            let shipCounter = countersPerShipTypes.get(ship.shipType) || 0;
            countersPerShipTypes.set(ship.shipType, ++shipCounter);
        });
        this.shipsConstraints.forEach((requiredShipCount, shipType) => {
            const shipsCount = countersPerShipTypes.get(shipType) || 0;
            const countMatch = requiredShipCount === shipsCount;

            if (countMatch) {
                countersPerShipTypes.delete(shipType);
            }
        });

        const errorMessages = new Array<string>();
        if (countersPerShipTypes.values.length) {
            countersPerShipTypes.forEach((shipsCount, shipType) => {
                const requiredCount = this.shipsConstraints.get(shipType);
                const errMessage = requiredCount 
                ? `${RULES_VIOLATION_BOARD_MSG} should contain ${requiredCount} of ${ShipType[shipType]} rather then ${shipsCount}`
                : `${RULES_VIOLATION_BOARD_MSG} could not contain ships of ${ShipType[shipType]} type`
                errorMessages.push(errMessage);
            });
            throw Error(errorMessages.join(',\n'));
        }
    }

    protected getShipsAllocationMock(battleField: BattleField, ships: ShipBase[]): Map<string, Ship[]> {
        const x = new Map<string, ShipBase[]>();
        ships.forEach(ship => {
            const {errorMessage, affectedGridCells} = this.getReservedAreaOrError(ship, battleField.squareSideSize);
            if(!errorMessage){
                const relatedCellKeys = affectedGridCells.map(cell => cell.getPositionKey());
                x.get();
            }
        })
        return 1 as any;
    }

    private getReservedAreaOrError(ship: ShipBase, squareSideSize: number) {
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