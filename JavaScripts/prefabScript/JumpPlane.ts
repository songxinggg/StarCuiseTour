import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { EffectManager, SoundManager } from "../ExtensionType";
import { MGSMsgHome } from "../modules/mgsMsg/MgsmsgHome";
import GameUtils from "../utils/GameUtils";

@Component
export default class JumpPlane extends mw.Script {
    @mw.Property({ displayName: "特效guid" })
    private effectGuid: string = "88798"

    @mw.Property({ displayName: "动作guid" })
    private actionGuid: string = "14736"

    @mw.Property({displayName:"大炮发射特效，音效"})
    private cannonEffectGuid: string[] = ["",""]



    private currentPlayer: mw.Player



    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            this.currentPlayer = player
        })


        GameUtils.downAsset(this.effectGuid)
        GameUtils.downAsset(this.actionGuid)

        const impulse: mw.Impulse = this.gameObject.getChildByName("冲量对象") as mw.Impulse;
        const isMobule = SystemUtil.isMobile();
        impulse.onImpulseEnter.add((go: mw.GameObject) => {
            if (GameUtils.isPlayerCharacter(go)) {
                this.playEffectAndAni()
                let str ="interactive2"
                if (this.cannonEffectGuid[0] && this.cannonEffectGuid[0] != "") {
                    str = "interactive1"
                    GeneralManager.rpcPlayEffectAtLocation(this.cannonEffectGuid[0], this.gameObject.worldTransform.position)
                }
                if (this.cannonEffectGuid[1] && this.cannonEffectGuid[1] != "") { 
                    SoundManager.playSound(this.cannonEffectGuid[1])
                }

                const id = setInterval(() => {
                    if (this.currentPlayer.character.isJumping) {
                        this.useUpdate = true;
                        clearInterval(id)
                    }
                },isMobule?33:17)
               
            }
        })

    }


    private static effectId: number

    private animation: mw.Animation

    playEffectAndAni() {
        if (!JumpPlane.effectId) {
            JumpPlane.effectId = GeneralManager.rpcPlayEffectOnPlayer(this.effectGuid, this.currentPlayer, mw.HumanoidSlotType.Buttocks, 0)
        }
        this.animation =Player.localPlayer.character.loadAnimation(this.actionGuid)
        this.animation.loop = 0;
        this.animation.play()
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (!this.currentPlayer.character.isJumping) {
            this.useUpdate = false;
            this.animation.stop()
            EffectService.stop(JumpPlane.effectId)
            JumpPlane.effectId = undefined;
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}