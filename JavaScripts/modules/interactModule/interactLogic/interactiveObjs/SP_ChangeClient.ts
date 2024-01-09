import { PlayerManagerExtesion, } from '../../../../Modified027Editor/ModifiedPlayer';
import ClothManager from "../../../player/managers/ClothManager";
import InteractObject, { InteractLogic_C, InteractLogic_S } from "../InteractObject";

/**性别枚举 */
export enum SexType {
    /**普通男 */
    Male = "Male_Medium",
    /**普通女 */
    Female = "Female_Medium",
    /**Lopoly男 */
    LopolyMale = "Lowpoly_Adult_Male",
    /**Lopoly女 */
    LopolyFemale = "Lowpoly_Adult_FeMale",
}


/**用法 Active_UI 不独享 */
@Component
export default class ChangeCloth extends InteractObject {
    @mw.Property({ displayName: "MaleID", group: "性别对应服装表ID" })
    public maleConfigID: number = 0;
    @mw.Property({ displayName: "FeMaleID", group: "性别对应服装表ID" })
    public feMaleConfigID: number = 0;
    @mw.Property({ displayName: "isCloth", group: "是否是服装" })
    public isCloth: boolean = true;

    onStart() {
        this.init(ChangeCloth_S, ChangeCloth_C);
    }
}
//客户端
class ChangeCloth_C extends InteractLogic_C<ChangeCloth> {
    public static curModelID: number = null;
    onStart(): void {
    }

    async onPlayerAction(playerId: number, active: boolean, param: any): Promise<void> {
        const player = Player.getPlayer(playerId)
        const char = player.character;
        const humanV2 = char.getDescription()


        const sexStr = humanV2.advance.base.characterSetting.somatotype;
        let configID: number = null;
        //判断玩家性别，获取对应装扮ID
        if (sexStr == mw.SomatotypeV2.AnimeFemale || sexStr == mw.SomatotypeV2.LowpolyAdultFemale || sexStr == mw.SomatotypeV2.RealisticAdultFemale) {
            //女性
            configID = this.info.feMaleConfigID;
        } else if (sexStr == mw.SomatotypeV2.LowpolyAdultMale || sexStr == mw.SomatotypeV2.AnimeMale || sexStr == mw.SomatotypeV2.RealisticAdultMale) {
            //男性
            configID = this.info.maleConfigID;
        }
        if (!configID) {
            return;
        }

        if (this.info.isCloth) {
            //换相应套装
            ClothManager.instance.buyCurSelect(configID, true, false)
            await ClothManager.instance.changeRoleAvatar(configID)
            ClothManager.instance.saveAvatarData()
        } else {
            //生成特效和静态模型
            if (ChangeCloth_C.curModelID && ChangeCloth_C.curModelID != 0) {
                ClothManager.instance.clearModel(ChangeCloth_C.curModelID)
            }
            ClothManager.instance.createStaticModel([configID])
            ChangeCloth_C.curModelID = configID
        }
    }
}

//服务端
class ChangeCloth_S extends InteractLogic_S<ChangeCloth> {
    onStart(): void {
    }
    onPlayerAction(playerId: number, active: boolean, param: any) {
    }
}