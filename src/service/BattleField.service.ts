import { BattleFieldRepositoryInterface } from '../repository/BattleFieldRepository.interface';
import { Ship } from '../model/Ship.model';
import { GameStrategyMode } from '../enum/GameStrategyMode.enum';

export class BattleFieldService {
    private readonly battleRepository!: BattleFieldRepositoryInterface;
    /**
     * initBattlefield
     */
    public createBattlefield(squareSideSize: number, gameMode: GameStrategyMode, battleStarterId: number) {
        
    }

    /**
     * checkAndPutShips
     */
    public checkAndPutShips(battleParticipantId: number, ships: Ship[]) {
        
    }

    /**
     * shipAttackOnBattlefield
     */
    public shipAttackOnBattlefield() {
        
    }
}