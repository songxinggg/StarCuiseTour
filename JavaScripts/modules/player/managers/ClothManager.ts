import { GlobalModule } from "../../../const/GlobalModule";
import { single } from "../../../utils/GameUtils";
import { ClothModuleC, ClothModuleS } from "../modules/ClothModule";
@single()
export default class ClothManager {
    public static instance: ClothManager = null
    private _moduleC: ClothModuleC
    private get moduleC() {
        if (SystemUtil.isServer()) return null
        if (!this._moduleC) this._moduleC = GlobalModule.MyPlayerC.moduleMap.get(ClothModuleC.name) as ClothModuleC
        return this._moduleC
    }

    private _moduleS: ClothModuleS
    private get moduleS() {
        if (SystemUtil.isClient()) return null
        if (!this._moduleS) this._moduleS = GlobalModule.MyPlayerS.moduleMap.get(ClothModuleS.name) as ClothModuleS
        return this._moduleS
    }

    //#region 人物换装模块

    public set isHenShin(bool: boolean) {
        if (SystemUtil.isServer()) {
            console.error("isHenShin仅客户端调用")
            return
        }
        this.moduleC.isHenShin = bool
    }

    /**
     * @description: 使用玩家保存的配置初始化服装
     * @return {*}
     */
    public async configChangeCloth() {
        if (SystemUtil.isServer()) {
            console.error("configChangeCloth仅客户端调用")
            return
        }
        this.moduleC.configChangeCloth()
    }

    /**
     * @description: 使用传进来的mesh初始化服装
     * @param {string} meshArr 服装mesh数组
     * @return {*}
     */
    public meshChangeCloth(meshArr: string[]) {
        if (SystemUtil.isServer()) {
            console.error("meshChangeCloth仅客户端调用")
            return
        }
        this.moduleC.meshChangeCloth(meshArr)
    }

    /**
     * @description: 获得当前玩家的服装mesh数组
     * @return {*}
     */
    public getDefalutEquipID(): string[] {
        if (SystemUtil.isServer()) {
            return this.moduleS["_defaultEquipGuid"]
        } else {
            return this.moduleC.getDefalutEquipID()
        }
    }

    /**
     * @description: 覆盖当前玩家的服装mesh数组并换装
     * @param {string} meshArr
     * @return {*}
     */
    public setDefalutEquipID(meshArr: string[]) {
        if (SystemUtil.isServer()) {
            console.error("setDefalutEquipID仅客户端调用")
            return
        }
        this.moduleC.setDefalutEquipID(meshArr)
    }

    /**
     * @description: 还原玩家233服装
     * @return {*}
     */
    public async resetPlayerCloth() {
        if (SystemUtil.isServer()) {
            console.error("resetPlayerCloth仅客户端调用")
            return
        }
        this.moduleC.resetPlayerCloth()
    }

    /**
     * @description: 关闭换装界面
     * @return {*}
     */
    public hideClothUI() {
        if (SystemUtil.isServer()) {
            console.error("hideClothUI仅客户端调用")
            return
        }
        this.moduleC.hideClothUI()
    }

    /**
     * @description: 旋转假人
     * @param {number} dir 旋转方向
     * @return {*}
     */
    public addRoatation(dir: number) {
        if (SystemUtil.isServer()) {
            console.error("addRoatation仅客户端调用")
            return
        }
        this.moduleC.addRoatation(dir)
    }

    /**
     * @description: 是否有这套服装
     * @param {number} configID 服装配置ID
     * @return {*}
     */
    public hasSuit(configID: number): boolean {
        if (SystemUtil.isServer()) {
            console.error("hasSuit仅客户端调用")
            return
        }
        return this.moduleC.hasSuit(configID)
    }

    public hasSelect(configID: number): boolean {
        if (SystemUtil.isServer()) {
            console.error("hasSelect仅客户端调用")
            return
        }
        return this.moduleC.hasSelect(configID)
    }

    /**
     * @description: 假人的换装
     * @param {number} configID 服装配置ID
     * @param {boolean} isSelect 是否是选中的服装
     * @return {*}
     */
    public async changeRoleAvatar(configID: number, isSelect: boolean = false) {
        if (SystemUtil.isServer()) {
            console.error("changeRoleAvatar仅客户端调用")
            return
        }
        await this.moduleC.changeRoleAvatar(configID, isSelect)
    }

    /**
     * @description: 获得一套服装
     * @param {number} configID 服装配置ID
     * @param {boolean} isForce 是否强制获得（购买以外的方式）
     * @param {boolean} uiTip 是否显示获得提示
     * @return {*}
     */
    public buyCurSelect(configID: number, isForce: boolean = false, uiTip: boolean = true): boolean {
        if (SystemUtil.isServer()) {
            console.error("buyCurSelect仅客户端调用")
            return
        }
        return this.moduleC.buyCurSelect(configID, isForce, uiTip)
    }

    /**
     * @description: 购买选中的服装
     * @return {*}
     */
    public buySelectCart(): { result: boolean, notBuyArr: number[] } {
        if (SystemUtil.isServer()) {
            console.error("buySelectCart仅客户端调用")
            return
        }
        return this.moduleC.buySelectCart()
    }

    /**
     * @description: 真人的换装
     * @param {boolean} isSny 是否同步到233服务器
     * @return {*}
     */
    public async saveAvatarData() {
        if (SystemUtil.isServer()) {
            console.error("bsaveAvatarData仅客户端调用")
            return
        }
        await this.moduleC.saveAvatarData()
    }

    public henShinSkill(guid: string, henShinTime?: number) {
        if (SystemUtil.isServer()) {
            console.error("henShinSkill仅客户端调用")
            return
        }
        this.moduleC.henShinSkill(guid, henShinTime)
    }


    public henShinOther(guid: string, player: mw.Player) {
        if (SystemUtil.isServer()) {
            console.error("henShinOther仅客户端调用")
            return
        }
        this.moduleC.henShinOther(guid, player)
    }


    public async henShinModel(modelID: number) {
        if (SystemUtil.isServer()) {
            console.error("createStaticModel仅客户端调用")
            return
        }
        await this.moduleC.henShinModel(modelID)
    }

    public async createStaticModel(modelIDs: number[]) {
        if (SystemUtil.isServer()) {
            console.error("createStaticModel仅客户端调用")
            return
        }
        await this.moduleC.createStaticModel(modelIDs)
    }

    public clearModel(modelID: number) {
        if (SystemUtil.isServer()) {
            console.error("clearModel仅客户端调用")
            return
        }
        this.moduleC.clearModel(modelID)
    }


    public async createEffect(effectIDs: number[], isSny: boolean = true) {
        if (SystemUtil.isServer()) {
            console.error("createEffect仅客户端调用")
            return
        }
        await this.moduleC.createEffect(effectIDs, isSny)
    }

    public clearEffect(effectID: number[], isSny: boolean = true) {
        if (SystemUtil.isServer()) {
            console.error("clearEffect仅客户端调用")
            return
        }
        this.moduleC.clearEffect(effectID, isSny)
    }
    //#endregion
}