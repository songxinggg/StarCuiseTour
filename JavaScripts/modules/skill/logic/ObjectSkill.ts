import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { EffectManager, SoundManager } from "../../../ExtensionType";
import { PlayerStateType, SkillState } from "../../../const/GameEnum";
import { Asset } from "../../../const/GlobalData";
import ClothManager from "../../player/managers/ClothManager";
import PlayerManager from "../../player/managers/PlayerManager";
import SkillBase, { registerSkill } from "./SkillBase";

@registerSkill(9001)
export default class ObjectSkill extends SkillBase {

    private henShinModelId: number = 0;

    public init(): void {
        this.disableState.push(PlayerStateType.Interaction, PlayerStateType.DoublePeopleAction,PlayerStateType.Busy)
    }


    protected onStart(hitObj: mw.GameObject, ...params: any[]): void {
        this.henShinChange(+this.skillLevelConfig.Param1)
    }


    public async henShinChange(modelId: number) {
        if (this.henShinModelId == modelId) return
        GeneralManager.rpcPlayEffectOnGameObject(Asset.changeEffect, this.character)
        SoundManager.playSound(Asset.changeMusic)
        PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, true);
        if (this.henShinModelId) { 
            ClothManager.instance.clearModel(this.henShinModelId)
        }
        if (modelId) {
            this.henShinModelId = modelId;
            await ClothManager.instance.henShinModel(modelId)
        }
    }


    public henRemove() {
        if (this.henShinModelId) { 
            PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, false);
            ClothManager.instance.clearModel(this.henShinModelId)
            this.henShinModelId = 0;
            PlayerManager.instance.setPlayerVis(this.character.player,mw.PropertyStatus.On,true)
        }
    }



   
}