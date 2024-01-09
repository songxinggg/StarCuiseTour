import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
﻿import { SoundManager, EffectManager } from "../../ExtensionType";
import { Camp, EventsName, FSMStateType } from "../../const/GameEnum";
import { Asset, GlobalData } from "../../const/GlobalData";
import Tips from "../../ui/commonUI/Tips";
import { InteractModuleServer } from "../interactModule/InteractModuleServer";
import PlayerManager from "../player/managers/PlayerManager";
import { BattleActorBase, HideActor, SeekActor } from "./BattleActor";
import FSMManager from "./FSMManager";
import PartyModuleC from "./PartyModuleC";


enum PartyState { 
    None = 0,   //啥也不是
    Sign = 1,    //报名
    Party = 2,   //派对
}

export default class PartyModuleS extends ModuleS<PartyModuleC, null> {

    /**当前剩余准备时间 */
    private _curPreparationTime: number = 0;

    /**party阶段 */
    private partyState: PartyState = PartyState.None;

    /**玩家管理 */
    private _battleActorMap: Map<number, BattleActorBase> = new Map();

    /**报名的玩家 */
    private _signPlayers: mw.Player[] = [];


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        FSMManager.instance.update(dt);
        if (this._curPreparationTime > 0) {
            this._curPreparationTime -= dt;
            this._curPreparationTime = Math.max(0, this._curPreparationTime);
            if (this._curPreparationTime <= 0) {
                this.stratGame();
            }
        }

    }

    private ownerNickName: string;

    private ownerPlayer: mw.Player;

    public net_playerSign(nickName: string) {
        if (!this._signPlayers.includes(this.currentPlayer)) {
            this._signPlayers.push(this.currentPlayer);
            if (this._signPlayers.length == 1) {
                this.ownerNickName = nickName;
                this._curPreparationTime = GlobalData.signTime;
                this.ownerPlayer = this.currentPlayer;
                this.getAllClient().net_asyncPreparationTime(this.ownerNickName, this._curPreparationTime, this.currentPlayerId);
                this.partyState = PartyState.Sign;
            } else {
                this.getClient(this.currentPlayer).net_signSuccess(this.ownerNickName, this._curPreparationTime);
                this.getClient(this.ownerPlayer).net_onChangeSignNum(this._signPlayers.length);
            }

            
        }
    }




    private seekPlayers: mw.Player[] = [];

    /**开始游戏 */
    private stratGame() {
        this.seekPlayers.length = 0;
        SeekActor.seekNum = 0;
        HideActor.hideNum = 0;
        this.catchNum = 0;
        const playerNum = this._signPlayers.length;
        if (playerNum > 1) {

            let seekCount = 1;
            if (playerNum >= 3 && playerNum < 5) {
                seekCount = 2;
            } else if (playerNum >= 5 && playerNum < 7) {
                seekCount = 3;
            } else if (playerNum >= 7 && playerNum < 9) {
                seekCount = 4;
            } else if (playerNum >= 9 && playerNum < 11) {
                seekCount = 5;
            } else if (playerNum >= 11 && playerNum < 13) {
                seekCount = 6;
            } else if (playerNum >= 13 && playerNum < 15) {
                seekCount = 7;
            } else if (playerNum >= 15 && playerNum < 17) {
                seekCount = 8;
            } else if (playerNum >= 17 && playerNum < 19) {
                seekCount = 9;
            } else if (playerNum >= 19 && playerNum < 21) {
                seekCount = 10;
            } else if (playerNum >= 21 && playerNum < 23) {
                seekCount = 11;
            } else if (playerNum >= 23) {
                seekCount = 12;
            }
            for (let i = 0; i < seekCount; i++) {
                const player = this._signPlayers[MathUtil.randomInt(0, this._signPlayers.length)];
                if (this.seekPlayers.indexOf(player) != -1) {
                    i--;
                    continue;
                }
                this.seekPlayers.push(player);
            }

            for (let index = 0; index < this.seekPlayers.length; index++) {
                const player = this.seekPlayers[index];
                SeekActor.seekNum++;
                this.assignPlayer(player, Camp.Seek, SeekActor);
            }

            //其余人为躲藏者
            this._signPlayers.forEach(player => {
                if (this.seekPlayers.indexOf(player) == -1) {
                    HideActor.hideNum++;
                    this.assignPlayer(player, Camp.Hide, HideActor);
                }
            })
            FSMManager.instance.initData();
            this.partyState = PartyState.Party;
        } else {
            this._signPlayers.forEach((player) => {
                if (player) {
                    this.getClient(player).net_partyFail()
                }
            })
            this._signPlayers.length = 0;
        }

    }


    /**分配玩家阵营 以及抓人者的playerID*/
    private assignPlayer(player: mw.Player, camp: Camp, cls: TypeName<BattleActorBase>) {
        const battleActor = new cls(player.character, player.playerId);
        battleActor.init(camp);
        this._battleActorMap.set(player.playerId, battleActor);
        PlayerManager.playerInfoMap.get(player.playerId).titleDistance = 500;
        ModuleService.getModule(InteractModuleServer).unActiveInteract(player.playerId)
        this.getClient(player).net_assignCamp(camp, this.seekPlayers.map(player => player.playerId), HideActor.hideNum);
        //告诉这个玩家的阵营
    }


    /**抓到一个玩家 */
    public net_catchPlayer(catchPlayerId: number) {
        const battleActor = this._battleActorMap.get(catchPlayerId);
        if (battleActor) {
            const catchPlayer = this._battleActorMap.get(this.currentPlayerId);
            if (battleActor instanceof HideActor) {

                if (battleActor.hasCatch)
                    return;    //已经被抓了
                this.catchNum++;
                (catchPlayer as SeekActor).cathcPlayer();
                battleActor.beCatch();
                HideActor.hideNum--;
                SoundManager.playSound(Asset.catchMusic);
                GeneralManager.rpcPlayEffectAtLocation(Asset.catchEffect, battleActor.character.worldTransform.position, 1)
                let nickName = PlayerManager.playerInfoMap.get(catchPlayerId).myName;
                Tips.showToAllClient(nickName,"Text_Text_1010");

                //扔去观战....
                this.checkGameOver(battleActor);
            }
        }
    }


    /***躲藏者检测 */

    public net_checkHidePlayer(pid: number) {
        const battleActor = this._battleActorMap.get(pid);
        if (battleActor) {
            if (battleActor instanceof HideActor) {
                if (!battleActor.isHide && !battleActor.hasCatch) {
                    this.getClient(this.currentPlayer).net_checkHidePlayer();
                }
            }
        }
    }


    /**检查游戏是否结束了
   * @param actor 被抓的玩家或者退出游戏的玩家
   */
    private checkGameOver(actor: BattleActorBase) {
        let isOver: boolean = false;
        if (actor instanceof HideActor) {
            if (!actor.hasCatch) {
                HideActor.hideNum--;     //躲藏者退游了
            }
            console.log("躲藏者退游了", HideActor.hideNum)
            if (HideActor.hideNum <= 0) {
                isOver = true;
                this.gameOver(Camp.Seek);
            } else {
                this.throwToWatch(actor.qid, true);
            }
        } else {
            SeekActor.seekNum--;     //寻找者退游了
            this.seekPlayers.splice(this.seekPlayers.indexOf(Player.getPlayer(actor.qid)), 1);
            if (SeekActor.seekNum <= 0) {
                isOver = true;
                this.gameOver(Camp.Hide);
            }
        }
        if (!isOver) {
            this._signPlayers.forEach(player => { 
                this.getClient(player)?.net_changeLoseNum(HideActor.hideNum, SeekActor.seekNum)
            })
            
        }
    }


    /**状态切换 */
    public onStateChange(state: FSMStateType, time: number) {
        switch (state) {
            case FSMStateType.HideWait:
                break;
            case FSMStateType.Hide:
                for (const battleActor of this._battleActorMap.values()) {
                    battleActor.stratHide();
                }
                break;
            case FSMStateType.SeekWait:
                break;
            case FSMStateType.Seek:
                for (const battleActor of this._battleActorMap.values()) {
                    battleActor.stratSeek();
                }
                break;
            default:
                break;
        }
        this.getAllClient().net_asyncState(state, time, HideActor.hideNum, SeekActor.seekNum);
        
    }


    //==============================游戏结束==============================

    private catchNum: number = 0;
    public gameOver(winCamp: Camp) {
        FSMManager.instance.stopState();
        this.partyState = PartyState.None;
        this.settle(false, winCamp); //this.gameCount >= GlobalData.gameCount&&GlobalData.maxGameTime>=TimeUtil.elapsedTime()
    }


    /**这局过后是否要返回学校了 */
    private settle(goBack: boolean, winCamp: Camp) {
        let nickName: string[] = [];
        let camp: Camp[] = [];
        let hideTime: number[] = [];
        let isCathced: boolean[] = [];
        let catchNum: number[] = [];          //md好烦不让传复杂类型,全是结算信息

        for (let [pid, battleActor] of this._battleActorMap) {

            if (!Player.getPlayer(pid)||!PlayerManager.playerInfoMap.get(pid))
                continue;
            PlayerManager.playerInfoMap.get(pid).titleDistance = 2000;
            nickName.push(PlayerManager.playerInfoMap.get(pid).myName);
            camp.push(battleActor.camp);
            if (battleActor instanceof HideActor) {

                battleActor.onGameOver();
                hideTime.push(battleActor.lifeTime);
                isCathced.push(battleActor.hasCatch);
                catchNum.push(0);
            } else if (battleActor instanceof SeekActor) {

                hideTime.push(0);
                isCathced.push(false);
                catchNum.push(battleActor.catchNum);
            }
            battleActor.destroy();
            battleActor = null;
        }
        this._battleActorMap.clear();
        console.log("结算", nickName, camp, hideTime, isCathced, catchNum)
        this.getAllClient().net_Settle(nickName, camp, hideTime, isCathced, catchNum, winCamp);
        this._signPlayers.length = 0;
        

    }


    /**玩家被扔去观战了 */
    private throwToWatch(playerId: number, clearBag: boolean = false) {
        let player = Player.getPlayer(playerId);
        if (player) {
            this.getClient(player).net_throwToWatch(clearBag);
        }
    }


    protected onPlayerEnterGame(player: mw.Player): void {
        if (this.partyState != PartyState.None) {
            let state = FSMManager.instance.getCurrentState();
            let time = this._curPreparationTime
            this.getClient(player).net_asyncState(state, time, 0, 0);
        }    

    }


    protected onPlayerLeft(player: mw.Player): void {

        try {
            if(this._signPlayers.includes(player)){
                this._signPlayers.splice(this._signPlayers.indexOf(player),1);
            }
            const battleActor = this._battleActorMap.get(player.playerId);
            if (battleActor) {
                if (battleActor instanceof SeekActor) { 
                    battleActor.destroy();
                }
                battleActor.onPlayerLeft();
                this.checkGameOver(battleActor);
            }

          
        } catch {
            console.log("玩家离开游戏异常......")
        }


    }



    /**请求获得一个敌对阵营的guid */
    public net_requireGuideLine(currentCamp: Camp,playerId:number) {
            let guid
            let hidePlayer
            while (!hidePlayer) {
                let player = this._signPlayers[MathUtil.randomInt(0, this._signPlayers.length)];
                if (this.seekPlayers.indexOf(player) == -1 && !(this._battleActorMap.get(player.playerId) as HideActor).hasCatch) {
                    hidePlayer = player;
                    guid = hidePlayer.character.guid;
                    break;
                }
            }
        if (guid) {
            this.getClient(playerId).net_requreGuid(guid)
        }
        
    }












}