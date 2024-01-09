
import { GameConfig } from "../../config/GameConfig";
import ShopData from "./ShopData";
import ShopModuleC from "./ShopModuleC";


export default class ShopModuleS extends ModuleS<ShopModuleC, ShopData>{

    protected onPlayerEnterGame(player: mw.Player): void {
        this.refreshData(player);
    }

    public net_bugGoods(ID: number, count: number) {
        let data = this.currentData;
        data.subCount(ID, count);
    }

    /**
     * 刷新商店数据
     * @param player 玩家
     */
    public refreshData(player: mw.Player) {
        try {
            let data = this.getPlayerData(player);
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth()
            let year = date.getFullYear()
            this.checkShopData(player);
            if (data && day === data.refreshDate[0] && month === data.refreshDate[1] && year === data.refreshDate[2]) {
                return;
            }

            data.refreshDate = [day, month, year];
            let all = GameConfig.Shop.getAllElement();
            all = all.filter(cfg => {
                if (cfg.limitCount > 1 || cfg.refreshDay > 0) {
                    return true;
                }
                return false;
            })

            all.forEach(cfg => {
                let curCount = data.getItemCount(cfg.id);
                if (cfg.refreshDay == 1 && curCount !== cfg.limitCount) {
                    data.setItemCount(cfg.id, cfg.limitCount);
                }
            })
            data.save(true);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 检查玩家商店数据
     * @param player 玩家
     */
    private checkShopData(player: mw.Player) {
        let data = this.getPlayerData(player);
        let all = GameConfig.Shop.getAllElement();
        all = all.filter(cfg => {
            if (cfg.limitCount > 1 || cfg.refreshDay > 0) {
                return true;
            }
            return false;
        })
        all.forEach((cfg) => {
            let curCount = data.getItemCount(cfg.id);
            if (curCount <= -99) {
                data.setItemCount(cfg.id, cfg.limitCount);
            }
        })
    }
}