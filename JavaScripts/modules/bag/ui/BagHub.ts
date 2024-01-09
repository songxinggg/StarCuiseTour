import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';


import { GameConfig } from "../../../config/GameConfig";
import { EventsName } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { Tween } from "../../../ExtensionType";
import BagHub_Generate from "../../../ui-generate/bag/BagHub_generate";
import SkillModule_Client from "../../skill/SkillModule_Client";
import { ItemInfo } from "../BagDataHelper";
import { BagModuleC } from "../BagModuleC";
import { BagInteraction } from "./BagInteraction";
import { GoodsItem } from "./GoodsItem";

const creationViewPos = mw.Vector2.zero;

const outPixelPos = mw.Vector2.zero;

const outViewPos = mw.Vector2.zero;

export class BagHub extends BagHub_Generate {
	/**快捷栏物品 */
	private _equipItems: ItemInfo[];
	/**选中物品 */
	private _selectEquip: GoodsItem;
	/**插槽 */
	private _allSlot: GoodsItem[] = [];
	/**快捷栏状态 */
	private _isShow: boolean = true;
	/**选中物品时长埋点 */
	private _selectTime: number;
	/**物品对象池 */
	private _itemPool: GoodsItem[] = [];
	/**物品使用池 */
	private _usePool: GoodsItem[] = [];
	/**下标 */
	private _index: number = 0;

	private get bagModuleC() {
		return ModuleService.getModule(BagModuleC);
	}

	protected onStart(): void {
		this.initEvents();
		/**初始化快捷栏 */
		for (let index = 1; index <= GlobalData.maxShortcutBar; index++) {
			const item = UIManager.create(GoodsItem);
			item.clickBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
			this.mShortcutBar.addChild(item.uiObject);
			item.uiObject.size = item.rootCanvas.size;
			item.isHide = index === 1;
			item.restore();
			item.clickBtn.onClicked.add(() => {
				const time = TimeUtil.elapsedTime()
				const cd = time - GlobalData.changeBarTime;
				if (GlobalData.skillCD > 0 || cd < 0.5) {
					return;
				}
				this.selectItem(item);
				GlobalData.changeBarTime = time
			});
			item.closeBtn.onClicked.add(() => {
				const { permanent } =GameConfig.Item.getElement(item.id)
				if (GlobalData.skillCD > 0 || !GlobalData.isChangeBar||permanent) {
					return;
				}	
				if (this._selectEquip && this._selectEquip.id === item.id) {
					this.unloadItem(item);
					this._selectEquip = null;
				}
				this.bagModuleC.removeShortcutBarItem(item.id);
			});
			this._allSlot.push(item);
		}
	}

	protected initButtons(): void {
		super.initButtons();

		this.mClearBar.onClicked.add(() => {
			if (GlobalData.skillCD > 0 || !GlobalData.isChangeBar) {
				return;
			}
			this.bagModuleC.clearShortCutBar();
		});

		this.mHideBar.onClicked.add(() => {
			const angle = this._isShow ? 180 : 0;
			let visibility = mw.SlateVisibility.Collapsed;
			if (!this._isShow) {
				visibility = mw.SlateVisibility.SelfHitTestInvisible;
			} 
			this.mBarCon.visibility = visibility;
			this.mHideBar.renderTransformAngle = angle;
			this._isShow = !this._isShow;
		});

	}

	private initEvents() {
		/**刷新快捷栏 */
		this.bagModuleC.onRefreshBar.add(this.refreshShortcutBar, this);

		Event.addLocalListener(EventsName.CreationSkills, (itemID: number, loc: mw.Vector) => {
			this.creationFly(itemID, loc);
		});
	}

	protected onShow(...params: any[]): void {
		this.canUpdate = true;
		this.refreshShortcutBar();
	}

	protected onHide(): void {
		this.canUpdate = false;
	}

	/**
	 * 刷新快捷栏
	 * @return
	 */
	private refreshShortcutBar() {
		// let visible = mw.SlateVisibility.Collapsed;
		const curEquip = this.bagModuleC.curEquip;
		this._equipItems = this.bagModuleC.getEquipItems(false);
		let curItem = null;
		const selectItem = this._selectEquip;
		const prop = (selectItem && selectItem.config) ? selectItem.config.Resource : 0;

		for (let index = 0; index < this._equipItems.length; index++) {
			const info = this._equipItems[index];
			const item = this._allSlot[index];
			item.setData(info);
			if (curEquip && curEquip === item.id) {
				curItem = item;
			}
		}
		if ((!curItem) || (!curItem.id) || (this._selectEquip && this._selectEquip.id !== curItem.id)) {
			this.unloadItem(this._selectEquip, prop);
			this._selectEquip = null;
		}
		if (curItem && curItem.id) {
			this.loadItem(curItem);
		}

		if (!this._isShow) {
			this.mHideBar.onClicked.broadcast();
		}
	}

	/**
	 * 选中物品
	 * @param  item
	 * @return
	 */
	private selectItem(item: GoodsItem) {
		if (!item.id) {
			return;
		}
		if (this._selectEquip && this._selectEquip.id) {
			this._selectEquip.mSelect.visibility = mw.SlateVisibility.Collapsed;
			this.unloadItem(this._selectEquip);
			if (this._selectEquip.id === item.id) {
				UIManager.hide(BagInteraction);
				this._selectEquip = null;
				this.bagModuleC.changEquipItem("");
				return;
			}
		}
		this.bagModuleC.changEquipItem(item.id);
		this._selectTime = Date.now();
		this.loadItem(item);
	}

	public loadItem(item: GoodsItem) {
		this._selectEquip = item;
		this._selectEquip.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		Event.dispatchToServer(EventsName.LoadProp, item.config.Resource);
		//Event.dispatchToLocal(EventsName.EquipProp, item.config.ID);
		ModuleService.getModule(SkillModule_Client).getSkill(item.config.ID);
		if (item.config.isCanGive) {
			UIManager.show(BagInteraction);
		} else {
			UIManager.hide(BagInteraction);
		}
	}

	public unloadItem(item: GoodsItem, prop: number = 0) {
		const config = item?.config;
		if (config) {
			prop = config.Resource;
			if (config.isCanGive) {
				UIManager.hide(BagInteraction);
			}
			/**埋点 */
			const time = Date.now() - this._selectTime;
			if (time >= 5000) {
				this._selectTime = 0;
			}
			//CreditEventsC.endTimekeeper(CreditEvent.RP.Item, 1);
		}
		// Event.dispatchToLocal(EventsName.EquipProp, 0);
		prop && Event.dispatchToServer(EventsName.UnloadProp, prop);
		ModuleService.getModule(SkillModule_Client).getSkill(0);
	}

	private creationFly(itemID: number, loc: mw.Vector) {
		GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, loc, creationViewPos, true);
		creationViewPos.x -= this.mFlyCon.size.x / 2;
		creationViewPos.y -= this.mFlyCon.size.y / 2;
		for (const item of this._allSlot) {
			if (item.config?.ID === itemID) {
				mw.localToViewport(item.rootCanvas.cachedGeometry, mw.Vector2.zero, outPixelPos, outViewPos);
				this.mFlyCon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				this.mFlyHalo.visibility = mw.SlateVisibility.Collapsed;
				this.mFly.imageGuid = item.config.Icon;
				this.mFlyCon.position = creationViewPos;
				const tempPos = creationViewPos;
				new Tween({ x: creationViewPos.x, y: creationViewPos.y })
					.to({ x: outViewPos.x, y: outViewPos.y }, 500)
					.onUpdate(obj => {
						tempPos.x = obj.x;
						tempPos.y = obj.y;
						this.mFlyCon.position = tempPos;
					})
					.start()
					.onComplete(obj => {
						this.mFlyHalo.visibility = mw.SlateVisibility.SelfHitTestInvisible;
						const scale = this.mFlyHalo.renderScale.clone();
						new Tween({ scale: 0, angle: -180 })
							.to({ scale: 1, angle: 180 }, 1000)
							.yoyo(true)
							.repeat(1)
							.onUpdate(obj => {
								scale.x = obj.scale;
								scale.y = obj.scale;
								this.mFlyHalo.renderScale = scale;
								this.mFlyHalo.renderTransformAngle = obj.angle;
							})
							.easing(TweenUtil.Easing.Circular.Out)
							.start()
							.onComplete(obj => {
								this.mFlyCon.visibility = mw.SlateVisibility.Collapsed;
							});
					});
				break;
			}
		}
	}
}
