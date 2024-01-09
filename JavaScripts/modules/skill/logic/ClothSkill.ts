import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { EffectManager, SoundManager } from "../../../ExtensionType";
import ClothManager from "../../player/managers/ClothManager";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(3021)
export class ClothSkill extends SkillBase {
    private _curClothID: number = 0
    private _startChange: boolean = false

    protected onStart(hitObj: mw.GameObject) {
        this.clothChange()
    }

    private async clothChange() {
        if (this._startChange || !(PlayerManagerExtesion.isCharacter(this.character))) {
            return;
        }
        const humanV2 = this.character
        const sexStr = humanV2.description.advance.base.characterSetting.somatotype;
        let curRoleConfigID: number = null;
        const clothIDs = this.skillLevelConfig.Param1.split("|")

        //判断玩家性别，获取对应装扮ID
        if (sexStr == mw.SomatotypeV2.AnimeFemale || sexStr == mw.SomatotypeV2.LowpolyAdultFemale || sexStr == mw.SomatotypeV2.RealisticAdultFemale) {
            //女性
            curRoleConfigID = Number(clothIDs[1])
        } else if (sexStr == mw.SomatotypeV2.LowpolyAdultMale || sexStr == mw.SomatotypeV2.AnimeMale || sexStr == mw.SomatotypeV2.RealisticAdultMale) {
            //男性
            curRoleConfigID = Number(clothIDs[0])
        }
        if (!curRoleConfigID || this._curClothID == curRoleConfigID) {
            return;
        }
        //生成特效和音效

        const anim = PlayerManagerExtesion.loadAnimationExtesion(this.character, "29772")
        anim.loop = 1;
        anim.play();
        GeneralManager.rpcPlayEffectOnPlayer("158079", Player.localPlayer, mw.HumanoidSlotType.LeftFoot)
        SoundManager.playSound("124713")

        ClothManager.instance.buyCurSelect(curRoleConfigID, true, false)
        await ClothManager.instance.changeRoleAvatar(curRoleConfigID)
        ClothManager.instance.saveAvatarData()
    }
}