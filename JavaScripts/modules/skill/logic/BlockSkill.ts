import { PropModuleC } from "../../prop/PropModuleC"
import SkillBase, { registerSkill } from "./SkillBase"

@registerSkill(3012)
export class BlockSkill extends SkillBase {
    protected onStart(hitObj: mw.GameObject, ...params: any[]) {
        const id = parseInt(this.skillLevelConfig.Param1)
        ModuleService.getModule(PropModuleC).doItemSkill(id)
    }
}