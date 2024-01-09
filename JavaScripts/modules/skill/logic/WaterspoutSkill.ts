import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { GameConfig } from "../../../config/GameConfig";
import { SkillState, PlayerStateType } from "../../../const/GameEnum";
import { EffectManager, SoundManager, Tween } from "../../../ExtensionType";
import GameUtils from "../../../utils/GameUtils";
import ActionManager from "../../player/managers/ActionManager";
import PlayerManager from "../../player/managers/PlayerManager";
import { SkillRun } from "../runtime/SkillRun";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(3111)
export class WaterspoutSkill extends SkillBase {
    private effcet: mw.Effect
    private time: number = 0;
    private useTime: number = 0;

    public active(...params: any[]) {
        if (this.useTime > 0) {
            return
        }

        let hitObj: mw.GameObject = null
        let rot: mw.Rotation = null
        /**辅助瞄准 */
        if (this.skillConfig.IsSupport) {
            hitObj = this.aim()
            rot = this.lookAt(hitObj, rot)
        }
        /**技能编辑器 */
        if (this.skillConfig["SkillConfig" + (this.State + 1)]) {
            let pos = this.character.worldTransform.position;
            if (this.skillConfig.ReleaseType == 1 && hitObj) pos = hitObj.worldTransform.position
            SkillRun.cast(this.character, this.skill * 10 + this.State + 1, { pos: pos, rot: rot, diy: [hitObj ? hitObj.gameObjectId : null, this.skillID] });
        }
        /**先把技能断了再做技能的准备 */
        this.State = SkillState.CD
        if (this.skillState == SkillState.Using) {
            PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, true, this.hostId);
        }
        this.time++;
        this.useTime = 0.5;
        SoundManager.playSound("99731", 0.8);
        let effConfig = GameConfig.Effect.getElement(165);
        GeneralManager.rpcPlayEffectOnPlayer(
            effConfig.EffectID,
            this.character.player,
            effConfig.EffectPoint,
            1,
            effConfig.EffectLocation,
            effConfig.EffectRotate.toRotation(),
            effConfig.EffectLarge);

        if (this.time >= 10) {
            this.time = 0;
            if (hitObj && hitObj instanceof mw.Character) {
                this.imprisonOther(hitObj)
            } else {
                this.imprisonOther()
            }
        }
    }

    private async imprisonOther(hitObj?: mw.Character) {
        let targetPos: Vector
        if (hitObj) {
            targetPos = hitObj.worldTransform.position.clone()
            await this.effectFly(targetPos, hitObj)
        } else {
            let add = this.character.worldTransform.getForwardVector().multiply(1000);
            targetPos = this.character.worldTransform.position.add(add);
            await this.effectFly(targetPos)
        }
    }


    private async effectFly(targetPos: Vector, target?: mw.Character) {
        if (!this.effcet) {
            await GameUtils.downAsset("156494")
            this.effcet = SpawnManager.spawn<mw.Effect>({ guid: "156494" })
            this.effcet.worldTransform.scale = new Vector(2, 2, 2);
        }
        this.effcet.loop = true;
        this.effcet.play()
        const startPos = this.character.worldTransform.position.clone()
        new Tween({ pos: startPos }).
            to({ pos: targetPos }, 1000)
            .onUpdate((value) => {
                this.effcet.worldTransform.position = value.pos
            })
            .onComplete(() => {
                target && ActionManager.instance.waterWand(target.player)
                this.effcet.stop()
            })
            .start()
            .easing(TweenUtil.Easing.Circular.Out)
    }

    public onUpdate(dt: number): void {
        this.useTime && (this.useTime -= dt);
        super.onUpdate(dt);
    }

}