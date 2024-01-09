import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { Camp, EventsName, FSMStateType, PlayerStateType, SettleInfo, TitleType } from "../../const/GameEnum";
import { Asset, GlobalData } from "../../const/GlobalData";
import Tips from "../../ui/commonUI/Tips";
import GameUtils from "../../utils/GameUtils";
import { BagModuleC } from "../bag/BagModuleC";
import { BagHub } from "../bag/ui/BagHub";
import HideSeekUI from "../battle/ui/HideSeekUI";
import Settle from "../battle/ui/Settle";
import SignUI from "../battle/ui/SignUI";
import { GuideHelper } from "../guideModule/GuideHelper";
import { MGSMsgHome } from "../mgsMsg/MgsmsgHome";
import ClothManager from "../player/managers/ClothManager";
import PlayerManager from "../player/managers/PlayerManager";

import PartyModuleS from "./PartyModuleS";


export default class PartyModuleC extends ModuleC<PartyModuleS, null> {
    
    private _warnTriggerEffect: mw.Effect;

    private character: mw.Character;


    private _hideSeekUI: HideSeekUI;


    

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this._hideSeekUI = UIManager.create(HideSeekUI);
        this._hideSeekUI.attackAction.add(() => {
            this.onAttack();
            
        })

        this._hideSeekUI.guideAction.add(() => { 
            this.requreGuideLine();
        })

        
    }

    protected onEnterScene(sceneType: number): void {
        this.character = this.localPlayer.character;
    }


    public currentCamp: Camp;



    async net_asyncState(state: FSMStateType, time: number, hideNum: number, seekNum: number) {
        let str
        switch (state) {
            case FSMStateType.Paper:
                
                break;
            case FSMStateType.HideWait:
                this.partyStart = true;
                if (this.currentCamp != null) {
                    str = this.currentCamp == Camp.Hide ? "step11" : "step21";
                    if (this.currentCamp == Camp.Seek) {
                        GlobalData.canClickKaZhu =false
                    }
                    if (this.warnTrigger) {
                        this.warnTrigger.enabled = (false)
                    }
                   
                }
                break;
            case FSMStateType.Hide:
                this.partyStart = true;
                if (this.currentCamp != null) {
                    str = this.currentCamp == Camp.Hide ? "step12" : "step22";
                }
                break;
            case FSMStateType.SeekWait:
                this.partyStart = true;
                if (this.currentCamp != null) {
                    str = this.currentCamp == Camp.Hide ? "step13" : "step23";
                    if (this._warnTriggerEffect) {
                        this._warnTriggerEffect.loop = true;
                        this._warnTriggerEffect.play();
                    }
                    if (this.warnTrigger) {
                        this.warnTrigger.enabled = (true)
                    }
                    
                }
                break;
            case FSMStateType.Seek:
                clearTimeout(this._cakeTid);
                EffectService.stop(this.cakeEffectId);
                if (this.currentCamp == Camp.Seek) {
                    GlobalData.canClickKaZhu = true;
                }
                this.partyStart = true;
                if (this.currentCamp != null) {
                    str = this.currentCamp == Camp.Hide ? "step14" : "step24";
                    if (this.currentCamp == Camp.Seek) {
                        this.character.worldTransform.position = GameUtils.randomCirclePos(GlobalData.catchPos, 200, true)
                    }
                }
                break;
            default:
                break;
        }
        if (this._partySign) {
            this._hideSeekUI.setCamp(this.currentCamp)
            UIManager.showUI(this._hideSeekUI, mw.UILayerMiddle,state, time, hideNum, seekNum);
        }
    }



      /**接收阵营信息 */
      net_assignCamp(camp: Camp, seekPids: number[], hideNum: number) {
        let str = ""
        let pos = mw.Vector.zero;
        GlobalData.inParty = true;
        console.log("接收阵营信息", camp, seekPids)
        this.currentCamp = camp;
        switch (camp) {
            case Camp.Hide:
                str = GameUtils.getTxt("Text_Text_976")
                pos = GlobalData.hidePos;

                PlayerManager.instance.changeTitle( GameUtils.getTxt("Text_Text_978"),TitleType.mofa2);
                //GlobalModule.MyPlayerC.Head.changeTitle("躲藏者")
                break;
            case Camp.Seek:
                str = GameUtils.getTxt("Text_Text_977")
                pos = GlobalData.seekPos;
                this.spwanHideTrigger(seekPids);
                PlayerManager.instance.changeTitle( GameUtils.getTxt("Text_Text_979"),TitleType.mofa3);
                //GlobalModule.MyPlayerC.Head.changeTitle("追捕者", ContractType.Ring)
                break;
            default:
                break;
          }
        UIManager.hide(SignUI)
        Tips.show(str);
        ModuleService.getModule(BagModuleC).getPartyItem();
        this.seekPids = seekPids;
          this._hideSeekUI.onLoseNum(hideNum, seekPids.length);
          setTimeout(() => {
            this.character.worldTransform.position = GameUtils.randomCirclePos(pos, 200, true)
          }, 1000);
        
    }

    private seekPids: number[] = [];

    /**派对是否开启 */
    private partyStart: boolean = false;

    /**报名状态 */
    private _partySign: boolean = false;
    /**报名或者发起派对||点击查看派对 */
    public async partySign() {

        if (Player.getAllPlayers().length == 1) {
            Tips.show(GameUtils.getTxt("Text_Text_980"))
            return;
        }
        if (this.partyStart) {
            Tips.show(GameUtils.getTxt("Text_Text_981"))
            return;
        }
        if (this._partySign) {
            if (!this._isOwner) 
                UIManager.show(SignUI, this._isOwner, null, this._readyTime,0,true);
            return;
        } 
        this.server.net_playerSign(AccountService.getNickName()||"233Name");
    }

    public net_onChangeSignNum(num: number) { 
        UIManager.show(SignUI, this._isOwner, null, this._readyTime,num);
    }

    public net_partyFail() {
        this._partySign = false;
        this._isOwner = false;
        Tips.show(GameUtils.getTxt("Text_Text_1002"));
    }
   
    
    /**是否是派对发起者 */
    private _isOwner: boolean = false;

    /**接受派对开启信息 */
    public net_asyncPreparationTime(nickName:string,time:number,pid:number) {
        this._isOwner = pid == this.localPlayerId;
        this._partySign = this._isOwner;
        this._readyTime = time;
        UIManager.show(SignUI, this._isOwner, nickName, time,1,this._partySign);
    }


    public net_signSuccess(ownerNickName:string,readyTime:number) {
        this._partySign = true;
        UIManager.show(SignUI, this._isOwner, ownerNickName, readyTime,1,this._partySign);
    }



    public onAttack() {
        PlayerManagerExtesion.rpcPlayAnimation(this.character, Asset.catchAnim, 1, GlobalData.catchAnimSpeed)
        setTimeout(() => {
            let dir = this.character.worldTransform.getForwardVector().normalize();
            const hitResult = QueryUtil.capsuleOverlap(this.character.worldTransform.position.add(dir.multiply(100)), 80, 70, false)
            for (let index = 0; index < hitResult.length; index++) {
                const element = hitResult[index];
                if (PlayerManagerExtesion.isCharacter(element)) { 
                    if (!this.seekPids.includes(element?.player?.playerId)) { 
                        this.server.net_catchPlayer(element?.player?.playerId);
                        break;
                    }
                }
                
            }
        }, GlobalData.checkTime*1000);
      
    }










    private warnEffect: number = 0;

    private warnPlayerNum: number = 0;

    private warnTrigger: mw.Trigger;


     /**生成检测躲藏者的触发器，触发了会生成警报 */
     private async spwanHideTrigger(seekPids: number[]) {
        this.warnTrigger = SpawnManager.spawn<mw.Trigger>({ guid: "Trigger" })

        this.warnTrigger.parent = this.localPlayer.character;
        this.warnTrigger.localTransform.position = (mw.Vector.zero);
        this.warnTrigger.localTransform.rotation = (mw.Rotation.zero);
        this.warnTrigger.shape = mw.TriggerShapeType.Box;
        this.warnTrigger.worldTransform.scale = GlobalData.warnTriggerSize.clone();

        this.warnTrigger.onEnter.add((go: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(go)) {
                if (!seekPids.includes(go?.player?.playerId)) {
                    this.server.net_checkHidePlayer(go?.player?.playerId);
                }
            }
        })
        this.warnTrigger.enabled = (false)

        this.warnTrigger.onLeave.add((go: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(go)) {
                if (!seekPids.includes(go?.player?.playerId)) {
                    this.warnPlayerNum--;
                    if (this.warnPlayerNum <= 0) {
                        EffectService.stop(this.warnEffect);
                        this.warnEffect = 0;
                    }
                }
            }
        })
        await GameUtils.downAsset(Asset.warnRangeEffect)
        this._warnTriggerEffect = SpawnManager.spawn<mw.Effect>({ guid: Asset.warnRangeEffect })
        this._warnTriggerEffect.parent = this.localPlayer.character;
        this._warnTriggerEffect.localTransform.position = (GlobalData.warnRangePos.clone());
        this._warnTriggerEffect.localTransform.rotation = (mw.Rotation.zero);
        this._warnTriggerEffect.worldTransform.scale = GlobalData.warnRangeSize.clone();




    }

    net_checkHidePlayer() {
        Tips.show(GameUtils.getTxt("Text_Text_982"))
        this.warnPlayerNum++;
        if (!this.warnEffect)
            this.warnEffect = GeneralManager.rpcPlayEffectOnPlayer(Asset.warnEffect, this.localPlayer, mw.HumanoidSlotType.Head, 0, new mw.Vector(0, 0, 50))
    }

    net_changeLoseNum(loseNum: number, catchNum: number) {
       this._hideSeekUI.onLoseNum(loseNum, catchNum);
    }



    public net_Settle(nickName: string[], camp: Camp[], hideTime: number[], isCathced: boolean[], catchNum: number[], winCamp: Camp) {
        if (this._partySign) {
            if (winCamp == Camp.Hide) {
                Tips.show(GameUtils.getTxt("Text_Text_1011"))
            } else {
                Tips.show(GameUtils.getTxt("Text_Text_1012"))
                if (this.currentCamp == Camp.Hide) {
                    this._isWatch = true;
                }
            }
        }
       

        this.warnTrigger?.destroy()
        this.warnTrigger = null;
        this._warnTriggerEffect?.destroy();
        this._warnTriggerEffect = null;
        EffectService.stop(this.warnEffect);
        this.warnEffect = 0;
        this.warnPlayerNum = 0;

        let settleInfo: SettleInfo[] = [];
        for (let i = 0; i < nickName.length; i++) {
            if (!StringUtil.isEmpty(nickName[i])) {
                settleInfo.push({
                    nickName: nickName[i],
                    camp: camp[i],
                    hideTime: hideTime[i],
                    isCathced: isCathced[i],
                    catchNum: catchNum[i],
                })
            }
        }
        if (this._partySign) {
            setTimeout(() => {
                UIManager.show(Settle, settleInfo)
            }, 2000);
    
        }
       
        this.resetData();
        //SoundManager.playBGM(Asset.readyMusic);
       
       
    }

    private resetData() {
        this._isOwner = false;
        this._partySign = false;
        this.partyStart = false;
        this.seekPids.length = 0;
        this._inSpeedUp = false;
        GlobalData.inParty = false;
        GlobalData.canClickKaZhu = true;
        if (this.isWatch) {
            this._isWatch = false;
            ClothManager.instance.resetPlayerCloth();
            PlayerManager.instance.setPlayerVis(this.localPlayer,mw.PropertyStatus.On,true)
        }
        this.hideGuideLine();

        PlayerManager.instance.showAllTitle();
        PlayerManager.instance.resetTitle();
        PlayerManager.instance.setPlayerState(PlayerStateType.Busy,false)
        this._isWatch = false;
        clearTimeout(this._cakeTid);
        EffectService.stop(this.cakeEffectId);
        this._hideSeekUI.onGameOver();
        UIManager.hideUI(this._hideSeekUI);

  
        UIManager.show(BagHub)
        GlobalData.skillCD = 0;
        EffectService.stop(this.watchEffectID);
        this.character.maxWalkSpeed = 450;
        this.character.collisionWithOtherCharacterEnabled = true;
        this.currentCamp = null;
        this.character.movementEnabled = true;
        this.character.jumpEnabled = true;
    }


    private watchEffectID: number
    
    public get isWatch(): boolean{
        return this._isWatch;
    }

    private _isWatch: boolean = false;

    public async net_throwToWatch(clearBag: boolean) {
        this._isWatch = true;
        PlayerManager.instance.setPlayerState(PlayerStateType.Busy,true)
        this._hideSeekUI.onCatch();
        PlayerManager.instance.setPlayerVis(this.localPlayer,mw.PropertyStatus.Off,true)
        this.character.collisionWithOtherCharacterEnabled = false;
        this.character.maxWalkSpeed = this.character.maxWalkSpeed * GlobalData.speedUp;
        this.watchEffectID = GeneralManager.rpcPlayEffectOnGameObject(Asset.watchEffect, this.localPlayer.character, 0, new mw.Vector(10, 0, -90),new mw.Rotation(0,0,-90))
        if (clearBag) {
            UIManager.hide(BagHub)
        }
    }





    private _cakeTid: number


    private _inSpeedUp: boolean = false;
    private cakeEffectId:number
    

    public onEatCake() {
        
        if (this._inSpeedUp) {
            return;
        }
        this.cakeEffectId= GeneralManager.rpcPlayEffectOnPlayer(Asset.speedUpTrailEffect,this.localPlayer,mw.HumanoidSlotType.Buttocks,0)
        let speed = this.character.maxWalkSpeed;
        this.character.maxWalkSpeed = speed * GlobalData.speedUpAfterPick;
        this._inSpeedUp = true;
        this._cakeTid = setTimeout(() => {
            this._inSpeedUp = false;
            this.character.maxWalkSpeed = speed;
            EffectService.stop(this.cakeEffectId);
        }, GlobalData.speedUpTime*1000);
        
    }






    /**准备时间 */
    private _readyTime: number = 0;



    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if(this._readyTime > 0) {
            this._readyTime -= dt;
        }

    }


    //============================使用技能相关了==============================
     /**请求一条敌对阵营的引导线 */
     public async requreGuideLine() {
        this.server.net_requireGuideLine(this.currentCamp,this.localPlayerId);
    }

    private guideTid

    net_requreGuid(guid: string) {
        let time = GlobalData.guideTime;
        if (guid) {
            let character = GameObject.findGameObjectById(guid);
            if (character) {
                Tips.show(GameUtils.getTxt("Text_Text_983"))
                GuideHelper.getInstance.setGuideLinear(true, character);
                clearTimeout(this.guideTid);
                this.guideTid = setTimeout(() => {
                    this.hideGuideLine();
                }, time * 1000)
            }
        }
    }

        /**隐藏引导线 */
        private hideGuideLine() {
            GuideHelper.getInstance.setGuideLinear(false, null);
        }









    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}