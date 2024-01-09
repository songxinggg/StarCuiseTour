import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { PlayerStateType, SkillState } from "../../../const/GameEnum";
import GameUtils from "../../../utils/GameUtils";
import ClothManager from "../../player/managers/ClothManager";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(2011)
export class FlySkill extends SkillBase {
    private _linsnter: mw.EventListener
    private _inGame: boolean
    private _flyTime: number = 0
    private _flyStance
    private _modelID: number = 0
    private _effectID: number = 0
    private _flyTimeout

    public init(): void {
        this.disableState.push(PlayerStateType.Interaction, PlayerStateType.DoublePeopleAction)
        this.skillState = SkillState.Using
    }

    protected async onStand(hitObj: mw.GameObject, ...params: any[]): Promise<boolean> {
        const param = this.skillLevelConfig.Param1.split("|")
        return await this.attachPlayer(param[0], param[1], param[2], param[3])
    }


    private async attachPlayer(flyAni: string, standbyAni: string, modelID: string, effectID: string): Promise<boolean> {
        if (!flyAni || flyAni == "") return false
        const speed = this.skillLevelConfig.Damage ? this.skillLevelConfig.Damage : 1000;
        this.character.movementEnabled = false
        this._modelID = Number(modelID)
        this._effectID = Number(effectID)
        this._flyTime = TimeUtil.elapsedTime();
        if (this._modelID != 0) {
            await ClothManager.instance.createStaticModel([this._modelID])
        }
        if (this._effectID != 0) {
            await ClothManager.instance.createEffect([this._effectID])
        }
        let standAnimLength = 0
        if (standbyAni && standbyAni != "0") {
            const anim = PlayerManagerExtesion.loadAnimationExtesion(this.character, standbyAni, true)
            anim.loop = 1;
            anim.speed = 1
            anim.play()
            standAnimLength = anim.length
        }
        await GameUtils.downAsset(flyAni)
        this._flyTimeout = setTimeout(() => {
            this._flyStance = PlayerManagerExtesion.loadStanceExtesion(this.character, flyAni, true)
            if (this._flyStance) {
                this._flyStance.blendMode = mw.StanceBlendMode.WholeBody
            } else {
                this._flyStance = PlayerManagerExtesion.loadAnimationExtesion(this.character, flyAni, true)
                this._flyStance.loop = 0
            }
            this._flyStance.play()
            this.character.switchToFlying()
            this.character.maxFlySpeed = speed
            this.character.movementEnabled = true
        }, standAnimLength * 1000);
        return true
    }

    public onOver(): void {
        this.detachPlayer()
    }

    private detachPlayer() {
        if (this._flyTimeout) {
            clearTimeout(this._flyTimeout)
            this.character.movementEnabled = true
            this._flyTimeout = null
        }
        if (this._flyStance) {
            this._flyStance.stop()
            this._flyStance = null;
        }
        if (this._modelID != 0) {
            ClothManager.instance.clearModel(Number(this._modelID))
        }
        if (this._effectID != 0) {
            ClothManager.instance.clearEffect([this._effectID])
        }
        this.character.switchToWalking()
        this._flyTime = TimeUtil.elapsedTime() - this._flyTime;

        if (this._linsnter) this._linsnter.disconnect();
    }

}