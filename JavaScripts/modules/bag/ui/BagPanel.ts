
import { GameConfig } from "../../../config/GameConfig";
import { HudGameUIState } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { Tween } from "../../../ExtensionType";
import BagPanel_Generate from "../../../ui-generate/bag/BagPanel_generate";
import Tips from "../../../ui/commonUI/Tips";
import GameUtils from "../../../utils/GameUtils";
import { FactionType, ItemInfo, ItemType, TagType } from "../BagDataHelper";
import { BagModuleC } from "../BagModuleC";
import { BagHub } from "./BagHub";
import { BagItem } from "./BagItem";
import { GoodsItem } from "./GoodsItem";
import ItemTips from "./ItemTips";
const normalTagColor = mw.LinearColor.colorHexToLinearColor("#A6A6A6")

export class BagPanel extends BagPanel_Generate {
    /**背包当前类型物品 */
    private _curItemLst: ItemInfo[];
    /**背包当前类型 */
    private _curType: TagType;
    /**选中标签 */
    private _selectTag: mw.Button;

    /**快捷栏插槽 */
    private _allSlot: GoodsItem[] = [];
    /**物品对象池 */
    private _itemPool: BagItem[] = [];
    /**物品使用池 */
    private _usePool: BagItem[] = [];
    /**下标 */
    private _index: number = 0;
    /**分帧执行数组 */
    private _delayLst: number[] = [];
    /**背包动画 */
    private _bagTween: Tween<{ x: number }>;

    private get bagModuleC() {
        return ModuleService.getModule(BagModuleC)
    }

    protected onStart(): void {
        /**初始化快捷栏 */
        for (let index = 1; index <= GlobalData.maxShortcutBar; index++) {
            const item = UIManager.create(GoodsItem);
            item.clickBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
            this.mShortcutBar.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
            item.isHide = true;
            item.restore();
            this._allSlot.push(item);
        }
    }

    protected initButtons(): void {
        super.initButtons();
        this.mCloseBtn.onClicked.add(() => {
            this.refreshData();
            UIManager.show(BagHub);
            this.visible = false
        })

        let tagBtn = [this.mTypeBtn1, this.mTypeBtn3, this.mTypeBtn4, this.mTypeBtn5]
        let tagType = [TagType.Normal, TagType.Tarot, TagType.Ticket, TagType.Chip]
        for (let i = 0; i < tagBtn.length; i++) {
            const btn = tagBtn[i];
            btn.zOrder = -1;
            btn.normalImageColor = normalTagColor;
            const text = btn.getChildAt(0) as mw.TextBlock;
            // text.fontColor = normalFontColor;
            btn.onClicked.add(() => {
                if (this._selectTag) {
                    this._selectTag.zOrder = -1
                    this._selectTag.normalImageColor = normalTagColor;
                    const text = this._selectTag.getChildAt(0) as mw.TextBlock;
                    // text.fontColor = normalFontColor;
                }
                this._selectTag = btn;
                this._selectTag.zOrder = 1
                this._selectTag.normalImageColor = mw.LinearColor.white;
                // text.fontColor = selectFontColor;
                this.refreshContent(tagType[i]);
            })
        }
    }

    public tweenEnd = false
    protected onShow(...params: any[]): void {
        UIManager.setUIstate(this, HudGameUIState.HideAll)
        this._curType = null;
        this.initShortcutBar();
        this.mTypeBtn1.onClicked.broadcast()

        /**背包动画 */
        if (!this._bagTween) {
            this._bagTween = new Tween({ x: 0 }).to({ x: 1 }, 500).onUpdate(obj => {
                const scale = mw.Vector2.one.multiply(obj.x);
                this.mBagCon.renderScale = scale
                this.mBarCon.renderScale = scale
            }).easing(TweenUtil.Easing.Circular.Out)
                .onComplete(() => this.tweenEnd = true)
        }
        this._bagTween.start()
    }

    protected onHide(): void {
        UIManager.setUIstate(this, HudGameUIState.Show)
        this.clearItemPool();
        this.tweenEnd = false
    }

    /** 
     * 更新背包
     * @param  type
     * @return 
     */
    private refreshContent(type: TagType) {
        if (this._curType === type) {
            return;
        }
        this._curType = type;
        this.clearDelay()
        this.clearItemPool();
        this.mScroll.scrollToStart();
        this.refreshBagList(type);
    }

    private refreshBagList(type: TagType) {
        this.mListCon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this._curItemLst = this.bagModuleC.getItemsByTag(type, true);
        const equipSlots = this._allSlot.map(item => item.id);
        for (let index = 0; index < this._curItemLst.length; index++) {
            const delayID = TimeUtil.delayExecute(() => {
                const info = this._curItemLst[index]
                let item: BagItem;
                if (this._itemPool.length > 0) {
                    item = this._itemPool.shift();
                } else {
                    item = UIManager.create(BagItem);
                    item.clickBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
                    this.mContent.addChild(item.uiObject);
                    item.uiObject.size = item.rootCanvas.size;
                    item.index = this._index++;
                }
                this._usePool.push(item);
                item.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                item.setData(info);
                item.clickBtn.onClicked.add(() => {
                    if ([ItemType.Money].includes(item.config.ItemType)) {
                        return
                    }
                    const select = item.mSelect.visible
                    if (select) {
                        this.refreshShortcutBar(item);
                    } else {
                        this.findPlace(item);
                    }
                })
                item.clickTips.onClicked.add(() => {
                    this.showDetail(item)
                })
                if (equipSlots.includes(item.id)) {
                    item.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible
                }
            }, index)
            this._delayLst.push(delayID);
        }
    }

    /**
     * 清除分帧数组
     * @returns 
     */
    private clearDelay() {
        if (this._delayLst.length === 0) {
            return
        }
        for (const id of this._delayLst) {
            TimeUtil.clearDelayExecute(id)
        }
        this._delayLst.length = 0;
    }

    /** 
     * 清空对象池
     * @return 
     */
    private clearItemPool() {
        if (this._usePool.length === 0) {
            return;
        }
        for (const item of this._usePool) {
            this._itemPool.push(item);
            item.clickBtn.onClicked.clear();
            item.clickTips.onClicked.clear();
            item.uiObject.visibility = mw.SlateVisibility.Collapsed;
        }
        this._itemPool.sort((a, b) => {
            return a.index - b.index;
        })
        this._usePool.length = 0;
    }

    /** 
     * 初始化快捷栏插槽
     * @return 
     */
    public initShortcutBar() {
        const slots = this.bagModuleC.getEquipItems(false);
        for (let index = 0; index < slots.length; index++) {
            const info = slots[index];
            const item = this._allSlot[index];
            item.setData(info);
        }
    }

    /** 
     * 显示详情
     * @param  item
     * @return 
     */
    private showDetail = (item: BagItem) => {
        UIManager.show(ItemTips, item.config.ID)
    }

    /**
     * 欢乐校园功能自动找位置放入快捷栏
     * @return 
     */
    private findPlace(item: BagItem) {
        let index = -1
        for (let i = 1; i < this._allSlot.length; i++) {
            const slot = this._allSlot[i];
            if (!slot.id && index === -1) {
                index = i
            }
            if (slot.id === item.id) {
                return
            }
        }
        if (index !== -1) {
            this._allSlot[index].setData(item.info);
            item.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible
        } else {
            Tips.show(GameConfig.SquareLanguage.Danmu_Content_1367.Value)
        }
    }

    /** 
     * 更新快捷栏
     * @param  item
     * @return 
     */
    private refreshShortcutBar(item: BagItem) {
        for (const slot of this._allSlot) {
            if (slot.id === item.id) {
                const { permanent } = GameConfig.Item.getElement(slot.id);
                if (!permanent) { 
                    item.mSelect.visibility = mw.SlateVisibility.Collapsed;
                    slot.restore();
                    break;
                }
               
            }
        }
    }

    /** 
     * 更新快捷栏数据
     * @return 
     */
    private refreshData() {
        const equips: string[] = []
        for (const slot of this._allSlot) {
            equips.push(slot.id);
        }
        this.bagModuleC.refreshShortcutBar(equips);
    }
}