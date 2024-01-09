
import { GameConfig } from "../../../config/GameConfig";
import { IShopElement } from "../../../config/Shop";
import { GlobalData } from "../../../const/GlobalData";
import ShopItem_Generate from "../../../ui-generate/shop/ShopItem_generate";
import GameUtils from "../../../utils/GameUtils";
import { TagType } from "../../bag/BagDataHelper";
import { BagModuleC } from "../../bag/BagModuleC";
import ShopModuleC from "../ShopModuleC";

export const moneyIcon = ["", "159402", "178213", "192142"]

export class ShopItem extends ShopItem_Generate {
    public id: number;
    public info: IShopElement;
    public index: number;

    public get clickBtn() {
        return this.mClickBtn;
    }

    setData(info: IShopElement) {
        this.id = info.id;
        this.info = info;
        const config = GameConfig.Item.getElement(info.goodID);
        this.mName.text = config.Name;
        if (config.iconByAsset) {
            GameUtils.getIconByAsset(config.iconByAsset).then((res) => {
                if(!res) return;
                this.mIcon.setImageByAssetIconData(res);
            })
        } else {
            this.mIcon.imageGuid = config.Icon;
        }


        if (config.TagType === TagType.Action) {
            this.mIcon.imageColor = mw.LinearColor.colorHexToLinearColor("#FFAF3A");
        } else {
            this.mIcon.imageColor = mw.LinearColor.white;
        }
        this.mPrice.text = info.money.toString();
        this.mMoney.imageGuid = moneyIcon[info.currency];
        this.mClickBtn.enable = true;
        this.mMoney.visibility = mw.SlateVisibility.SelfHitTestInvisible
        this.mPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
        this.mCanvasStar.visibility = mw.SlateVisibility.SelfHitTestInvisible
        this.mState.visibility = mw.SlateVisibility.Collapsed
        this.mHalo.visibility = mw.SlateVisibility.Collapsed;
        this.mNew.visibility = mw.SlateVisibility.Collapsed;
        this.mBg.imageColor = mw.LinearColor.colorHexToLinearColor(GlobalData.levelColor[config.Quality]);
        for (let i = 0; i < 5; i++) {
            let star = this.mCanvasStar.getChildAt(i) as mw.Image;
            star.visibility = config.Quality > i ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
        this.refreshState();
    }

    refreshState() {
        this.mCount.visibility = mw.SlateVisibility.Collapsed;
        if (!this.info.limitCount) {
            return;
        }
        let isCan = true;
        const item = ModuleService.getModule(BagModuleC).getItem(this.info.goodID)
        if (this.info.limitCount == 1) {
            item && (isCan = false)
        } else if (this.info.limitCount > 1) {
            let count = ModuleService.getModule(ShopModuleC).getShopCount(this.info.id);
            if (count > 0) {
                this.mCount.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mCount.text = StringUtil.format(GameUtils.getTxt("Text_Text_989"), count, this.info.limitCount);

            } else {
                isCan = false;
            }
        }
        const visibility = isCan ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed
        this.mClickBtn.enable = isCan
        this.mMoney.visibility = visibility
        this.mPrice.visibility = visibility
        if (!isCan) {
            this.mBg.imageColor = mw.LinearColor.colorHexToLinearColor(GlobalData.levelColor[0])
            this.mState.fontColor = mw.LinearColor.colorHexToLinearColor("FF9191")
            this.mState.text = GameConfig.SquareLanguage.Text_Text_550.Value;
            this.mState.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.mCanvasStar.visibility = mw.SlateVisibility.Collapsed
            this.mHalo.visibility = mw.SlateVisibility.Collapsed;
            this.mNew.visibility = mw.SlateVisibility.Collapsed;
        }
    }
}