
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { GlobalData } from "../../../const/GlobalData";
import GoodsItem_Generate from "../../../ui-generate/bag/GoodsItem_generate";
import GameUtils from "../../../utils/GameUtils";
import { ItemInfo, ItemType } from "../BagDataHelper";

export class GoodsItem extends GoodsItem_Generate {
    public id: string;
    public count: number;
    public config: IItemElement;
    public info: ItemInfo;
    public isHide: boolean = false;
    public index: number = 0;

    get clickBtn() {
        return this.mBtn;
    }

    get closeBtn() {
        return this.mClose;
    }

    protected onStart(): void {
        this.restore();
    }

    protected onShow(...params: any[]): void {

    }

    public setData(info: ItemInfo, isShowName: boolean = false) {
        if (!info) {
            this.restore()
            return;
        }
        const config = GameConfig.Item.getElement(info.configID);
        this.id = info.id;
        this.count = info.count;
        this.config = config;
        this.info = info;
        if (config.iconByAsset) {
            GameUtils.getIconByAsset(config.iconByAsset).then((res) => {
                if(!res) return;
                this.mIcon.setImageByAssetIconData(res);
            })
        } else {
            this.mIcon.imageGuid = config.Icon;
        }
        this.mInfoCon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mInfo.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mBg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mBtn.visibility = mw.SlateVisibility.Visible;
        this.mSelect.visibility = mw.SlateVisibility.Collapsed;
        this.mClose.visibility = this.isHide ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible;

        if ([ItemType.Inconsumable].includes(config.ItemType)) {
            this.mInfoCon.visibility = mw.SlateVisibility.Collapsed;
            // this.mItemInfo.text = "LV." + config.Level
        } else if ([ItemType.Consumable].includes(config.ItemType)) {
            this.mInfo.text = "x" + info.count
        }

        if (isShowName) {
            this.mInfoCon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mInfo.text = config.Name;
        }
    }

    public restore() {
        this.mInfoCon.visibility = mw.SlateVisibility.Collapsed;
        this.mInfo.visibility = mw.SlateVisibility.Collapsed;
        this.mBg.visibility = mw.SlateVisibility.Collapsed;
        this.mSelect.visibility = mw.SlateVisibility.Collapsed;
        this.mClose.visibility = mw.SlateVisibility.Collapsed;
        this.mBtn.visibility = this.isHide ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;

        this.mIcon.imageGuid = GlobalData.blankSlotBg;
        this.config = null;
        this.id = "";
        this.count = 0;
    }

}