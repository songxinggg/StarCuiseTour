import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { GlobalData } from "../../../const/GlobalData";
import ItemTips_generate from "../../../ui-generate/bag/ItemTips_generate";

export default class ItemTips extends ItemTips_generate {

    protected onStart(): void {
        this.mClose.onClicked.add(() => UIManager.hide(ItemTips))
        this.mDetailClose.onClicked.add(() => UIManager.hide(ItemTips))
    }

    protected onShow(...params: any[]): void {
        if (params.length != 1)
            return
        let cfg: IItemElement = GameConfig.Item.getElement(params[0])
        if (!cfg)
            return

        this.mDetailName.text = cfg.Name;
        this.mDetailText.text = cfg.description;
        this.mDetailIcon.imageGuid = cfg.Icon;
        const level = cfg.Quality;
        for (let i = 0; i < 5; i++) {
            let star = this.mDetailStar.getChildAt(i) as mw.Image;
            star.visibility = level > i ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        }
        this.mBG.imageGuid = GlobalData.BG_LIST[level];
    }


}