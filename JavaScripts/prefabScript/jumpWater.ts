import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
﻿import { EffectManager, SoundManager } from "../ExtensionType";
import GameUtils from "../utils/GameUtils"

@Component
export default class JumpWater extends mw.Script {
    @mw.Property({ displayName: "特效" })
        
    public effect: string = "";

    @mw.Property({ displayName: "音效" })
    public sound: string = "";

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        (this.gameObject as mw.Trigger).onEnter.add((go: mw.GameObject) => {
            if (GameUtils.isPlayerCharacter(go)) {
                GeneralManager.rpcPlayEffectAtLocation(this.effect, go.worldTransform.position);
                mw.SoundService.play3DSound(this.sound, go.worldTransform.position)
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