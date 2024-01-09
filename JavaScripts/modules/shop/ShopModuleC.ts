
import { GameConfig } from "../../config/GameConfig";
import { IShopElement } from "../../config/Shop";
import Tips from "../../ui/commonUI/Tips";
import { BagModuleC } from "../bag/BagModuleC";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import ShopData from "./ShopData";
import ShopModuleS from "./ShopModuleS";
import { ShopMain } from "./ui/ShopMain";


export default class ShopModuleC extends ModuleC<ShopModuleS, ShopData>{

    public showShopPanle() {
        UIManager.show(ShopMain);
    }

    public buyGoods(info: IShopElement, count: number) {
        const cost = info.money * count;
        const cash = ModuleService.getModule(BagModuleC).getItem(90006)
        let num = cash?cash.count:0;
        
        if (num < cost) {
            Tips.show((GameConfig.SquareLanguage.Text_Text_552).Value)
            return;
        }
        ModuleService.getModule(BagModuleC).addItem(info.goodID, count);
        this.data.subCount(info.id, count);
        this.server.net_bugGoods(info.id, count);
        ModuleService.getModule(BagModuleC).useItem(90006, cost);
        Tips.show(GameConfig.SquareLanguage.Text_Text_551.Value)
    }

    public getShopCount(ID: number) {
        return this.data.getItemCount(ID);
    }
}