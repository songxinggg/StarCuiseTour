import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿import { SoundManager } from "../../../ExtensionType";
import { IPropActionElement } from "../../../config/PropAction";
import { IPropFlyElement } from "../../../config/PropFly";
import { IPropPlacementElement } from "../../../config/PropPlacement";
import { PlayerStateType } from "../../../const/GameEnum";
import PlayerManager from "../../player/managers/PlayerManager";
import { mathTools_arryToVector, mathTools_firstPlaceNumber, mathTools_isEmpty } from "./PropTool";
/** 道具类型接口 */
export interface IPropBase {
    config: any
    /** 初始化设置 */
    setData(data: any);
    /** 装备道具 */
    equip(owner: mw.Player);
    /** 卸载道具 */
    unLoad(other?: any);
    /** 销毁道具 */
    destroy();
}
/** 道具类型基类 */
export class PropBase implements IPropBase {
    /** 道具ID */
    public _id: number;
    /** 类型ID */
    public _type: number;
    /** 道具模型 */
    public _object: mw.GameObject;
    /** 设置buff代理 */
    public _buffAction: mw.Action2<number, number> = null;
    public config: any;
    objGuid: string

    /** 道具唯一ID */
    public get propId(): number {
        return this._onlyId;
    }
    private static onlyId: number = 0;
    private _onlyId: number = null;

    constructor(guid: string, propId: number) {
        PropBase.onlyId++;
        this._onlyId = PropBase.onlyId;

        this._buffAction = new mw.Action2();
        this._id = propId;
        this._type = mathTools_firstPlaceNumber(propId);
        this.objGuid = guid
    }
    async init() {
        this._object = await SpawnManager.asyncSpawn({ guid: this.objGuid, replicates: true });
        this._object.setCollision(mw.PropertyStatus.Off, true);
        this._object.setVisibility(mw.PropertyStatus.Off);
    }
    setData(data: any) { };
    equip(owner: mw.Player) { };
    unLoad(other?: any) {
        this._buffAction.clear();
    }
    destroy() {
        this._id = null;
        this._type = null;
        if (this._object) {
            this._object.destroy();
        }
        this._buffAction.remove;
    }
}
/** 动作类道具 */
export class PropBase_Action extends PropBase implements IPropBase {
    private _effOrigin: number = null;

    private _eff: number = null;

    private _soundOrigin: number = null;

    private _sound: number = null;

    private _meshOrigin: string = null;

    private _mesh: string = null;

    private _curAnim: mw.Animation = null;

    private _stance: mw.SubStance;

    //基础数据
    public config: IPropActionElement = null;

    private _owner: mw.Player;
    //切换数据
    setData(data: IPropActionElement) {
        this.config = data;
    }

    equip(owner: mw.Player): void {
        this._owner = owner;
        this.resetState();
        this.changeBaseState(true);
    }

    unLoad(): void {
        super.unLoad();
        this.changeBaseState(false);
        this.resetState();
        this._object.parent = null;
        this._owner = null;
    }

    destroy() {
        super.destroy();
        this.resetState();
        this._owner = null;
        this.config = null;
    }

    /**
     * 状态切换接口
     * @returns 
     */
    propSwitchoverState() {
        if (!this._owner) return;
        this.resetState();
        this.changeAllState();
    }

    /**
     * 基础状态
     * @param onOff 开关 
     */
    private changeBaseState(onOff: boolean) {
        if (onOff) {
            this._object.setVisibility(mw.PropertyStatus.On);
            if (mathTools_isEmpty(this.config.MaterialGuid)) {
                this._meshOrigin = this.config.MaterialGuid;
            };
            if (mathTools_isEmpty(this.config.ObjParameter)) {
                this.changePoint(this.config.ObjPoint, this.config.ObjParameter);
            }
            if (mathTools_isEmpty(this.config.AnimGuid)) {
                this.changeAnim(this.config.AnimGuid, this.config.AnimParameter[0], this.config.AnimParameter[1], this.config.BlendMode);
            }
            if (mathTools_isEmpty(this.config.SoundGuid)) {
                this._soundOrigin = mw.SoundService.play3DSound(this.config.SoundGuid, this._object, this.config.SoundParameter[2], this.config.SoundParameter[1], { radius: this.config.SoundParameter[0], falloffDistance: this.config.SoundParameter[0] * 1.2 });
            }
            if (mathTools_isEmpty(this.config.EffGuid)) {
                this._effOrigin = GeneralManager.rpcPlayEffectOnGameObject(this.config.EffGuid, this._object, this.config.EffParameter2, mathTools_arryToVector(this.config.EffParameter1).loc, mathTools_arryToVector(this.config.EffParameter1).Roc, mathTools_arryToVector(this.config.EffParameter1).Scale);
            }
        } else {
            this._object.setVisibility(mw.PropertyStatus.Off);
            if (this._effOrigin) {
                EffectService.stop(this._effOrigin);
                this._eff = null;
            }
            if (this._soundOrigin) {
                mw.SoundService.stop3DSound(this._soundOrigin);
                this._sound = null;
            }
        }
    }
    /**
     * 所有状态修改
     * @param data 数据
     */
    private changeAllState() {
        if (mathTools_isEmpty(this.config.ObjParameter, "pointParameter")) {
            this.changePoint(this.config.ObjPoint, this.config.ObjParameter);
        }
        if (mathTools_isEmpty(this.config.AnimGuid, "animGuid") && mathTools_isEmpty(this.config.AnimParameter[0], "animTime")) {
            this.changeAnim(this.config.AnimGuid, this.config.AnimParameter[0], this.config.AnimParameter[1], this.config.BlendMode);
        }
        if (mathTools_isEmpty(this.config.EffGuid, "EffGuid") && mathTools_isEmpty(this.config.EffParameter1, "EffParameter1")) {
            this.changeEff(this.config.EffGuid, this.config.EffParameter2, this.config.EffParameter1);
        }

        if (mathTools_isEmpty(this.config.SoundGuid, "soundGuid") && mathTools_isEmpty(this.config.SoundParameter[0], "soundRadius")) {
            this.changeSound(this.config.SoundGuid, this.config.SoundParameter[2], this.config.SoundParameter[1], this.config.SoundParameter[0]);
        }
        if (mathTools_isEmpty(this.config.MaterialGuid, "meshGuid")) {
            this.changeMesh(this.config.MaterialGuid);
        }
    }
    /**
     * 改变挂点
     * @param point 
     * @param parameter 
     */
    private changePoint(point: mw.HumanoidSlotType, parameter: Array<number>) {
        if (this._object && this._owner) {
            this._owner.character.attachToSlot(this._object, point);
            this._object.localTransform.position = (mathTools_arryToVector(parameter).loc);
            this._object.localTransform.rotation = (mathTools_arryToVector(parameter).Roc);
            this._object.localTransform.scale = ((mathTools_arryToVector(parameter).Scale));
        }
    }
    /**
     * 改变动作
     * @param animGuid 
     * @param animTime 
     * @param loop 
     */
    private changeAnim(animGuid: string, animTime: number, loop: number, blendMode: number) {
        if (this._owner) {
            if (blendMode === 3) {
                this._curAnim = PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, animGuid, true);
                this._curAnim.loop = loop;
                this._curAnim.speed = animTime;
                setTimeout(() => {
                    this._curAnim?.play();
                }, 50);
            } else {
                this._stance = PlayerManagerExtesion.loadStanceExtesion(this._owner.character, animGuid)
                this._stance.blendMode = blendMode
                this._stance.play()
            }
        }
    }
    /**
     * 改变特效
     * @param guid 
     * @param loop 
     * @param parameter 
     * @returns 
     */
    private changeEff(guid: string, loop: number, parameter: Array<number>) {
        if (!this._object) return;
        this._eff = GeneralManager.rpcPlayEffectOnGameObject(guid, this._object, loop, mathTools_arryToVector(parameter).loc, mathTools_arryToVector(parameter).Roc, mathTools_arryToVector(parameter).Scale);
    }
    /**
     * 改变声音
     * @param guid 
     * @param loop 循环
     * @param vol 音量
     * @param radius 范围
     * @returns 
     */
    private changeSound(guid: string, loop: number, vol: number, radius: number) {
        if (!this._object) return;
        this._sound = mw.SoundService.play3DSound(guid, this._object, loop, vol, { radius: radius, falloffDistance: radius * 1.2 });
    }

    /**
     * 改变材质
     * @param guid 
     * @returns 
     */
    private changeMesh(guid: string) {
        if (!this._object)
            return;
        Event.dispatchToAllClient("propChangeMesh", this._object, guid);
        this._mesh = guid;
    }
    /**
     * 表现重置
     */
    private resetState() {
        if (this._curAnim && this._owner) {
            this._curAnim.stop();
            this._curAnim = null;
        }
        if (this._stance && this._owner) {
            this._stance.stop();
            this._stance = null;
        }
        if (this._eff) {
            EffectService.stop(this._eff);
            this._eff = null;
        }
        if (this._sound) {
            mw.SoundService.stop3DSound(this._sound);
            this._sound = null;
        }
        if (this._mesh) {
            //TODO  默认材质
            this.changeMesh(this._meshOrigin);
            this._mesh = null;
        }
    }
}
/** 飞行类道具 */
export class PropBase_Fly extends PropBase implements IPropBase {

    private _owner: mw.Player;

    private _eff: number = null;

    private eff_flyWakeFlameLeft: number = null;
    private eff_flyWakeFlameRight: number = null;
    private eff_jetWakeFlameLeft: number = null;
    private eff_jetWakeFlameRight: number = null;
    private eff_jetWakeFlame: number = null;
    private eff_traWakeFlame: number = null;

    private setTime_boost

    private bool_boost: boolean = false;

    private _barkFly: number = null;

    private isWalk: boolean = false;

    /**是否飞行中 */
    private isFly = false;

    setData(data: IPropFlyElement) {
        this.config = data;
    }

    equip(owner: mw.Player): void {
        this._owner = owner;

        this._barkFly = this._owner.character.horizontalBrakingDecelerationFalling;

        if (mathTools_isEmpty(this.config.effGuid)) {
            let a = mathTools_arryToVector(this.config.ObjParameter).Scale
            this._eff = GeneralManager.rpcPlayEffectOnGameObject(this.config.effGuid, this._object, 0, mw.Vector.zero, mw.Rotation.zero, a.multiply(owner.character.worldTransform.scale));
        } else {
            this._object.setVisibility(mw.PropertyStatus.On);
        }
        if (mathTools_isEmpty(this.config.ObjPoint) && mathTools_isEmpty(this.config.ObjParameter)) {

            this._owner.character.attachToSlot(this._object, this.config.ObjPoint);
            this._object.localTransform.position = (mathTools_arryToVector(this.config.ObjParameter).loc);
            this._object.localTransform.rotation = (mathTools_arryToVector(this.config.ObjParameter).Roc);
            this._object.localTransform.scale = (mathTools_arryToVector(this.config.ObjParameter).Scale);
        }
    }

    unLoad(): void {
        super.unLoad();
        if (this._barkFly != null) {
            this._owner.character.horizontalBrakingDecelerationFalling = this._barkFly;
        }

        if (this._eff) {
            EffectService.stop(this._eff);
        };
        if (this.isFly) {
            this.flyActiveEff(false);
        }
        this._object.parent = null;
        this._object.setVisibility(mw.PropertyStatus.Off);
        this._owner = null;
        this.isWalk = true;
    }

    destroy() {
        this.unLoad();
        super.destroy();
        this._owner = null;
        this.config = null;
    }

    /**
     * 飞行背包激活
     * @param onOff 开关 
     */
    public flyActiveEff(onOff: boolean): void {
        switch (onOff) {
            case true:
                this.isFly = true;
                //左右特效
                if (mathTools_isEmpty(this.config.flyWakeFlameGuid)) {
                    this.eff_flyWakeFlameLeft = GeneralManager.rpcPlayEffectOnGameObject(this.config.flyWakeFlameGuid, this._object, 0, mathTools_arryToVector(this.config.flyWakeFlameParameterLeft).loc, mathTools_arryToVector(this.config.flyWakeFlameParameterLeft).Roc, mathTools_arryToVector(this.config.flyWakeFlameParameterLeft).Scale);
                    this.eff_flyWakeFlameRight = GeneralManager.rpcPlayEffectOnGameObject(this.config.flyWakeFlameGuid, this._object, 0, mathTools_arryToVector(this.config.flyWakeFlameParameterRight).loc, mathTools_arryToVector(this.config.flyWakeFlameParameterRight).Roc, mathTools_arryToVector(this.config.flyWakeFlameParameterRight).Scale);
                }
                //左右拖尾
                if (mathTools_isEmpty(this.config.jetWakeFlameGuid)) {
                    this.eff_jetWakeFlameLeft = GeneralManager.rpcPlayEffectOnGameObject(this.config.jetWakeFlameGuid, this._object, 0, mathTools_arryToVector(this.config.jetWakeFlameParameterLeft).loc, mathTools_arryToVector(this.config.jetWakeFlameParameterLeft).Roc, mathTools_arryToVector(this.config.jetWakeFlameParameterLeft).Scale);
                    this.eff_jetWakeFlameRight = GeneralManager.rpcPlayEffectOnGameObject(this.config.jetWakeFlameGuid, this._object, 0, mathTools_arryToVector(this.config.jetWakeFlameParameterRight).loc, mathTools_arryToVector(this.config.jetWakeFlameParameterRight).Roc, mathTools_arryToVector(this.config.jetWakeFlameParameterRight).Scale);
                }
                this._owner.character.switchToFlying()
                PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, true, this._owner);
                if (mathTools_isEmpty(this.config.flyAccelerateAnimGuid)) {
                    PlayerManagerExtesion.changeStanceExtesion(this._owner.character,this.config.flyAccelerateAnimGuid);
                }

                break;
            case false:
                this.isFly = false;
                if (this.eff_jetWakeFlameLeft || this.eff_jetWakeFlameRight) {
                    EffectService.stop(this.eff_jetWakeFlameLeft);
                    EffectService.stop(this.eff_jetWakeFlameRight);
                }
                if (this.eff_flyWakeFlameLeft || this.eff_flyWakeFlameRight) {
                    EffectService.stop(this.eff_flyWakeFlameLeft);
                    EffectService.stop(this.eff_flyWakeFlameRight);
                }

                if (this.isWalk) {
                    this._owner.character.switchToWalking()
                    PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, false, this._owner)
                    PlayerManagerExtesion.changeStanceExtesion(this._owner.character,``);
                }

                this.flyUp(false);
                this.flyAccelerate(false);
                break;
        }

    }

    /**
     * 向上飞
     * @param onOff 开关
     */
    public flyUp(onOff: boolean): void {
        if (onOff) {
            PlayerManagerExtesion.changeStanceExtesion(this._owner.character,this.config.flyGoUpStance);
        } else {
            if (this.isWalk) {
                PlayerManagerExtesion.changeStanceExtesion(this._owner.character,``);
            }
        }
    }
    /**
     * 加速功能
     * @param onOff 加速开关
     * @returns 
     */
    public flyAccelerate(onOff?: boolean): void {
        if (onOff) {
            if (!this.bool_boost) {
                this.bool_boost = true;
                let oldFiySpeed = this._owner.character.maxFlySpeed
                PlayerManagerExtesion.rpcPlayAnimation(this._owner.character, this.config.flyAccelerateAnimGuid, 0, 1);
                this._owner.character.maxFlySpeed = Number(this.config.flyAccelerateSpeed);
                this._owner.character.horizontalBrakingDecelerationFalling = this.config.flyAccelerateBraking;

                if (mathTools_isEmpty(this.config.flyAccelerateEffGuid)) {
                    this.eff_traWakeFlame = GeneralManager.rpcPlayEffectOnGameObject(this.config.flyAccelerateEffGuid, this._object, 0, mathTools_arryToVector(this.config.flyAccelerateEffParameter).loc, mathTools_arryToVector(this.config.flyAccelerateEffParameter).Roc, mathTools_arryToVector(this.config.flyAccelerateEffParameter).Scale);
                }
                if (mathTools_isEmpty(this.config.flyAcceleratejetWkeFlameGuid)) {
                    this.eff_jetWakeFlame = GeneralManager.rpcPlayEffectOnGameObject(this.config.flyAcceleratejetWkeFlameGuid, this._object, 0, mathTools_arryToVector(this.config.flyAcceleratejetWkeFlameParameter).loc, mathTools_arryToVector(this.config.flyAcceleratejetWkeFlameParameter).Roc, mathTools_arryToVector(this.config.flyAcceleratejetWkeFlameParameter).Scale);
                }
                this.setTime_boost = setTimeout(() => {
                    if (this.bool_boost) {
                        PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, this.config.flyAccelerateAnimGuid).stop();
                        this._owner.character.maxFlySpeed = oldFiySpeed;
                        this._owner.character.brakingDecelerationFlying = 300;
                        if (this._barkFly != null) {
                            this._owner.character.horizontalBrakingDecelerationFalling = this._barkFly;
                        }

                        if (mathTools_isEmpty(this.config.flyAccelerateAnimGuid)) {
                            PlayerManagerExtesion.changeStanceExtesion(this._owner.character, this.config.flyAccelerateAnimGuid);
                        } else {
                            PlayerManagerExtesion.changeStanceExtesion(this._owner.character,``);
                        }

                        if (this.eff_jetWakeFlame) {
                            EffectService.stop(this.eff_jetWakeFlame);
                        }
                        if (this.eff_traWakeFlame) {
                            EffectService.stop(this.eff_traWakeFlame);
                        }
                        this.bool_boost = false;
                        this.setTime_boost = null;
                    }
                }, this.config.flyAccelerateTime * 1000);
                // this._buffAction.call(this._owner.playerId, this._config.buffId);
            } else {
                return;
            }
        } else {
            if (this.setTime_boost) {
                if (this.bool_boost) {
                    PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, this.config.flyAccelerateAnimGuid).stop();
                    this._owner.character.maxFlySpeed = 300;
                    this._owner.character.brakingDecelerationFlying = 300;
                    if (this._barkFly != null) {
                        this._owner.character.horizontalBrakingDecelerationFalling = this._barkFly;
                    }

                    if (mathTools_isEmpty(this.config.flyAccelerateAnimGuid)) {
                        if (this.isWalk) {
                            PlayerManagerExtesion.changeStanceExtesion(this._owner.character, this.config.flyAccelerateAnimGuid);
                        }
                    } else {
                        if (this.isWalk) {
                            PlayerManagerExtesion.changeStanceExtesion(this._owner.character,``);
                        }
                    }
                    if (this.eff_jetWakeFlame) {
                        EffectService.stop(this.eff_jetWakeFlame);
                    }
                    if (this.eff_traWakeFlame) {
                        EffectService.stop(this.eff_traWakeFlame);
                    }
                    this.bool_boost = false;
                    this.setTime_boost = null;
                }
            }
        }

    }

    public changeWalk(bo: boolean): void {
        this.isWalk = !bo;
    }
}
/** 放置类道具 */
export class PropBase_Placement extends PropBase implements IPropBase {
    private _owner: mw.Player;

    private _eff: number = null;

    private setTime_anim = null;

    setData(data: IPropPlacementElement) {
        this.config = data;
    }

    equip(owner: mw.Player): void {
        this._owner = owner;
        if (mathTools_isEmpty(this.config.ObjEffGuid)) {
            this._eff = GeneralManager.rpcPlayEffectOnGameObject(this.config.ObjEffGuid, this._object, 0, mw.Vector.zero, mw.Rotation.zero, mathTools_arryToVector(this.config.ObjParameter).Scale);
        } else {
            this._object.setVisibility(mw.PropertyStatus.On);
            // this._object.worldTransform.scale = (mathTools_arryToVector(this._config.ObjParameter).Scale);
        }
        this.switchAnim(true);
    }

    unLoad(): void {
        super.unLoad();
        if (this._eff) {
            EffectService.stop(this._eff);
        };
        if (this.setTime_anim) {
            clearTimeout(this.setTime_anim);
            this.setTime_anim = null;
        }
        PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, this.config.AnimUseGuid).stop();
        PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, this.config.AnimEquipGuid).stop();
        this._object.parent = null;
        this._object.setVisibility(mw.PropertyStatus.Off);
        this._owner = null;
    }

    destroy() {
        this.unLoad();
        super.destroy();
        this._owner = null;
    }
    /**
     * 使用放置类
     */
    usePlacementProp(): void {
        this.switchAnim(false);
        if (mathTools_isEmpty(this.config.AnimEquipGuid)) {
            this.setTime_anim = setTimeout(() => {
                this.switchAnim(true);
            }, this.config.AnimUseParameter * 1000);
        }
        this.setDelay(this._owner.character.worldTransform.position.add(this._owner.character.worldTransform.getForwardVector().multiply(this.config.DelayOffsetFront)));
    }

    /**
     * 改变挂点
     * @param point 
     * @param parameter 
     */
    private changePoint(point: mw.HumanoidSlotType, parameter: Array<number>) {
        if (this._object && this._owner) {
            this._owner.character.attachToSlot(this._object, point);
            this._object.localTransform.position = (mathTools_arryToVector(parameter).loc);
            this._object.localTransform.rotation = (mathTools_arryToVector(parameter).Roc);
            if (!mathTools_isEmpty(this.config.ObjEffGuid)) {
                // this._object.worldTransform.scale = (mathTools_arryToVector(parameter).Scale);
                this._object.localTransform.scale = ((mathTools_arryToVector(parameter).Scale));
            }
        }
    }

    /**
     * 动作切换
     * @param playType true 装备， false 使用 
     */
    private switchAnim(playType: boolean) {
        switch (playType) {
            case true:
                PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, this.config.AnimUseGuid).stop();
                if (mathTools_isEmpty(this.config.ObjPoint, "ObjPoint")) {
                    this.changePoint(this.config.ObjPoint, this.config.ObjParameter);
                }
                if (mathTools_isEmpty(this.config.AnimEquipGuid)) {
                    PlayerManagerExtesion.rpcPlayAnimation(this._owner.character, this.config.AnimEquipGuid, 0, this.config.AnimEquipParameter);
                }
                break;
            case false:
                PlayerManagerExtesion.loadAnimationExtesion(this._owner.character, this.config.AnimEquipGuid).stop();
                if (mathTools_isEmpty(this.config.ObjUsePoint, "ObjUsePoint")) {
                    this.changePoint(this.config.ObjUsePoint, this.config.ObjUseParameter);
                }
                if (mathTools_isEmpty(this.config.AnimUseGuid)) {
                    PlayerManagerExtesion.rpcPlayAnimation(this._owner.character, this.config.AnimUseGuid, 1, this.config.AnimUseParameter);
                }
                break;
        }
    }
    /**
     * 设置延时效果
     * @param ve 效果位置
     */
    private setDelay(ve: mw.Vector): void {

        let cur_count = this.config.DelayCount;
        let cur_model = SpawnManager.spawn({ guid: this.config.DelayModelGuid, replicates: true });

        cur_model.worldTransform.position = ve.subtract(mathTools_arryToVector(this.config.DelayModelParameter).loc);
        cur_model.worldTransform.rotation = mathTools_arryToVector(this.config.DelayModelParameter).Roc;
        cur_model.worldTransform.scale = mathTools_arryToVector(this.config.DelayModelParameter).Scale;
        cur_model.setCollision(mw.PropertyStatus.Off, true);

        let endLoc = cur_model.worldTransform.position;

        let cur_modelEff: number = null;
        if (mathTools_isEmpty(this.config.DelayModelEffGuid)) {
            cur_modelEff = GeneralManager.rpcPlayEffectOnGameObject(this.config.DelayModelEffGuid, cur_model, 0, mathTools_arryToVector(this.config.DelayModelEffParameter).loc, mathTools_arryToVector(this.config.DelayModelEffParameter).Roc, mathTools_arryToVector(this.config.DelayModelEffParameter).Scale);
        };
        setTimeout(() => {
            let interval_loop = setInterval(() => {

                if (cur_count > 0) {
                    cur_count--;
                } else {
                    if (mathTools_isEmpty(this.config.DelayRange)) {
                        this.setBuffRange(endLoc, this.config.DelayRange, this.config.DelayBuff);
                    }
                    if (cur_modelEff) {
                        EffectService.stop(cur_modelEff);
                    }
                    cur_model.destroy();
                    cur_model = null;
                    clearInterval(interval_loop);
                    return;
                }
                if (this.config.DelayCount <= 1) {
                    EffectService.stop(cur_modelEff);
                    cur_modelEff = 0;
                }


                mw.SoundService.play3DSound(this.config.DelaySoundGuid, cur_model, 1, this.config.DelaySoundParameter[0], {
                    radius: this.config.DelaySoundParameter[1], falloffDistance: this.config.DelaySoundParameter[1] * 1.2
                });
                GeneralManager.rpcPlayEffectOnGameObject(this.config.DelayEffGuid, cur_model, 1, mathTools_arryToVector(this.config.DelayEffParameter).loc, mathTools_arryToVector(this.config.DelayEffParameter).Roc, mathTools_arryToVector(this.config.DelayEffParameter).Scale);
            }, 1000 * this.config.DelayCountTime);

        }, 1000 * this.config.DelayTime);
    }
    /**
     * 放置效果buff
     * @param pos 位置
     * @param range 范围
     * @param buffArr buff数组
     */
    private setBuffRange(pos: mw.Vector, range: number, buffArr: number[]): void {
        QueryUtil.sphereOverlap(pos, range, false).forEach((obj, index) => {
            if (((obj) instanceof mw.Character)) {
                let player = (obj as mw.Character).player;
                buffArr.forEach((value, index) => {
                    if (this._buffAction) {
                        this._buffAction.call(player.playerId, value);
                    }
                })
            } else {
                // console.error(`index --- ${index} objName --- ${obj.name} `)
            }
        })
    }
}