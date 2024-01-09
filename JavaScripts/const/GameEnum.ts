import { FactionType } from "../modules/bag/BagDataHelper"

// 轴类型
export enum Axis {
	X = 0,
	Y,
	Z,
}

//运行状态
export enum RunState {
	Client = 0,
	Server,
}


export enum EventsName {
    /**使用造物技能 */
    CreationSkills = "CreationSkills",
    /**加载道具 */
    LoadProp = "LoadProp",
    /**卸载道具 */
    UnloadProp = "UnloadProp",
    /**使用技能 */
    UseSkill = "UseSkill",
    /**开始舞会 */
    StartParty = "StartParty",
    /**取消玩家交互 */
    CancelActive = "CancelActive",
    /**埋点事件 */
    NetMsg_MGSMsg_Send = "NET_MSG_SEND_MGS",
    /**玩家设置状态 */
    PLAYER_STATE = "PLAYER_STATE",
    /** 刷新GetItem的描述 */
    REFRESH_GETITEM = "REFRESH_GETITEM",
    EatTreasure = "EatTreasure"
}
/**
 * 角色状态
 */
export enum PlayerStateType {
	/**正常 */
	None = 1,
	/**和交互物交互 */
	Interaction,
	/**双人动作 */
	DoublePeopleAction,
	/**正在使用技能 */
	isUsingSkill,
	/**繁忙中 */
	Busy,
	/**死亡状态 */
	Dead
}


export enum HudGameUIState {
	Show = 0,
	BaseHide,
	CanUseSkill,
	CanUseBag,
	CanMove,
	TrialLevel,
	HideAll,
}

export enum TrrigerType {
	None = "0",
	Distance = "1",
	BoxTrigger = "2",
	SphereTrigger = "3",
}

export enum SkillState {
	CD = -20,
	Disable = -2,
	Hide = -1,
	Enable = 0,
	State1 = 1,
	State2 = 2,
	Creation = 15,
	Relation = 16,
	Designation = 17,
	Using = 20,
	/**持续性技能 */
	Sustainability = 21,

} 


export enum TitleType {
    /**无契约 */
    None = "None",
    /**魔法勇士 */
    Brave = "Brave",
    /**契约之戒 */
    Ring = "Ring",
    mofa1 = "mofa1",
    mofa2 = "mofa2",
    mofa3 = "mofa3",
    mofa4 = "mofa4",
    mofa5 = "mofa5",
}

export interface IFSMState{
    endTime: number;
    
    onEnter(): void;

    onExit(): void;
}


export enum FSMStateType { 
    Paper = 0,
    HideWait = 1,

    Hide = 2,

    SeekWait = 3,

    Seek = 4,
}


export enum Camp{
    Hide=1,

    Seek=2,
}


export type SettleInfo = {
    nickName: string,

    camp: Camp,

    hideTime: number,

    isCathced: boolean,

    catchNum: number,
}
