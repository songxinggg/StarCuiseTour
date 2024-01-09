import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { SkillState } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import GameUtils from "../../../utils/GameUtils";
import ClothManager from "../../player/managers/ClothManager";
import SkillMgr from "../SkillMgr";
import MakePropUI from "../ui/MakePropUI";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(3101)
export default class HenShinSelfSkill extends SkillBase {
    public active(...params: any[]): void {
        if (this.charge == 0 || this.State < 0 || GlobalData.skillCD > 0) return;
        if (this.State == SkillState.Enable || this.State == SkillState.Creation) {
            this.setState(SkillState.Creation, this.skillID, (guid: string) => {
                super.active(guid)
            })
        } else {
            SkillMgr.Inst.skillOver(this)
        }
    }

    protected onStart(hitObj: mw.GameObject, ...params: any[]) {
        this.henShinChange(params[0])
    }

    public henShinChange = async (guid: string) => {
        this.State = SkillState.CD
        UIManager.hide(MakePropUI)
        await GameUtils.downAsset(GlobalData.creationAnim)
        const anim = PlayerManagerExtesion.rpcPlayAnimation(this.character, GlobalData.creationAnim, 1, 1)
        this.character.movementEnabled = false
        anim.onFinish.add(async () => {
            this.character.movementEnabled = true
            this.State = SkillState.Using
            if (guid && guid != "") {
                await GameUtils.downAsset(guid)
                ClothManager.instance.henShinSkill(guid)
            }
        })
    }

    public onOver(): void {
        UIManager.hide(MakePropUI)
        ClothManager.instance.isHenShin = false
        ClothManager.instance.resetPlayerCloth()
    }

    public onRemove(): void {
        UIManager.hide(MakePropUI)
    }
}