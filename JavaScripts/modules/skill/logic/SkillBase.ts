import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../../config/GameConfig";
import { ISkillElement } from "../../../config/Skill";
import { ISkillLevelElement } from "../../../config/SkillLevel";
import { EventsName, PlayerStateType, SkillState } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { getMyCharacterGuid, getMyPlayerID, MyAction, MyAction as MyAction1, SoundManager, Tween } from "../../../ExtensionType";
import PlayerManager from "../../player/managers/PlayerManager";
import BulletTrrigerMgr from "../bullettrriger/BulletTrrigerMgr";
import { BehaviorType, ISkillEntity, SkillItemType } from "../define/SkillDefine";
import { SkillRun } from "../runtime/SkillRun";
import SkillMgr from "../SkillMgr";

export default class SkillBase {
    private _skill: number = 0;
    public set skill(value: number) {
        this._skill = value;
        this.skillConfig = GameConfig.Skill.getElement(this._skill);
        if (this.skillConfig) {
            for (let i = 1; i <= 3; i++) {
                if (this.skillConfig["SkillConfig" + i] != null)
                    SkillRun.register(this._skill * 10 + i, this.skillConfig["SkillConfig" + i], this.comBehivor);
            }
        }
    }
    public get skill() {
        return this._skill;
    }

    private _skillID: number = 0;
    public set skillID(value: number) {
        this._skillID = value;
        this.skillLevelConfig = GameConfig.SkillLevel.getElement(this._skillID);
        if (this.maxCharge != this.skillLevelConfig.MaxCharge) {
            this.maxCharge = this.skillLevelConfig.MaxCharge;
            this.charge = this.maxCharge;
        }
        this.cdTotol = this.skillLevelConfig.SkillCD;
    }
    public get skillID() {
        return this._skillID;
    }

    constructor(skill: number, host: string) {
        this.host = host;
        this.skill = skill;
        const go = GameObject.findGameObjectById(host);
        if (this.host && go instanceof mw.Character) {
            this.character = go;
            if (this.host == getMyCharacterGuid())
                this.hostId = getMyPlayerID()
        }
    }

    public init() { }

    public show(skillID: number, itemID: number) {
        this.skillID = skillID;
        this.itemID = itemID;
        this.State = this._state;
    }

    public runtime: number = -1;
    public disableState: number[] = []
    public skillState: SkillState = SkillState.Enable;
    public itemID: number = 0;
    public cdTotol: number = 0;
    public cd: number = -1;
    public host: string;
    public hostId: number = 0;

    public maxCharge: number = -1;
    public onChargeChange: MyAction1 = new MyAction1();
    public onStateChange: MyAction = new MyAction();
    private _charge: number = -1;
    public set charge(charge: number) {
        this._charge = charge;
        this.onChargeChange.call(this._charge, this.maxCharge);
    }
    public get charge() {
        return this._charge;
    }

    protected character: mw.Character;
    private _state: SkillState = 0;
    public set State(state: SkillState) {
        if (this._state == SkillState.Disable && !PlayerManager.instance.playerIsFree(this.hostId)) {
            return;
        }
        this.setState(state);
    }
    public get State() {
        return this._state;
    }
    public setState(state: SkillState, ...params: any[]) {
        this._state = state;
        if (this._state == SkillState.Using && state == SkillState.Disable) {
            SkillMgr.Inst.skillOver(this)
        }
        this.onStateChange.call(this._state, ...params);
    }

    public skillConfig: ISkillElement;
    public skillLevelConfig: ISkillLevelElement;
    public active(...params: any[]) {
        if (this.charge == 0 || GlobalData.skillCD > 0 || this.State < 0)
            return
        if (PlayerManagerExtesion.isCharacter(this.character) && PlayerManager.instance.playerIsDead(this.hostId)) {
            console.error("玩家繁忙时使用技能")
            return;
        }
        if (this.runtime > 0) {
            SkillMgr.Inst.skillOver(this)
            return;
        }
        let hitObj: mw.GameObject = null
        let rot: mw.Rotation = null
        /**辅助瞄准 */
        if (this.skillConfig.IsSupport) {
            hitObj = this.aim()
            rot = this.lookAt(hitObj, rot)
        }
        /**技能编辑器 */
        if (this.skillConfig["SkillConfig" + (this.State + 1)]) {
            let pos = this.character.worldTransform.position;
            if (this.skillConfig.ReleaseType == 1 && hitObj) pos = hitObj.worldTransform.position
            SkillRun.cast(this.character, this.skill * 10 + this.State + 1, { pos: pos, rot: rot, diy: [hitObj ? hitObj.gameObjectId : null, this.skillID] });
        }
        /**先把技能断了再做技能的准备 */
        this.State = SkillState.CD
        if (this.skillState == SkillState.Using) {
            PlayerManager.instance.setPlayerState(PlayerStateType.isUsingSkill, true, this.hostId);
        }
        this.onStand(hitObj, ...params).then((bool: boolean) => {
            if (bool) {
              
                /**当一个技能释放成功时需要将所有技能都进入内置cd */
                GlobalData.skillCD = GlobalData.defaultCD;
                if (this.skillLevelConfig.RunTime > 0) {
                    this.runtime = this.skillLevelConfig.RunTime
                    this.State = this.skillState
                } else {
                    this.State = this.skillState
                    SkillMgr.Inst.skillOver(this)
                }
                /**埋点 */
                Event.dispatchToLocal(EventsName.UseSkill, this.itemID, this.skillID);
                this.onStart(hitObj, ...params)
            } else {
                SkillMgr.Inst.skillOver(this)
            }
        })
    }

    /**
     * @description: 技能开始前的准备阶段
     * @return {*}
     */
    protected async onStand(hitObj: mw.GameObject, ...params: any[]): Promise<boolean> {
        return true
    }

    protected aim() {
        let hitObj: mw.GameObject = null
        if (this.skillConfig.AimType == 2) {

        } else if (this.skillConfig.AimType == 1) {
            // const player = PlayerManager.getNearestPlayer(this.character, 2000)
            // player && (hitObj = player.character)
        } else {

        }
        return hitObj;
    }

    private _quaternion: mw.Quaternion = new mw.Quaternion()
    protected lookAt(hitObj: mw.GameObject, rot: mw.Rotation) {
        if (!hitObj) return
        mw.Quaternion.rotationTo(mw.Vector.forward, hitObj.worldTransform.position.subtract(this.character.worldTransform.position).normalize(), this._quaternion)
        rot = this._quaternion.toRotation();
        new Tween({ x: this.character.worldTransform.rotation }).to({ x: rot }, 150).onUpdate(value => {
            value.x.x = value.x.y = 0;
            this.character.worldTransform.rotation = value.x;
        }).start();
        rot.x = rot.y = 0
        return rot;
    }

    /**
     * @description: 技能真正的开始
     * @param {array} params
     * @return {*}
     */
    protected onStart(hitObj: mw.GameObject, ...params: any[]) { }

    /**
     * @description: 代表一个技能放完并进入CD
     * @return {*}
     */
    public onOver() { }


    /**
     * @description: 当MP减少时
     * @return {*}
     */
    public onMpDown() {
        
    }

    /**
     * @description: 技能命中后的回调
     * @return {*}
     */
    public onHit(hitObj: mw.GameObject, hitLocation: mw.Vector, damage: number, effect: number, music: number): boolean {
        let isHit: boolean = false;
        if (this.host && hitObj) {
            if (!hitLocation) hitLocation = hitObj.worldTransform.position;
            if (PlayerManagerExtesion.isCharacter(hitObj)) {
                // isHit = PlayerManager.instance.playerAttrChange(AttrType.Hp, -damage, hitObj.player)
            } else {
                
            }
            if (isHit) {
                if (this.skillLevelConfig.Param1 && this.skillLevelConfig.Param1 != "") {
                    const newLevelID = Number(this.skillLevelConfig.Param1);
                    const newSkill = Math.floor(newLevelID * 0.01)
                    const skill = SkillMgr.Inst.findSkill(newSkill, this.host)
                    skill.skillID = newLevelID
                    skill.host = this.host
                    if (hitObj) {
                        SkillRun.cast(this.character, newSkill * 10 + 1, { pos: hitLocation, diy: [this.host, skill.skillID] })
                    }
                }
                // 音效
                const sound = GameConfig.Music.getElement(music);
                if (sound) {
                    const musicRange = sound.MusicRange;
                    const range = musicRange ? { innerRadius: musicRange[0], falloffDistance: musicRange[1], } : undefined;
                    mw.SoundService.play3DSound(sound.MusicGUID, hitLocation, 1, sound.Music, range);
                }
                //特效
                const e = GameConfig.Effect.getElement(effect);
                e && GeneralManager.rpcPlayEffectAtLocation(e.EffectID, hitLocation, e.EffectTime, e.EffectRotate.toRotation(), e.EffectLarge)
            }
        }
        return isHit;
    }

    /**
     * @description: 当技能被从技能组中移除时
     * @return {*}
     */
    public onRemove() { }

    public onUpdate(dt: number) {
        if (this.cd >= 0) {
            this.cd -= dt;
            if (this.cd <= 0) {
                if (this.charge + 1 <= this.maxCharge) {
                    this.State = SkillState.Enable
                    this.charge++;
                    if (this.charge != this.maxCharge) this.cd = GameConfig.SkillLevel.getElement(this.skillID).SkillCD
                }
            }
        }
        if (this.runtime > 0) {
            this.runtime -= dt
            if (this.runtime <= 0) {
                SkillMgr.Inst.skillOver(this);
                return;
            }
        }
    }

    public comBehivor = (entity: ISkillEntity, type: BehaviorType, ...params) => {
        const character = Player.localPlayer.character;
        const levelConfig = GameConfig.SkillLevel.getElement(entity.param.diy[1]);
        const skillConfig = GameConfig.Skill.getElement(Number((entity.param.diy[1] / 100).toFixed(0)))
        switch (type) {
            case BehaviorType.CastStart:
                // console.log('开始释放引导');
                break;
            case BehaviorType.CastBreak:
                // console.log('释放中断')
                break;
            case BehaviorType.CastEnd:
                // console.log('释放引导完成')
                break;
            case BehaviorType.Event: //编辑器中事件模块的返回
                //事件ID
                break;
            case BehaviorType.ItemStart: //模块执行
                //模块类型
                if (params[0] == SkillItemType.Action && character && character.gameObjectId == entity.host.gameObjectId && !skillConfig.CanMove) {
                    character.movementEnabled = false;
                    character.jumpEnabled = false;
                }
                if (params[0] == SkillItemType.Action && entity.value != 1) {
                    GlobalData.skillCD = params[2];
                }
                if (params[0] == SkillItemType.Put || (params[0] == SkillItemType.Effect && entity.value == 1)) {
                    if (levelConfig.SkillType == 2) break;
                    //params[2] 子弹存在时间
                    //params[1] 子弹obj
                    BulletTrrigerMgr.instance.createBullet(params[1], entity.itemId, params[2], entity.host.gameObjectId, this, levelConfig.Damage, levelConfig.TrrigerConfig)
                }
                // console.log(params[0] as SkillItemType + '模块开始');
                break;
            case BehaviorType.ItemEnd: //模块执行完成
                if (params[0] == SkillItemType.Action && character && character.gameObjectId == entity.host.gameObjectId && !skillConfig.CanMove) {
                    character.movementEnabled = true;
                    character.jumpEnabled = true;
                }
                // console.log('模块执行完成')
                break;
            case BehaviorType.End: //所有技能模块执行完返回
                if (character && character.gameObjectId == entity.host.gameObjectId && levelConfig.SkillType == 2 && entity.param.diy[0]) {
                    let trrigerConfig = levelConfig.TrrigerConfig;
                    trrigerConfig = trrigerConfig.split("effect=")[1];
                    const effect = Number(trrigerConfig.substring(0, trrigerConfig.indexOf(",")));
                    const music = Number(trrigerConfig.split("music=")[1]) || 50;
                    const hitObj = GameObject.findGameObjectById(entity.param.diy[0])
                    this.onHit(hitObj, null, levelConfig.Damage, effect, music);
                }
                // console.log('释放完成')
                break;
        }
    };
}
export function registerSkill(skill: number) {
    return function <T extends SkillBase>(constructor: TypeName<T>) {
        if (SystemUtil.isClient()) {
            SkillMgr.Inst.skillClassMap.set(skill, constructor);
        }
    };
}
