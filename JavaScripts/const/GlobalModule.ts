import { GameModuleC } from "../modules/gameModule/GameModuleC"
import PlayerModuleClient from "../modules/player/PlayerModuleClient"
import PlayerModuleServer from "../modules/player/PlayerModuleServer"


export class GlobalModule {
    private static _playerModuleC: PlayerModuleClient
    private static _playerModuleS: PlayerModuleServer
    private static _gameModuleC: GameModuleC
    static get MyPlayerC() {
        if (!this._playerModuleC) {
            this._playerModuleC = ModuleService.getModule(PlayerModuleClient)
        }
        if (!this._playerModuleC) {
            console.info("playerModuleC is not Ready")
            return null;
        }
        return this._playerModuleC
    }

    static get MyPlayerS() {
        if (!this._playerModuleS) {
            this._playerModuleS = ModuleService.getModule(PlayerModuleServer)
        }
        if (!this._playerModuleS) {
            console.info("playerModuleS is not Ready")
            return null;
        }
        return this._playerModuleS
    }

    static get GameModuleC() {
        if (!this._gameModuleC) {
            this._gameModuleC = ModuleService.getModule(GameModuleC)
        }
        if (!this._gameModuleC) {
            console.info("gameModuleC is not Ready")
            return null;
        }
        return this._gameModuleC
    }
}