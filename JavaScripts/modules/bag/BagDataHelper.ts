/**
 * @Author       : 陆江帅
 * @Date         : 2023-03-05 11:03:27
 * @LastEditors  : songxing
 * @LastEditTime : 2023-09-22 09:36:26
 * @FilePath     : \mollywoodschool\JavaScripts\modules\bag\BagDataHelper.ts
 * @Description  : 背包数据模块
 */

import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { GlobalData } from "../../const/GlobalData";
export enum TagType {
	/**广场道具 */
	Normal = 1,
	/**魔法类 */
	Magic = 2,
	/**塔罗牌 */
	Tarot = 3,
	/**门票 */
	Ticket = 4,
	/**动作 */
	Action = 5,
	/**碎片 */
	Chip = 6
}

export enum ItemType {
	/**不可消耗 */
	Inconsumable = 1,
	/**消耗耐久 */
	Durability = 2,
	/**消耗数量 */
	Consumable = 3,
	/**动作类 */
	Action = 4,
	/**货币类 */
	Money = 5,
}

export enum FactionType {
	/**飞行 */
	Fly = 1,
	/**造物 */
	Creation = 2,
	/**战斗 */
	Fight = 3,
}

@Serializable
export class ItemInfo {
	/**唯一ID */
	public id: string;
	/**配置ID */
	public configID: number;
	/**道具数量 */
	public count: number;
	/**当前等级 */
	public level?: number;
	/**当前经验值 */
	public curExp?: number;
}

export class BagModuleDataHelper extends Subdata {
	/**物品 */
	@Decorator.persistence()
	public items: { [key: string]: ItemInfo } = {}
	/**快捷栏插槽 */
	@Decorator.persistence()
	public equipSlots: string[];
	/**当前选择的快捷栏物品ID */
	@Decorator.persistence()
	public curEquip: string;
	@Decorator.persistence()
	public isUpdate = false

	public onItemChange: mw.Action2<number, number> = new mw.Action2

	protected get version() {
		return 3;
	}

	public get dataName(): string {
		return "BagModuleDataHelper"
	}

	protected initDefaultData(): void {
		this.items = {};
		this.equipSlots = new Array(GlobalData.maxShortcutBar).fill("");
		this.curEquip = "";
		const allItemLst = GameConfig.Item.getAllElement();
		for (const item of allItemLst) {
			if (item.DefaultCount && !this.items[item.ID]) {
				this.addItem(item, item.DefaultCount);
			}
		}
	}

	protected onDataInit(): void {
		this.equipSlots = new Array(GlobalData.maxShortcutBar).fill("");
		this.curEquip = "";
		if (!this.items) {
			this.items = {};
		}

	}

	/**
	 * 添加物品
	 * @param  id
	 * @param  count
	 * @return
	 */
	public addItem(config: IItemElement, count: number, player?: mw.Player) {
		let idList: string[] = []
		const uid = config.ID.toString();
		let orgNum = 0;
		if (this.items[uid]) {
			orgNum = this.items[uid].count;
		}
		let num = count + orgNum
		if (num > config.MaxCount) {
			num = config.MaxCount
		}
		const item = this.spawnItem(uid, config)
		item.count = num;
		this.items[uid] = item;
		idList.push(uid);
		//this.addTempItem(config.ID, count);

		this.onItemChange.call(this.items[uid].configID, this.items[uid].count)
		this.save(false);
		return idList;
	}

	private spawnItem(id: string, config: IItemElement) {
		const item: ItemInfo = new ItemInfo()
		item.id = "" + id
		item.configID = config.ID
		item.count = 0
		if (config.Faction) {
			item.level = 1;
			item.curExp = 0;
		}
		return item;
	}

	/**
	 * 删除道具
	 * @param  id
	 * @return
	 */
	public deleteItem(id: string, player?: mw.Player) {
		this.removeShortcutBarItem(id);
		delete this.items[id];
		this.save(false);
		return this.items;
	}

	public refreshShortcutBar(equips: string[]) {
		this.equipSlots = equips;
		if (this.curEquip && !this.equipSlots.includes(this.curEquip)) {
			this.curEquip = "";
		}
	}

	public getItemNum(id: number): number {
		let count = this.items[id] ? this.items[id].count : 0;
		return count
	}

	/**
	 * 添加快捷栏物品
	 * @param id
	 * @param type
	 * @returns
	 */
	public addShortcutBarItem(id: string, index: number) {
		this.equipSlots[index] = id;
	}

	/**
	 * 减少快捷栏物品
	 * @param id
	 */
	public removeShortcutBarItem(id: string) {
		const index = this.equipSlots.findIndex(v => v === id);
		if (index !== -1) {
			this.equipSlots[index] = "";
		}
		if (this.curEquip === id) {
			this.curEquip = "";
		}
	}

	/**
	 * 清空快捷栏
	 * @returns
	 */
	public clearShortCutBar() {
		for (let index = 0; index < this.equipSlots.length; index++) {
			if (this.equipSlots[index] === "") {
				continue;
			}
			const {permanent} =GameConfig.Item.getElement(Number(this.equipSlots[index]));
			if(!permanent)
			this.equipSlots[index] = "";
		}
		this.curEquip = "";
	}

	/**
	 * 使用道具
	 * @param  id
	 * @param  count
	 * @return
	 */
	public useItem(id: string, count: number, player?: mw.Player) {
		let num = 0;
		const tempItem = this.items[id];
		if (tempItem) {
			num = tempItem.count -= count;
			let item = this.items[id];
			if (item && num < item.count) {
				item.count = num;
			}
			num <= 0 && this.deleteItem(id);
		} else {
			console.error("useItem 没有此道具物品:", id);
		}
		this.onItemChange.call(tempItem.configID, tempItem.count)
		this.save(false);

		return num;
	}

	/**
	 * 更换选中快捷栏物品
	 * @param  id
	 * @return
	 */
	public changEquipItem(id: string) {
		if (id && !this.equipSlots.includes(id)) {
			console.error("changEquipItem 快捷栏没有此物品", id);
			return;
		}
		this.curEquip = id;
		console.log("changEquipItem 更换选中快捷栏物品", this.curEquip);
	}

	public getCurEquips() {
		return this.equipSlots;
	}

	/**
	 * 找到当前空着的快捷栏位置
	 */
	public getCurEmptyEquipIndex() {
		const res = this.equipSlots.findIndex(v => v === "");
		return res;
	}

	public addTempItem(id: number, count: number) {
		const uid = id.toString();
		let cfg = GameConfig.Item.getElement(id);
		let tempItem = this.items[uid];
		let orgNum = 0;
		if (!tempItem) {
			tempItem = this.spawnItem(uid, cfg)
			this.items[uid] = tempItem;
		} else {
			orgNum = tempItem.count;
		}
		let num = count + orgNum
		if (num > cfg.MaxCount) {
			num = cfg.MaxCount
		}
		tempItem.count = num;
	}
}
