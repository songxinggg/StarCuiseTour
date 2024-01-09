
import { GlobalData } from "../const/GlobalData"
import GameUtils from "../utils/GameUtils"

@Component
export default class returnWheal extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        (this.gameObject as mw.Trigger).onEnter.add((go: mw.GameObject)=> {
            if (GameUtils.isPlayerCharacter(go)) {
                go.worldTransform.position =new mw.Vector(-2669.41,19.400,3527)
            }
        })
        
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}