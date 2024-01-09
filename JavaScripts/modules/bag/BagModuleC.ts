
import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { EventsName } from "../../const/GameEnum";
import { MyBoolean } from "../../const/GlobalData";
import Tips from "../../ui/commonUI/Tips";
import { BagModuleDataHelper, FactionType, ItemInfo, ItemType, TagType } from "./BagDataHelper";
import { BagModuleS } from "./BagModuleS";
import { BagUtils } from "./BagUtils";
import { BagHub } from "./ui/BagHub";
import { BagInteraction } from "./ui/BagInteraction";
import { BagPanel } from "./ui/BagPanel";

export class BagModuleC extends ModuleC<BagModuleS, BagModuleDataHelper>{

    private _allItemCfg: Map<number, IItemElement> = new Map();

    public tempItem: { [key: string]: ItemInfo } = {};

    /**刷新快捷栏 */
    public readonly onRefreshBar: mw.Action = new mw.Action();

    /**得到赠送回应 */
    public readonly onGiftRespond: mw.Action = new mw.Action();

    /**当前选择的快捷栏物品ID */
    public get curEquip() {
        return this.data.curEquip
    }


    public onCashChange: mw.Action1<number> = new mw.Action1();

    /**
     * 获取所有道具
     */
    public get items() {
        return this.data.items
    }

    /**
     * 获取快捷栏插槽物品信息
     */
    public get equipSlots() {
        return this.data.equipSlots
    }

    protected onStart(): void {
        const allItemLst = GameConfig.Item.getAllElement()
        for (const item of allItemLst) {
            this._allItemCfg.set(item.ID, item);
        }
        Event.addLocalListener(EventsName.UseSkill, (configID: number) => {
            if (configID == 0) return;
            this.useItem(configID)
        })
    }

    protected onEnterScene(sceneType: number): void {
        let name = mw.AccountService.getNickName() || "LZZ";
        let gender = "1";
        let player = Player.localPlayer;
        let appearance = player.character.getDescription();
            let type = appearance.advance.base.characterSetting.somatotype;
            if ([mw.SomatotypeV2.AnimeFemale, mw.SomatotypeV2.LowpolyAdultFemale, mw.SomatotypeV2.RealisticAdultFemale].includes(type)) {
                gender = "2";
            }
        this.server.net_Login(name, gender);
        UIManager.show(BagHub)
        if (!this.items[140016]) { 
           this.addItem(140016, 1, false)
        }
        this.addShortcutBarItem(140016, true)
        let i = 0;
        for (const item of Object.values(this.items)) { 
            const id = item.configID;
            if (Math.floor(id / 10000) == 15&&this.addShortcutBarItem(id, false)) {
                i++;
                if (i >=4) {
                    break;
                }
            }
        }
        this.onCashChange.call(this.getItem(90006)?.count||0)
    }

    public net_setName(keys: number[], lens: number[], array: string[]): void {
        let key = 0;
        let target = [];
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            target = [];
            for (let index = 0; index < lens[i]; index++) {
                target.push(array.shift());
            }
            BagUtils.nameMap.set(key, target);
        }
    }

    /**
     * 给予玩家道具
     * @param playerList 
     */
    public onGive(playerId: number): void {
        const item = this.getCurEquipItem();
        if (item) {
            this.server.net_OnGive(playerId, item.configID);
        }
    }

    /**
     * 被赠送者收到邀请
     * @param playerId 
     * @param itemId 
     */
    public net_OnInvite(playerId: number, itemId: number): void {
        UIManager.show(BagInteraction, playerId, itemId)
    }

    /**
     * 被赠送者回应邀请
     * @param playerId 
     * @param itemId 
     */
    public onAcceptItem(playerId: number, itemId: number) {
        if (!playerId) {
            return
        }
        this.addItem(itemId)
        this.server.net_Accept(playerId, itemId);
    }

    /**
     * 赠送发起者得到回应
     * @param playerId 
     * @param itemId 
     * @returns 
     */
    public net_OnAccept(playerId: number, itemId: number): void {
        if (itemId === 0) {
            Tips.show(BagUtils.getName(playerId) + GameConfig.SquareLanguage.Danmu_Content_1074.Value);
            return;
        } else if (itemId === -1) {
            Tips.show(BagUtils.getName(playerId) + GameConfig.SquareLanguage.Danmu_Content_1074.Value);
            return;
        }
        Tips.show(BagUtils.getName(playerId) + GameConfig.SquareLanguage.Danmu_Content_1073.Value);
        this.useItem(itemId)
        this.removeShortcutBarItem(itemId)
    }

    /**
     * 获取当前物品
     * @returns 
     */
    getCurEquipItem(): ItemInfo {
        return this.tempItem[this.curEquip] || this.items[this.curEquip];
    }

    /** 
     * 获取快捷栏物品
     * @param  isDis 是否丢弃空插槽
     * @return 
     */
    public getEquipItems(isDis: boolean = true) {
        const items: ItemInfo[] = []
        for (const id of this.equipSlots) {
            const item = this.tempItem[id] || this.items[id];
            if (isDis && !item) {
                continue;
            }
            items.push(item);
        }
        return items;
    }

    /**
    * 根据标签获取物品
    * @param tag 
    * @returns 
    */
    public getItemsByTag(tag: TagType, isSort: boolean = false) {
        const items: ItemInfo[] = [];
        for (const item of Object.values(this.items)) {
            const config = this._allItemCfg.get(item.configID)
            if (config && config.TagType === tag) {
                items.push(item);
            }
        }

        if (tag === TagType.Tarot) {
            this.pushCoinItem(items, 90006)
        }
        if (isSort) {
            items.sort((a, b) => {
                const aCfg = this._allItemCfg.get(a.configID)
                const bCfg = this._allItemCfg.get(b.configID)
                return bCfg.Quality - aCfg.Quality
            })
        }
        return items;
    }

    private pushCoinItem(items: ItemInfo[], id: number) {
        let item: ItemInfo = this.items[id]
        if (!item) {
            item = new ItemInfo();
            item.id = id.toString()
            item.configID = id
            item.count = 0;
            items.push(item)
        }
    }

    /**
     * 根据派系获取物品（默认获取所有派系，且是背包内最高等级）
     * @param factions 
     * @returns 
     */
    public getItemsByFaction(factions: FactionType[] = [FactionType.Fly, FactionType.Creation, FactionType.Fight]) {
        const items: number[] = [];
        for (const item of Object.values(this.items)) {
            const config = this._allItemCfg.get(item.configID)
            if (config && factions.includes(config.Faction)) {
                items.push(item.configID);
            }
        }
        return items;
    }

    /**
     * 根据类型获取物品
     * @param type 
     */
    public getItemsByType(type: ItemType) {
        const items: ItemInfo[] = [];
        for (const item of Object.values(this.items)) {
            const config = this._allItemCfg.get(item.configID)
            if (config && config.ItemType === type) {
                items.push(item);
            }
        }
        return items;
    }

    /**
     * 获取物品
     * @param id 
     * @returns 
     */
    public getItem(id:number) {
        const config = this._allItemCfg.get(id);
        if (!config) {
            return;
        }
        return this.items[id];
    }


    /** 
     * 添加物品数量
     * @param  id
     * @param  count
     * @return 
     */
    public addItem(id: number, count: number = 1, isBar = true, isSelect: boolean = false) {
        const config = GameConfig.Item.getElement(id);
        if (!config) {
            return;
        }

        const idList = this.data.addItem(config, count);
        if (config.ID == 90006) {
            this.onCashChange.call(this.getItem(90006).count)
        }
        this.server.net_AddItem(id, count, isBar, isSelect);
        !config.isShowInBar && this.onRefreshBar.call()
    }

    /** 
     * 删除道具
     * @param  id
     * @return 
     */
    public deleteItem(id: string) {
        this.server.net_DeleteItem(id);
        this.data.deleteItem(id);
    }

    /**
     * 更新快捷栏 
     * @param  equips
     * @return 
     */
    public refreshShortcutBar(equips: string[]) {
        this.server.net_RefreshShortcutBar(equips);
        this.data.refreshShortcutBar(equips);
    }
    
    /**派对开启时拿出变身道具 */
    public getPartyItem() { 
        UIManager.hide(BagPanel)
        this.clearShortCutBar()
        let i = 0;
        for (const item of Object.values(this.items)) { 
            const id = item.configID;
            if (Math.floor(id / 10000) == 15) {
                this.addShortcutBarItem(id, false)
                i++;
                if (i >=4) {
                    break;
                }
            }
        }

    }




    /** 
     * 添加快捷栏物品
     * @param  configID 配置ID
     * @return 添加成功或者失败
     */
    public addShortcutBarItem(id: string | number, isSelect: boolean): boolean {
        if (typeof id === "number") {
            id = id.toString()
        }
        let index = this.equipSlots.indexOf(id, 1) //判断是否已经在快捷栏了
        if (index !== -1) {
            return true;
        }
        const config = this._allItemCfg.get(Number(id));
        if (!config) {
            console.error("addShortcutBarItem 道具表没有此道具:", id);
            return false;
        }
        if (!this.getItem(Number(id))) { 
            return false;
        }
        if (config.Faction) {
            index = 0;
        } else {
            index = this.equipSlots.indexOf("", 1)
            if (index === -1) {
                Tips.show(GameConfig.SquareLanguage.Danmu_Content_1367.Value);
                return false;
            }
        }
        this.server.net_AddShortcutBarItem(id, index);
        this.data.addShortcutBarItem(id, index);
        if (isSelect) {
            this.changEquipItem(id);
        }
        this.onRefreshBar.call()
        return true;
    }

    /** 
     * 添加造物道具
     * @param  configID
     * @param  count
     * @return 
     */
    public addCreationItem(configID: number, count: number = 1, isSelect = true) {
        const id = configID.toString()
        let index = this.equipSlots.indexOf(id, 1)
        if (index === -1) {
            index = this.equipSlots.indexOf("", 1)
        }
        if (index === -1) {
            Tips.show(GameConfig.SquareLanguage.Danmu_Content_1367.Value);
            return;
        }
        this.server.net_AddShortcutBarItem(id, index);
        this.data.addShortcutBarItem(id, index);
        /**添加造物道具，不存储数据 */
        const item = this.tempItem[id];
        const config = this._allItemCfg.get(configID)
        let orgNum = 0;
        if (item) {
            orgNum = item.count;
        }
        const num = count + orgNum > config.MaxCount ? config.MaxCount : count + orgNum;
        const tempItem: ItemInfo = new ItemInfo()
        tempItem.id = id
        tempItem.configID = configID
        tempItem.count = num
        this.tempItem[id] = tempItem;
        if (isSelect) {
            this.changEquipItem(id);
        }
        this.onRefreshBar.call()
    }

    public net_AddShortcutBarItem(id: string, isSelect: boolean) {
        this.addShortcutBarItem(id, isSelect)
    }

    /**
     * 移除快捷栏物品(造物道具)
     * @param id 
     */
    public removeShortcutBarItem(id: string | number) {
        if (typeof id === "number") {
            id = id.toString()
        }
        this.server.net_RemoveShortcutBarItem(id);
        this.data.removeShortcutBarItem(id);
        /**删除造物道具 */
        const item = this.tempItem[id];
        if (item) {
            delete this.tempItem[id];
        }
        this.onRefreshBar.call()
    }

    /**
     * 清空快捷栏
     * @returns 
     */
    public clearShortCutBar() {
        this.server.net_ClearShortCutBar();
        this.data.clearShortCutBar();
        this.tempItem = {};
        this.onRefreshBar.call()
    }

    public useItem(configID: number, count = 1) {
        const config = this._allItemCfg.get(configID);
        const item = this.getItem(configID)
        if (!item) {
            return;
        }
        if (this.items[item.id]) { 
            this.items
        }
        if (this.tempItem[item.id]) {
            this.useTempItem(item.id, count);
        } else if ([ItemType.Consumable,ItemType.Money].includes(config.ItemType)) {
            this.useConsumeItem(item.id, count);
        }
        if (config.ID == 90006) {
            this.onCashChange.call(this.getItem(90006).count)
        }
    }

    /** 
     * 使用消耗类道具
     * @param  id
     * @param  count
     * @return 
     */
    public useConsumeItem(id: string, count: number = 1) {
        this.server.net_UseItem(id, count);
        const num = this.data.useItem(id, count)
        this.onRefreshBar.call()
        return num
    }

    /** 
     * 使用造物道具
     * @param  id
     * @param  count
     * @return 
     */
    public useTempItem(id: string, count: number = 1) {
        const item = this.tempItem[id];
        let num = 0;
        if (item) {
            num = item.count -= count;
            if (num <= 0) {
                this.removeShortcutBarItem(id)
            } else {
                this.onRefreshBar.call()
            }
        } else {
        }
        return num
    }

    /**
     * 使用广场道具
     * @param propId 
     */
    public useSquareItem(propId: number) {
        const info = GameConfig.PropAction.getElement(propId)
        if (!info || !MyBoolean(info.isReduce)) {
            return
        }
        const id = info.ItemID.toString();
        if (this.tempItem[id]) {
            this.useTempItem(id);
            return
        }
        if (this.items[id]) {
            this.useConsumeItem(id);
            return
        }
    }

    /** 
     * 更换选中快捷栏物品
     * @param  id
     * @return 
     */
    public changEquipItem(id: string, isRefresh: boolean = false) {
        this.data.changEquipItem(id)
        this.server.net_ChangEquipItem(id);
        if (isRefresh) {
            this.onRefreshBar.call()
        }
    }

    /** 
     * 添加物品数量
     * @param  id
     * @param  count
     * @return 
     */
    public addTmpItem(data: any) {
        for (let d of data) {
            this.data.addTempItem( d.id, d.count);
        }
    }
}