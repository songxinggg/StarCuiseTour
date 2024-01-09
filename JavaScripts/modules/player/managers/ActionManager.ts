import { ISquareActionConfigElement } from "../../../config/SquareActionConfig"
import { GlobalModule } from "../../../const/GlobalModule"
import { single } from "../../../utils/GameUtils"
import { ActionModuleC, ActionModuleS } from "../modules/ActionModule"

@single()
export default class ActionManager {
    public static instance: ActionManager = null
    private _moduleC: ActionModuleC
    private get moduleC() {
        if (SystemUtil.isServer()) return null
        if (!this._moduleC) this._moduleC = GlobalModule.MyPlayerC.moduleMap.get(ActionModuleC.name) as ActionModuleC
        return this._moduleC
    }

    private _moduleS: ActionModuleS
    private get moduleS() {
        if (SystemUtil.isClient()) return null
        if (!this._moduleS) this._moduleS = GlobalModule.MyPlayerS.moduleMap.get(ActionModuleS.name) as ActionModuleS
        return this._moduleS
    }

    /**
     * @description: 打开动作列表
     * @return {*}
     */
    public openActionPanle() {
        if (SystemUtil.isServer()) {
            console.error("openActionPanle仅客户端调用")
            return
        }
        this.moduleC.openActionPanle()
    }

    /**
     * @description: 检查拥有的动作
     * @return {*}
     */
    public checkCurrentAction() {
        if (SystemUtil.isServer()) {
            console.error("checkCurrentAction仅客户端调用")
            return
        }
        this.moduleC.checkCurrentAction()
    }

    /**
     * @description: 获取拥有的动作
     * @return {*}
     */
    public getAction(): ISquareActionConfigElement[] {
        if (SystemUtil.isServer()) {
            console.error("getAction仅客户端调用")
            return
        }
        return this.moduleC.getAction()
    }

    /**
     * @description: 离开交互
     * @return {*}
     */
    public off() {
        if (SystemUtil.isServer()) {
            console.error("off仅客户端调用")
            return
        }
        this.moduleC.off()
    }

    /**
     * 跳舞魔杖让一个玩家跳舞
     * @param actionId action表ID
     * @param actionPlayer 受到影响的玩家
     */
    public dancingWand(actionId: number, actionPlayer: mw.Player) {
        if (SystemUtil.isServer()) {
            console.error("dancingWand仅客户端调用")
            return
        }
        this.moduleC.dancingWand(actionId, actionPlayer)
    }

    /**
     * 水枪魔杖让一个玩家被水冲起来
     * @param actionPlayer 受到影响的玩家
     */
    public waterWand(actionPlayer: mw.Player) {
        if (SystemUtil.isServer()) {
            console.error("waterWand仅客户端调用")
            return
        }
        this.moduleC.waterWand(actionPlayer)
    }

    public luanchActionOut(configId: number, playerId?: number) {
        if (SystemUtil.isServer()) {
            console.error("luanchActionOut仅客户端调用")
            return
        }
        this.moduleC.luanchActionOut(configId, playerId)
    }

    /**
     * @description: 
     * @param {ISquareActionConfigElement} config
     * @param {number} playerId
     * @return {*}
     */
    public async luanchAction(config: ISquareActionConfigElement, playerId?: number) {
        if (SystemUtil.isServer()) {
            console.error("luanchAction仅客户端调用")
            return
        }
        this.moduleC.luanchAction(config, playerId)
    }

    /**
     * @description: 清除玩家动作和姿态
     * @return {*}
     */
    public cleanStance() {
        if (SystemUtil.isServer()) {
            console.error("cleanStance仅客户端调用")
            return
        }
        this.moduleC.cleanStance()
    }

    /**
     * @description: 接受动作
     * @param {number} id 动作id
     * @return {*}
     */
    public aceeptAction(id: number) {
        if (SystemUtil.isServer()) {
            console.error("aceeptAction仅客户端调用")
            return
        }
        this.moduleC.aceeptAction(id)
    }
}