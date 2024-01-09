import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { SkillState } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import GameUtils from "../../../utils/GameUtils";
import ClothManager from "../../player/managers/ClothManager";
import SkillMgr from "../SkillMgr";
import MakePropUI from "../ui/MakePropUI";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(3102)
export default class HenShinOtherSkill extends SkillBase {

    public active(...params: any[]): void {
        if (this.charge == 0 || GlobalData.skillCD > 0 || this.State < 0)
            return
        if (this.State == SkillState.Enable) {
            this.setState(SkillState.Creation, this.skillID, (guid: string) => {
                super.active(guid)
            })
        } else {
            SkillMgr.Inst.skillOver(this)
        }
    }

    protected onStart(hitObj: mw.GameObject, ...params: any[]): void {
        this.henShinOther(hitObj, params[0])
    }

    private async henShinOther(hitObj: mw.GameObject, guid: string) {
        if (guid && guid != "") {
            
            await GameUtils.downAsset(GlobalData.creationAnim)
            const anim = PlayerManagerExtesion.rpcPlayAnimation(this.character, GlobalData.creationAnim, 1, 1)
            this.character.movementEnabled = false
            anim.onFinish.add(() => {
                this.character.movementEnabled = true
                if (hitObj && hitObj instanceof mw.Pawn) {
                    ClothManager.instance.henShinOther(guid, hitObj.player)
                }
            })
        }
    }

    public onRemove(): void {
        UIManager.hide(MakePropUI)
    }
}