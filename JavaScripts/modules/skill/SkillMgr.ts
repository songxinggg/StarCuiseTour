

import { PlayerStateType, SkillState } from "../../const/GameEnum";
import PlayerManager from "../player/managers/PlayerManager";
import SkillBase from "./logic/SkillBase";


export default class SkillMgr {
    private static _inst: SkillMgr;
    public static get Inst() {
        if (!this._inst)
            this._inst = new SkillMgr();
        return this._inst;
    }

    private _skillMap: Map<string, SkillBase[]> = new Map()
    public skillClassMap: Map<number, TypeName<SkillBase>> = new Map()

    public registerSkill(configID: number, host: string) {
        if (!this.skillClassMap.has(configID)) {
            this.skillClassMap.set(configID, SkillBase);
        }
        let c = this.skillClassMap.get(configID)
        const skill = new c(configID, host)
        skill.init()
        if (!this._skillMap.has(host)) {
            this._skillMap.set(host, [])
        }
        this._skillMap.get(host).push(skill)
        return skill;
    }

    public findSkill(skillID: number, host: string): SkillBase {
        if (this._skillMap.has(host)) {
            const skills = this._skillMap.get(host)
            const skillbase: SkillBase = skills.find(skill => skill.skill == skillID)
            return skillbase;
        }
        return null;
    }

    public skillStart(skill: SkillBase, ...params: any[]) {
        skill.active(params)
    }

    public skillOver(skill: SkillBase) {
        skill.runtime = 0;
        if (skill.skillState == SkillState.Using && skill.State == SkillState.Using) {
            PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, false);
        }
        skill.State = SkillState.Enable
        /**技能cd大于0才走updatecd */
        if (skill.skillLevelConfig.SkillCD > 0) {
            if (skill.charge == skill.maxCharge) {
                if (skill.charge == skill.maxCharge) {
                    skill.cd = skill.skillLevelConfig.SkillCD;
                }
            }
            skill.charge--;
            if (skill.charge <= 0) {
                skill.State = SkillState.CD
            }
        }
        skill.onMpDown()
        skill.onOver()
    }

    public skillRemove(skill: SkillBase) {
        if (skill.State == SkillState.Using) this.skillOver(skill)
        skill.onStateChange.clear();
        skill.onChargeChange.clear();
        skill.onRemove()
    }

    public update(dt: number) {
        this._skillMap.forEach((arr, key) => {
            for (const skill of arr) {
                skill.onUpdate(dt)
            }
        });
    }

} 