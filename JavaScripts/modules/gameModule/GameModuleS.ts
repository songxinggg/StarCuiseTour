
import TreasureMgr from "../battle/TreasureMgr";
import { IGameModuleC } from "./GameModuleC";

export interface IGameModuleS {
    net_PlayerLogin(nickName: string): void;
    net_playEmojiS(guid: string)
}
//服务端
export class GameModuleS extends ModuleS<IGameModuleC, null> implements IGameModuleS {

    private treasureMgr: TreasureMgr;
    private playerNickNameMap: Map<number, string>;

    async onStart() {
        this.playerNickNameMap = new Map<number, string>();
        this.treasureMgr = await mw.Script.spawnScript(TreasureMgr,true)
    }

    onPlayerLeft(player: mw.Player): void {
        let pid = player?.playerId
        if (this.playerNickNameMap.has(pid)) {
            this.playerNickNameMap.delete(pid);
        }
    }

    public net_PlayerLogin(nickName: string) {
        if (this.playerNickNameMap.has(this.currentPlayerId)) {
            return
        }
        this.playerNickNameMap.set(this.currentPlayerId, nickName)
    }

    public net_playEmojiS(guid: string) {
        this.getAllClient().net_PlayEmojiC(guid, this.currentPlayerId);
    }

    public getAllPlayerNickName() {
        return this.playerNickNameMap;
    }
}