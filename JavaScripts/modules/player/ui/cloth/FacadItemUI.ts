
import { IRoleAvatarElement } from "../../../../config/RoleAvatar";
import { GlobalModule } from "../../../../const/GlobalModule";
import FacadItem_Generate from "../../../../ui-generate/facadModule/FacadItem_generate";
import GameUtils from "../../../../utils/GameUtils";
import { IItemRender } from "../../../../utils/UIMultiScroller";
import ClothManager from "../../managers/ClothManager";
import FacadMainUI from "./FacadMainUI";

export const FacadSelectEvent = "FacadSelectEvent"
export default class FacadItemUI extends FacadItem_Generate implements IItemRender {
    private _isHave: boolean = false;
    private _isSelect: boolean = false;
    private _config: IRoleAvatarElement;
    private get module() {
        return GlobalModule.MyPlayerC
    }

    private get mainUI() {
        return UIManager.getUI(FacadMainUI)
    }

    protected onStart(): void {
        this.layer = mw.UILayerDialog;
        this.mSelect.visibility = mw.SlateVisibility.Collapsed
        this.mBtnSelect.onClicked.add(this.selectClick)
        Event.addLocalListener(FacadSelectEvent, (configID: number) => {
            if (ClothManager.instance.hasSelect(this._config.ID)) {
                this.setSelect(true)
                if (configID == this._config.ID) {
                    this.mainUI.curSelect = !this._isHave ? this._config.ID : -1
                }
            } else {
                this.setSelect(false)
                if (configID == this._config.ID) this.mainUI.curSelect = -1;
            }
        })
    }

    private selectClick = async () => {
        ClothManager.instance.changeRoleAvatar(this._config.ID, true)
        Event.dispatchToLocal(FacadSelectEvent, this._config.ID)
    }

    public setData(config: IRoleAvatarElement): void {
        if (config.icon && config.icon != "") this.mImgIcon.imageGuid = config.icon
        else {
            GameUtils.getIconByAsset(config.iconByAsset).then((res) => {
                if(!res) return;
                this.mImgIcon.setImageByAssetIconData(res);
            })
        }
        this.mItemName.text = config.name
        this.mTextDesc.text = config.desc
        this.mImgGold.imageGuid = config.priceIcon
        this.mImgGold.imageSize = new mw.Vector(55, 55)
        this.mPrice.text = config.price.toString()
        this.mQuality.visibility = mw.SlateVisibility.Collapsed

        this._config = config
        this.setHave(ClothManager.instance.hasSuit(this._config.ID))
        this.setSelect(ClothManager.instance.hasSelect(this._config.ID))
        this.mHDHDtxt.visibility = mw.SlateVisibility.Collapsed
        if (!this._isHave && this._config.priceType == 2) {
            this.mHDHDtxt.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.mPrice.visibility = mw.SlateVisibility.Collapsed
            this.mImgGold.visibility = mw.SlateVisibility.Collapsed
        }
        if (this._isSelect) {
            this.mainUI.curSelect = !this._isHave ? this._config.ID : -1
        }
        if (config.quality) {
            this.mQuality.visibility = mw.SlateVisibility.SelfHitTestInvisible
            switch (config.quality) {
                case 1:
                    this.mQuality.imageColor = mw.LinearColor.colorHexToLinearColor("C2F2B5FF")
                    break;
                case 2:
                    this.mQuality.imageColor = mw.LinearColor.colorHexToLinearColor("A1A8F7FF")
                    break;
                case 3:
                    this.mQuality.imageColor = mw.LinearColor.colorHexToLinearColor("F6CEF7FF")
                    break;
                case 4:
                    this.mQuality.imageColor = mw.LinearColor.colorHexToLinearColor("FFDBA5FF")
                    break;
                default:
                    break;
            }
        }
    }

    get clickObj(): mw.StaleButton {
        return this.mbtnUse
    }

    private setHave(bool: boolean) {
        if (bool) {
            this.mPrice.visibility = mw.SlateVisibility.Collapsed
            this.mImgGold.visibility = mw.SlateVisibility.Collapsed
            this.mYHDtxt.visibility = mw.SlateVisibility.SelfHitTestInvisible
        } else {
            this.mPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.mImgGold.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.mYHDtxt.visibility = mw.SlateVisibility.Collapsed
        }
        this._isHave = bool
    }

    public setSelect(bool: boolean): void {
        if (bool) {
            this.mSelect.visibility = mw.SlateVisibility.SelfHitTestInvisible
        } else {
            this.mSelect.visibility = mw.SlateVisibility.Collapsed
        }
        this._isSelect = bool
    }
}