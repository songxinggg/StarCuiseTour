
import { RunState } from "../../const/GameEnum";
import IPlayerModuleBase from "./base/IPlayerModuleBase";
import { ModuleBaseS } from "./base/ModuleBase";
import { PlayerModuleManager } from "./managers/ModuleManager";
import PlayerManager from "./managers/PlayerManager";
import { ActionModuleS } from "./modules/ActionModule";
import { PlayerData } from "./PlayerData";
import PlayerInfo from "./PlayerInfo";
import PlayerModuleClient from "./PlayerModuleClient";
export default class PlayerModuleServer extends ModuleS<PlayerModuleClient, PlayerData> implements IPlayerModuleBase {
    public moduleMap: Map<string, ModuleBaseS> = new Map()
    protected onStart(): void {
        const arr = PlayerModuleManager.instance.moduleMap.get(RunState.Server)
        for (const constructor of arr) {
            const module = new constructor(this) as ModuleBaseS
            module.onStart()
            this.moduleMap.set(constructor.name, module)
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (!player) return
            for (const [name, module] of this.moduleMap) {
                module.onPlayerLeft(player)
            }
            PlayerManager.instance.deletePlayer(player.playerId)
        } catch (error) {
            console.error("PlayerModuleServer.onPlayerLeft", error)
        }
    }

    public getDataByPlayer(player: mw.Player | number) {
        return this.getPlayerData(player)
    }

    public async net_OnEnterScene(playerName: string) {
        const player = this.currentPlayer
        const playerID = player.playerId
        const data = this.currentData
        for (const [name, module] of this.moduleMap) {
            await module.onPlayerEnterGame(player)
        }
        if (playerID && !PlayerManager.playerInfoMap.has(playerID)) {
            const script = await mw.Script.spawnScript(PlayerInfo, true) as PlayerInfo
            script.init(player)
            script.myName = playerName
        }
    }

    public net_Chat(content: string) {
        if (this.currentPlayer) {
            PlayerManager.instance.chat(content, this.currentPlayer)
        }
    }


    //#region 人物动作姿态模块

    public net_LeaveInteract(player: mw.Player, id: number) {
        const module = this.moduleMap.get(ActionModuleS.name) as ActionModuleS
        if (!module) return
        module.net_LeaveInteract(player, id)
    }

    //#endregion
}