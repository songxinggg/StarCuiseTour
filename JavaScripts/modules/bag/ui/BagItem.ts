
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { GlobalData } from "../../../const/GlobalData";
import BagItem_Generate from "../../../ui-generate/bag/BagItem_generate";
import GameUtils from "../../../utils/GameUtils";
import { ItemInfo, ItemType } from "../BagDataHelper";
export class BagItem extends BagItem_Generate {
    public info: ItemInfo;
    public id: string;
    public count: number;
    public config: IItemElement;
    public index: number;

    get clickBtn() {
        return this.mBtn;
    }

    get clickTips() {
        return this.mTips;
    }

    protected onStart(): void {
        this.restore();
    }

    protected onShow(...params: any[]): void {
    }

    public setData(info: ItemInfo, isBar: boolean = false) {
        if (!info) {
            this.restore();
            return;
        }
        const config = GameConfig.Item.getElement(info.configID);

        this.mItemInfo.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mBottom.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mBg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mInfoCon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mSelect.visibility = mw.SlateVisibility.Collapsed;
        if (isBar) {
            this.mRemove.visibility = mw.SlateVisibility.Visible;
            this.mName.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mName.visibility = mw.SlateVisibility.Visible;
            this.mName.text = config.Name;
        }

        this.info = info;
        this.id = info.id;
        this.count = info.count;
        this.config = config
        if (config.iconByAsset) {
            GameUtils.getIconByAsset(config.iconByAsset).then((res) => {
                if (res)
                    this.mIcon.setImageByAssetIconData(res);
            })
        } else {
            this.mIcon.imageGuid = config.Icon;
        }

        this.mIcon.renderScale = config.ItemScale;
        if ([ItemType.Inconsumable].includes(config.ItemType)) {
            let Visible = mw.SlateVisibility.Collapsed
            const level = info.level
            if (level) {
                this.mItemInfo.text = "LV." + level;
                Visible = mw.SlateVisibility.SelfHitTestInvisible;
            }
            this.mInfoCon.visibility = Visible;
        } else if ([ItemType.Consumable, ItemType.Money].includes(config.ItemType)) {
            this.mItemInfo.text = "x" + info.count
        }

        const quality = config.Quality ? config.Quality : 0;
        this.mBg.imageGuid = GlobalData.BG_LIST[quality];
        this.mCanvasStar.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        for (let i = 0; i < 5; i++) {
            let star = this.mCanvasStar.getChildAt(i) as mw.Image;
            star.visibility = quality > i ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
    }

    public restore() {
        this.mItemInfo.visibility = mw.SlateVisibility.Collapsed;
        this.mInfoCon.visibility = mw.SlateVisibility.Collapsed;
        this.mBottom.visibility = mw.SlateVisibility.Collapsed;
        this.mBg.visibility = mw.SlateVisibility.Collapsed;
        this.mSelect.visibility = mw.SlateVisibility.Collapsed;
        this.mRemove.visibility = mw.SlateVisibility.Collapsed
        this.mCanvasStar.visibility = mw.SlateVisibility.Collapsed

        this.mIcon.imageGuid = GlobalData.blankSlotBg;
        this.info = null;
        this.config = null;
        this.id = "";
        this.count = 0;
    }
}