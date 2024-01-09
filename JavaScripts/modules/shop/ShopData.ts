export default class ShopData extends Subdata {
    /** 商品信息 */
    @Decorator.persistence()
    public shopData: { [shopID: number]: ShopInfo };
    /** 刷新日期 */
    @Decorator.persistence()
    public refreshDate: number[];

    protected initDefaultData(): void {
        this.shopData = {};
        this.refreshDate = [0, 0, 0];
    }

    protected onDataInit(): void {
        if (!this.shopData) {
            this.shopData = {};
            this.refreshDate = [0, 0, 0];
        }
    }

    /**
     * 获得商品可购买数量
     * @param ID 商品配置ID
     */
    public getItemCount(ID: number) {
        if (!this.shopData || !this.shopData[ID]) {
            return -999;
        }
        return this.shopData[ID].count;
    }

    /**
     * 刷新商品可购买数量
     * @param ID 商品ID
     * @param count 数量
     */
    public setItemCount(ID: number, count: number) {
        let info = this.shopData[ID];
        if (!info) {
            info = new ShopInfo();
            info.configID = ID;
            this.shopData[ID] = info;
        }
        info.count = count;
    }

    public subCount(ID: number, count: number) {
        let info = this.shopData[ID];
        if (info) {
            info.count -= count;
            this.save(false);
        }
        console.log("subCount", ID, count, info, JSON.stringify(this.shopData));
    }
}

@Serializable
export class ShopInfo {
    /**配置ID */
    @mw.Property()
    public configID: number;
    /**可购买数量 */
    @mw.Property()
    public count: number;
}