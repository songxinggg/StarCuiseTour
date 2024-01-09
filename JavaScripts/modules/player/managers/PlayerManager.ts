import { GameConfig } from "../../../config/GameConfig";
import { EventsName, PlayerStateType, TitleType } from "../../../const/GameEnum";
import { getMyPlayerID } from "../../../ExtensionType";
import GameUtils, { single } from "../../../utils/GameUtils";
import PlayerInfo from "../PlayerInfo";
import PlayerModuleClient from "../PlayerModuleClient";
import PlayerModuleServer from "../PlayerModuleServer";

enum PlayerInfoEvent {
    net_StateChange = "net_StateChange",
    net_TitleChange = "net_TitleChange",
    net_setTitleVis = "net_showTitle",
    net_PlayerChat = "net_PlayerChat",
    net_AddPlayerBuff = "net_AddPlayerBuff",
    net_RemovePlayerBuff = "net_RemovePlayerBuff",

    net_setPlayerVis = "net_setPlayerVis",
}
@single()
export default class PlayerManager {
    public static instance: PlayerManager = null
    public static playerInfoMap: Map<number, PlayerInfo> = new Map()
    private _attrChanges: { playerID: number[], attrType: number[], num: number[], } = { playerID: [], attrType: [], num: [] }

    private _moduleC: PlayerModuleClient
    private get moduleC() {
        if (SystemUtil.isServer()) return null
        if (!this._moduleC) this._moduleC = ModuleService.getModule(PlayerModuleClient)
        return this._moduleC
    }

    private _moduleS: PlayerModuleServer
    private get moduleS() {
        if (SystemUtil.isClient()) return null
        if (!this._moduleS) this._moduleS = ModuleService.getModule(PlayerModuleServer)
        return this._moduleS
    }

    constructor() {
        this.eventInit()
        Event.addLocalListener("Player_Init", (playerID: number, info: PlayerInfo) => {
            PlayerManager.playerInfoMap.set(playerID, info)
        })

    
    }

    private eventInit() {
        if (SystemUtil.isServer()) {
            Event.addClientListener(PlayerInfoEvent.net_setPlayerVis, (player: mw.Player, type: mw.PropertyStatus, replicet: boolean) => {
                player.character.setVisibility(type, replicet)
            })


            Event.addClientListener(PlayerInfoEvent.net_StateChange, (player: mw.Player, stateType: PlayerStateType, bool: boolean, playerID: number) => {
                this.setPlayerState(stateType, bool, playerID)
            })
            Event.addClientListener(PlayerInfoEvent.net_TitleChange, (player: mw.Player, title: string, type: TitleType) => {
                this.changeTitle(title, type, player)
            })

            Event.addClientListener(PlayerInfoEvent.net_setTitleVis, (player: mw.Player, show: mw.PropertyStatus) => {
                Event.dispatchToAllClient(PlayerInfoEvent.net_setTitleVis, player.playerId,show)
            })
        } else {
            Event.addServerListener(PlayerInfoEvent.net_PlayerChat, (chat: string, playerID: number) => {
                this.chat(chat, playerID)
            })

            Event.addServerListener(PlayerInfoEvent.net_setTitleVis, (pid: number, show: mw.PropertyStatus) => {
                if(Player.getPlayer(pid))
                this.setPlayerTitleVis(Player.getPlayer(pid),show,false)
            })


            
        }
    }

    public deletePlayer(playerID: number) {
        if (PlayerManager.playerInfoMap.has(playerID)) {
            PlayerManager.playerInfoMap.get(playerID).destroy()
            PlayerManager.playerInfoMap.delete(playerID)
        }
    }

    public setPlayerState(stateType: PlayerStateType, bool: boolean, player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_StateChange, stateType, bool, playerID)
            }
            info.setState(stateType, bool)
        }
    }

    public playerIsFree(player?: mw.Player | number): boolean {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (info.myState == PlayerStateType.None) return true
        }
        return false
    }

    public playerIsDead(player?: mw.Player | number): boolean {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (info.myState == PlayerStateType.Dead) return true
        }
        return false
    }

    public playerIsUsingSkill(player?: mw.Player | number): boolean {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (info.myState == PlayerStateType.isUsingSkill) return true
        }
        return false
    }

    public changeTitle(title: string, type?: TitleType, player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_TitleChange, title, type ? type : info.titleType)
            } else {
                info.myTitle = title
                info.titleType = type
            }
        }
    }

    public resetTitle(player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const title =GameUtils.getTxt("Text_Text_984")
            const titleType = GameConfig.TitleStyle.getElement(5).Type
            if (SystemUtil.isClient()) {
                Event.dispatchToServer(PlayerInfoEvent.net_TitleChange, title, titleType)
            } else {
                const info = PlayerManager.playerInfoMap.get(playerID)
                info.myTitle = title
                info.titleType = TitleType[titleType]
            }
            return title
        }
    }

    public showAllTitle() {
        if (SystemUtil.isServer()) return
        Player.getAllPlayers().forEach(player => {
            player.character.overheadUI.setVisibility(mw.PropertyStatus.On)
        })
    }


    public setPlayerTitleVis(playe:mw.Player,show:mw.PropertyStatus,sync:boolean = true) {
        if (SystemUtil.isServer()) return
        if(sync){
            Event.dispatchToServer(PlayerInfoEvent.net_setTitleVis,show)                                                   
        } else {
            playe.character.overheadUI.setVisibility(show)
        }
    }

    public chat(str: string, player?: mw.Player | number) {
        const playerID = this.hasPlayer(player)
        if (playerID != 0) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (SystemUtil.isClient()) {
                info.showChat(str)
            } else {
                for (const i of PlayerManager.getNearPlayer(info.character, 3000)) {
                    Event.dispatchToClient(i.player, PlayerInfoEvent.net_PlayerChat, str, playerID)
                }
            }
        }
    }


    public setPlayerVis(player: mw.Player, type: mw.PropertyStatus, replicet: boolean) { 
        if (SystemUtil.isServer()) {
            player.character.setVisibility(type, replicet)
          
        } else {
            Event.dispatchToServer(PlayerInfoEvent.net_setPlayerVis,type,replicet)
        }
    }

    //#endregion

    private hasPlayer(player: mw.Player | number): number {
        if (!player) player = getMyPlayerID()
        const playerID = typeof player === "number" ? player : player.playerId
        if (playerID && PlayerManager.playerInfoMap.has(playerID)) {
            return playerID
        }
        return 0
    }

    /**
     * @description: 获得范围内的所有玩家
     * @param {Core} core
     * @param {number} range
     * @param {boolean} containSelf 是否包含自己
     * @return {*}
     */
    public static getNearPlayer(core: mw.GameObject, range: number, containSelf: boolean = true): PlayerInfo[] {
        let infos: PlayerInfo[] = []
        for (const [index, info] of PlayerManager.playerInfoMap) {
            if (info.character) {
                if (info.character.gameObjectId == core.gameObjectId) {
                    if (containSelf) infos.push(info)
                    continue;
                }
                const loc = info.character.worldTransform.position
                if (GameUtils.inDistance(core.worldTransform.position, loc, range)) {
                    infos.push(info)
                }
            }
        }
        return infos
    }

    /**
     * @description: 获取范围内最近的玩家
     * @param {Core} core
     * @param {number} range
     * @return {*}
     */
    public static getNearestPlayer(core: mw.GameObject, range: number): PlayerInfo {
        let result = null
        let max = range * range
        for (const [index, info] of PlayerManager.playerInfoMap) {
            if (info.character) {
                if (info.character.gameObjectId == core.gameObjectId) {
                    continue;
                }
                const loc = info.character.worldTransform.position
                let distance = Vector.squaredDistance(core.worldTransform.position, loc)
                if (distance < max) {
                    max = distance
                    result = info
                }
            }
        }
        return result
    }

    /**
     * @description: 判断玩家是否在范围内
     * @param {Gameplay} player 
     * @param {number} range
     * @param {Core} pos
     * @return {*}
     */
    public static playerInRange(player: mw.Player | number, range: number, pos: mw.Vector) {
        const playerID = typeof player === "number" ? player : 0
        if (playerID && PlayerManager.playerInfoMap.has(playerID)) {
            const info = PlayerManager.playerInfoMap.get(playerID)
            if (info.character) {
                return GameUtils.inDistance(info.character.worldTransform.position, pos, range)
            }
        }
        return false
    }

    private _updateIndex = 0
    public update(dt: number) {
    }
}
PlayerManager.instance