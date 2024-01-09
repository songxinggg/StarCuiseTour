

import { PlayerData } from "../PlayerData"
import IPlayerModuleBase from "./IPlayerModuleBase"

interface IModuleBase {
    onStart(): void
}
export abstract class ModuleBase implements IModuleBase {
    constructor(protected module: IPlayerModuleBase) {

    }
    onStart() { }
}

export class ModuleBaseC extends ModuleBase {

    protected get currentPlayer(): mw.Player {
        return this.module["currentPlayer"]
    }
    protected get currentPlayerId(): number {
        return this.module["currentPlayerId"]
    }
    protected get data(): PlayerData {
        return this.module.getDataByPlayer(this.currentPlayerId)
    }

    public onEnterScene(sceneType: number) {
    }
}

export class ModuleBaseS extends ModuleBase {
    protected getPlayerData(player: mw.Player | number): PlayerData {
        return this.module.getDataByPlayer(player)
    }

    public onPlayerEnterGame(player: mw.Player) {
    }

    public onPlayerLeft(player: mw.Player): void {
    }
}