import { GameConfig } from "../../../../config/GameConfig";
import { MyAction } from "../../../../ExtensionType";
import FacadTip_Generate from "../../../../ui-generate/facadModule/FacadTip_generate";
import GameUtils from "../../../../utils/GameUtils";
import ClothManager from "../../managers/ClothManager";
import FacadMainUI from "./FacadMainUI";

export default class FacadTipUI extends FacadTip_Generate {
    private _curSelect: number = -1;
    private _notBuyArr: number[] = [];
    public onBtnClick: MyAction = new MyAction()
    protected onStart(): void {
        this.layer = mw.UILayerDialog;
        this.mConfirmYes.onClicked.add(() => {
            if (ClothManager.instance.buyCurSelect(this._curSelect)) {
                UIManager.getUI(FacadMainUI).refreshScroll()
            }
        })
        this.mConfirmNo.onClicked.add(() => {
            this.visible = false
        })

        this.mExitYes.onClicked.add(() => {
            for (let i = 0; i < this._notBuyArr.length; i++) {
                ClothManager.instance.changeRoleAvatar(this._notBuyArr[i])
            }
            ClothManager.instance.hideClothUI()
            this.visible = false
        })

        this.mExitNo.onClicked.add(() => {
            this.visible = false
        })

        this.mBuyBtn.onClicked.add(() => {
            this.visible = false
            this.onBtnClick.call()
        })

        this.mGetBtn.onClicked.add(() => {
            this.visible = false
        })
    }

    protected onShow(type: number, ...params: any[]): void {
        this.mConfirmTip.visibility = mw.SlateVisibility.Collapsed
        this.mBuyTip.visibility = mw.SlateVisibility.Collapsed
        this.mGetTip.visibility = mw.SlateVisibility.Collapsed
        this.mExitTip.visibility = mw.SlateVisibility.Collapsed
        this._curSelect = params[0]
        const config = GameConfig.RoleAvatar.getElement(this._curSelect)
        switch (type) {
            case 1:
                this.mConfirmTip.visibility = mw.SlateVisibility.SelfHitTestInvisible
                break;
            case 2:
                this.mBuyTip.visibility = mw.SlateVisibility.SelfHitTestInvisible
                if (config.icon && config.icon != "") this.mBuyImage.imageGuid = config.icon
                else {
                    GameUtils.getIconByAsset(config.iconByAsset).then((res) => {
                        if(!res) return;
                        this.mBuyImage.setImageByAssetIconData(res);
                    })
                }
                break;
            case 3:
                this.mGetTxt.text = GameUtils.stringFormat(GameConfig.SquareLanguage.Change_24.Value, GameConfig.RoleAvatar.getElement(this._curSelect)?.getTip)
                this.mGetTip.visibility = mw.SlateVisibility.SelfHitTestInvisible
                if (config.icon && config.icon != "") this.mGetImage.imageGuid = config.icon
                else {
                    GameUtils.getIconByAsset(config.iconByAsset).then((res) => {
                        if(!res) return;
                        this.mGetImage.setImageByAssetIconData(res);
                    })
                }
                break;
            case 4:
                this.mExitTip.visibility = mw.SlateVisibility.SelfHitTestInvisible
                this._notBuyArr = params[0]
                break;
            default:
                break;
        }
    }
}