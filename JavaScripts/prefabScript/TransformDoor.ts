
import { ITransformDoorElement } from "../config/TransformDoor";
import { MGSMsgHome } from "../modules/mgsMsg/MgsmsgHome";
import GameUtils from "../utils/GameUtils";

@Component
export default class TransformDoor extends mw.Script {
    @mw.Property({displayName:"传送点"})
    private readonly transformPos:mw.Vector = mw.Vector.zero

    private _trigger: mw.Trigger;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.init();
    }


    private init() {
      
        this._trigger = this.gameObject.getChildByName("触发器") as mw.Trigger;
        this._trigger.onEnter.add(this.onTriggerEnter.bind(this));
    
    }
   
    private _timer: number = 0;
    private onTriggerEnter(go: mw.GameObject){
        if (GameUtils.isPlayerCharacter(go)&&Date.now() - this._timer > 1000) {

            this._timer = Date.now();
            Player.localPlayer.character.worldTransform.position = this.transformPos.clone();
            
        }
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