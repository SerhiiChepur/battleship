import { BattleFieldRepository } from '../repository/BattleFieldRepository.interface';
import { GameStrategyMode } from '../enum/GameStrategyMode.enum';
import { GameAction } from '../model/GameAction.model';
import { BattleField } from '../model/BattleField.model';
import { BattleStatus } from '../enum/BattleStatus.enum';
import { ActionResult } from '../enum/ActionResult.enum';
import { ShipsAllocationStrategyBase } from '../game-strategy/ShipsAllocationStrategyBase';
import { ShipsCanBePlacedNearby } from '../game-strategy/ShipsCanBePlacedNearby.strategy';
import { ShipBase } from '../model/ShipBase.model';
import { ActionType } from '../enum/ActionType.enum';

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
        if (battleField.currentStatus !== BattleStatus.init) {
            throw new Error(`Ships could be added only during the game init step`);
        }

        const playerShipsCount = await this.battleRepository.getShipCountByPlayer(battleField.battleFieldId, playerId);
        if (playerShipsCount) {
            throw new Error(`Your ships already placed on battlefield`);
        }

        const battleStrategy = this.getShipsAllocationStrategy(battleField.gameMode);
        battleStrategy.checkShipsAllocation(battleField, ships);

        return await this.battleRepository.insertShips(battleFieldId, playerId, ships);
    }

    /**
     * interactWithCell
     */
    public async interactWithCell(gameActionInput: GameAction) {
        const battleField = await this.battleRepository.getBattleField(gameActionInput.battleFieldId);
        switch (battleField.currentStatus) {
            case BattleStatus.init:
            case BattleStatus.paused:
            case BattleStatus.end:
                return ActionResult.invalidAction;
            case BattleStatus.active:
                return this.activeInteraction(battleField, gameActionInput);
            default:
                throw new Error(`Unhandled game status: ${battleField.currentStatus}`);
        }
    }

    private activeInteraction(battleField: BattleField, gameActionInput: GameAction): ActionResult {
        const battleStrategy = this.getShipsAllocationStrategy(battleField.gameMode);
       // this.
        switch(gameActionInput.actionType){
            case ActionType.shot: {
                break;
            }
            default: 
            throw new Error(`The ${gameActionInput.actionType} action is not supported yet`);
        }
        throw new Error('Method not implemented.');
    }

    private getShipsAllocationStrategy(gameMode: GameStrategyMode): ShipsAllocationStrategyBase {
        switch (gameMode) {
            case GameStrategyMode.shipsCanBePlacedNearby:
                return new ShipsCanBePlacedNearby();
            default:
                throw new Error(`The ${gameMode} is not supported yet`);
        }
    }
}