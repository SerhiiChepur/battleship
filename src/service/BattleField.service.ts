import { GameStrategyMode, BattleStatus, ActionResult, ActionType } from "../enum";
import { ShipsAllocationStrategyBase, ShipsCanBePlacedNearby } from "../game-strategy";
import { ShipBase, GameAction, BattleField } from "../model";
import { BattleFieldRepository } from "../repository";
import { CellCoordinate } from '../model/CellCoordinate.model';
import { StandartActionStrategy } from '../game-strategy/StandartActionStrategy';


export class BattleFieldService {
    private readonly battleRepository!: BattleFieldRepository;
    /**
     * initBattlefield
     */
    public createBattlefield(squareSideSize: number, gameMode: GameStrategyMode, battleStarterId: number) {
        
    }

    /**
     * putShipsOnBattleField
     */
    public async putShipsOnBattleField(battleFieldId: number, playerId: number, ships: ShipBase[]) {
        const battleField = await this.battleRepository.getBattleField(battleFieldId);
        if (battleField.status !== BattleStatus.init) {
            throw new Error(`Ships could be added only during the game init step`);
        }

        const playerShipsCount = await this.battleRepository.getShipCountByPlayer(battleField.battleFieldId, playerId);
        if (playerShipsCount) {
            throw new Error(`Your ships already placed on battlefield`);
        }

        const allocationStrategy = this.getShipsAllocationStrategy(battleField.gameMode);
        allocationStrategy.checkShipsAllocation(battleField, ships);

        const allocatedPlayerShips = await this.battleRepository.insertShips(battleFieldId, playerId, ships);
        if (await this.battleRepository.isAllPlayersShipsAllocated(battleFieldId)){
            await this.battleRepository.updateBattleField({battleFieldId, status: BattleStatus.active});
        }

        return allocatedPlayerShips;
    }

    /**
     * interactWithCell
     */
    public async interactWithCell(gameActionInput: GameAction) {
        const battleField = await this.battleRepository.getBattleField(gameActionInput.battleFieldId);
        switch (battleField.status) {
            case BattleStatus.init:
            case BattleStatus.end:
                return ActionResult.invalidAction;
            case BattleStatus.active:
                return await this.activeInteraction(battleField, gameActionInput);
            default:
                throw new Error(`Unhandled game status: ${battleField.status}`);
        }
    }

    private async activeInteraction(battleField: BattleField, gameActionInput: GameAction) {
        const battleStrategy = this.getShipsActionStrategy(battleField.gameMode);
        const { cellX: row, cellY: col, playerId: userId, actionType: action } = gameActionInput;
        const cellCoordinate = new CellCoordinate(row, col);
        await battleStrategy.cellInteractAsync (
                userId, 
                cellCoordinate, 
                action, 
                battleField, 
                this.battleRepository.getActionHistory, 
                this.battleRepository.getRelatedCellShips
            );
    }

    private getShipsAllocationStrategy(gameMode: GameStrategyMode) {
        switch (gameMode) {
            case GameStrategyMode.shipsCanBePlacedNearby:
                return new ShipsCanBePlacedNearby();
            default:
                throw new Error(`The ${gameMode} is not supported yet`);
        }
    }

    private getShipsActionStrategy(gameMode: GameStrategyMode) {
        switch (gameMode) {
            case GameStrategyMode.shipsCanBePlacedNearby:
                return new StandartActionStrategy();
            default:
                throw new Error(`The ${gameMode} is not supported yet`);
        }
    }
}