
import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { BagModuleDataHelper } from "./BagDataHelper";
import { BagModuleC } from "./BagModuleC";
import { BagUtils } from "./BagUtils";

export class BagModuleS extends ModuleS<BagModuleC, BagModuleDataHelper>{

    private _allItemCfg: Map<number, IItemElement> = new Map();
    private _failPlayers: number[] = [];

    protected onStart(): void {
        GameConfig.Item.getAllElement().forEach(item => {
            this._allItemCfg.set(item.ID, item);
        })
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        console.error("TS3:玩家加入", player?.userId);
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            const playerID = player.playerId
            const index = this._failPlayers.indexOf(playerID)
            if (index != -1) this._failPlayers.splice(index, 1)
            let userID = player?.userId
            console.error("TS3:玩家离开", userID);
        }
        catch (e) {
            console.error("TS3:玩家离开error", e);
        }
    }

    public async net_Login(name: string, gender: string) {
        let player = this.currentPlayer;
        let pid = player ? player.playerId : 0;
        if (pid < 1) {
            console.error("TS3:玩家登陆ID获取失败");
            return;
        }

        BagUtils.nameMap.set(pid, [name, gender]);
        let keys: number[] = [];
        let lens: number[] = [];
        let array: string[] = [];
        for (let [key, value] of BagUtils.nameMap) {
            keys.push(key);
            lens.push(value.length);
            array = array.concat(value);
        }
        this.getAllClient().net_setName(keys, lens, array);
    }

    public net_OnGive(playerId: number, itemId: number): void {
        this.getClient(playerId)?.net_OnInvite(this.currentPlayerId, itemId);
    }

    public net_Accept(playerId: number, itemId: number): void {
        this.getClient(playerId).net_OnAccept(this.currentPlayerId, itemId);
    }

    /**
     * 使用道具时，是否可做其他交互，无互斥返回true
     * @param configId 
     * @param playerId 
     * @returns 
     */
    public isCanDoElse(configId: number, playerId: number): boolean {
        return true;
    }

    /** 
     * 添加物品数量
     * @param  id
     * @param  count
     * @param  player
     * @return 
     */
    public net_AddItem(id: number, count: number, isBar: boolean, isSelect: boolean, player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        this.addItem(id, count, isBar, isSelect, player);
    }

    /** 
     * 添加物品
     * @param  id      配置ID
     * @param  count   数量
     * @param  isBar   是否加入快捷栏，还需要配置表里isShowInBar为true值
     * @param  player  
     * @return 
     */
    public addItem(id: number, count: number, isBar: boolean, isSelect: boolean, player: mw.Player) {
        const config = this._allItemCfg.get(id);
        const data = this.getPlayerData(player)
        if (!config) {
            console.error("配置表中没有此物品", id);
            return;
        }
        const isList = data.addItem(config, count, player);
        for (const itemId of isList) {
            if (isBar && config.isShowInBar) {
                this.addShortcutBarItem(itemId, isSelect, player)
            }
        }
    }

    /** 
     * 删除道具
     * @param  id
     * @param  player
     * @return 
     */
    public net_DeleteItem(id: string, player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        this.getPlayerData(player).deleteItem(id, player);
    }

    public net_RefreshShortcutBar(equips: string[], player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        if (player && player.userId)
            this.getPlayerData(player).refreshShortcutBar(equips);
    }

    /**
     * 添加快捷栏物品
     * @param id 
     * @param type 
     * @param player 
     * @returns 
     */
    public net_AddShortcutBarItem(id: string, index: number, player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        this.getPlayerData(player).addShortcutBarItem(id, index);
    }

    /** 
     * 将物品放入快捷栏
     * @param  id
     * @param  player
     * @return 
     */
    public addShortcutBarItem(id: string, isSelect: boolean, player: mw.Player) {
        this.getClient(player).net_AddShortcutBarItem(id, isSelect)
    }

    /**
     * 减少快捷栏物品
     * @param id 
     * @param player 
     * @returns 
     */
    public net_RemoveShortcutBarItem(id: string, player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        this.getPlayerData(player).removeShortcutBarItem(id);
    }

    /**
     * 清空快捷栏
     * @param player 
     * @returns 
     */
    public net_ClearShortCutBar(player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        try {
            this.getPlayerData(player).clearShortCutBar()
        }
        catch (e) {
            console.error(e)
        }
        return true;
    }

    /** 
     * 使用道具
     * @param  id
     * @param  count
     * @return 
     */
    public net_UseItem(id: string, count: number, player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        this.getPlayerData(player).useItem(id, count, player)
    }

    /** 
     * 更换选中快捷栏物品
     * @param  id
     * @return 
     */
    public net_ChangEquipItem(id: string, player?: mw.Player) {
        if (!player) {
            player = this.currentPlayer
        }
        this.getPlayerData(player).changEquipItem(id);
        return true
    }

    /** 
     * 添加物品数量
     * @param  id
     * @param  count
     * @return 
     */
    public addTmpItem(data, playerID: number) {
        let playerData = this.getPlayerData(playerID);
        for (let d of data) {
            playerData && playerData.addTempItem(d.id, d.count);
        }
    }

}
