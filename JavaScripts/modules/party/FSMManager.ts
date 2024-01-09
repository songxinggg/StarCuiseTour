

import { FSMStateType, IFSMState, Camp } from "../../const/GameEnum";
import { HideWaitState, HideState, SeekWaitState, SeekState } from "./FSMState";
import PartyModuleS from "./PartyModuleS";



export default class FSMManager  {

    private static _instance: FSMManager;
    /**是否初始化 */
    private isInit:boolean = false;

    public static get instance(): FSMManager { 
        if (this._instance == null) {
            this._instance = new FSMManager();
            this._instance.init();
        }
        return this._instance;
    }

    public fsmList: Map<FSMStateType, IFSMState>
    
    private _currentState: FSMStateType = FSMStateType.Paper;


    //-------------时间相关------------------

    /**当前时间 */
    private _curTime: number = 0;

    /**状态结束时间 */
	private _endTime: number = 0;

    



    //------------初始化-------------------
    
    private init() { 
        this.fsmList = new Map([[FSMStateType.HideWait, new HideWaitState()],
            [FSMStateType.Hide, new HideState()],
            [FSMStateType.SeekWait, new SeekWaitState()],
            [FSMStateType.Seek, new SeekState()]]);
    }
    /**数据初始化,游戏开始了 */
    public initData() {
        this._currentState = FSMStateType.HideWait;
        this._curTime = 0;
        this.fsmList.get(this._currentState).onEnter();
        this._endTime = this.fsmList.get(this._currentState).endTime;
        ModuleService.getModule(PartyModuleS).onStateChange(this._currentState,this._endTime);
        this.isInit = true;
    }
    /**结束状态机的调用 */
    public stopState() {
        this.isInit = false;
        this._curTime = 0;
        this._currentState = FSMStateType.Paper;
    }


    //----------状态机逻辑--------------------
    private endState() {
        console.log("__endFSM___",this._currentState);
        this.fsmList.get(this._currentState).onExit();
        this.startState();
    }


    private startState() { 
        this._currentState++;
        if (this._currentState > FSMStateType.Seek) {
            ModuleService.getModule(PartyModuleS).gameOver(Camp.Hide)
            //一切都结束了
            return;
        }
        console.log("__startFSM___", this._currentState);
        this.fsmList.get(this._currentState).onEnter();
        this._curTime = 0;
        this._endTime = this.fsmList.get(this._currentState).endTime;
        ModuleService.getModule(PartyModuleS).onStateChange(this._currentState,this._endTime);
    }
    /**提前结束状态 */
    public earlyEnd() {
        this._endTime = this._curTime;
    }

    public getcurrentTime() {
        return this._curTime;
    }
    /**还需多少秒到下一阶段 */
    public getLoseTime() {
        return this._endTime - this._curTime;
    }

    public getCurrentState(): FSMStateType {
        return this._currentState;
    }


    public update(dt:number) { 
        if (!this.isInit) return;
        this._curTime += dt;
        if (this._curTime >= this._endTime) { 
            this.endState();
        }
    }







}