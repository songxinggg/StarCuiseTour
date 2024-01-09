
import PlayerManager from "../../player/managers/PlayerManager";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(2013)
export default class SoaringSkill extends SkillBase {
    private originSpeed: number = 1000;

    public active(...params: any[]): void {
        if (!PlayerManager.instance.playerIsUsingSkill(this.hostId)) {
            return
        }
        super.active(...params);
    }
    protected onStart(hitObj: mw.GameObject) {
        this.originSpeed = this.character.maxFlySpeed;
        const params = this.skillLevelConfig.Param1.split("|")
        const rate = params[0] ? Number(params[0]) : 1;
        const time = params[1] ? Number(params[1]) : 1;
        this.character.maxFlySpeed = this.originSpeed * rate;
        setTimeout(() => {
            this.character.maxFlySpeed = this.originSpeed;
        }, time * 1000);
    }
}