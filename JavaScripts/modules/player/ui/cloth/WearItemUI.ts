
import { GameConfig } from "../../../../config/GameConfig";
import { IRoleAvatarElement } from "../../../../config/RoleAvatar";
import WearItem_Generate from "../../../../ui-generate/facadModule/WearItem_generate";
import GameUtils from "../../../../utils/GameUtils";
import ClothManager from "../../managers/ClothManager";
import FacadCartUI from "./FacadCartUI";
import { FacadSelectEvent } from "./FacadItemUI";

export default class WearItemUI extends WearItem_Generate {
    private get mainUI() {
        return UIManager.getUI(FacadCartUI)
    }
    public config: IRoleAvatarElement = null
    protected onStart(): void {
        this.layer = mw.UILayerDialog;
        this.mCloseBtn.onClicked.add(() => {
            if (!this.config)
                return;
            ClothManager.instance.changeRoleAvatar(this.config.ID)
            Event.dispatchToLocal(FacadSelectEvent, this.config.ID)
            this.mainUI.unSpawn(this)
            this.mainUI.refreshPrice()
        })
    }

    public setData(configID: number) {
        this.mPrice.visibility = mw.SlateVisibility.SelfHitTestInvisible
        this.mGoldImg.visibility = mw.SlateVisibility.SelfHitTestInvisible
        this.mGetTip.visibility = mw.SlateVisibility.Collapsed
        this.config = GameConfig.RoleAvatar.getElement(configID)
        if (this.config.icon && this.config.icon != "") this.mWearImg.imageGuid = this.config.icon
        else {
            GameUtils.getIconByAsset(this.config.iconByAsset).then((res) => {
                if(!res) return;
                this.mWearImg.setImageByAssetIconData(res);
            })
        }
        this.mGoldImg.imageGuid = this.config.priceIcon
        this.mGoldImg.imageSize = new mw.Vector2(40, 40)
        this.mPrice.text = this.config.price.toString()
        if (this.config.priceType == 2) {
            this.mPrice.visibility = mw.SlateVisibility.Collapsed
            this.mGoldImg.visibility = mw.SlateVisibility.Collapsed
            this.mGetTip.visibility = mw.SlateVisibility.SelfHitTestInvisible
        }
    }
}