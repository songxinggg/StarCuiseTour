
import { MGSMsgHome } from "../../mgsMsg/MgsmsgHome";
import PartyModuleC from "../../party/PartyModuleC";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(8001)
export default class PartySkill extends SkillBase {
    protected onStart(hitObj: mw.GameObject, ...params: any[]): void {
        ModuleService.getModule(PartyModuleC).partySign();
    }

}