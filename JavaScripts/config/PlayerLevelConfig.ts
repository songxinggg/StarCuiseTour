import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","title","titleType","maxExp","maxBadge","rewardID","hat","trail","maxHp","maxMp","hpRecover","mpRecover","def","atc","crit"],["","","","","","","","","","","","","","",""],[1,"新手魔法师",5,120,3,0,3001,5,100,100,0,5,0,0,0],[2,"初级魔法师",6,240,3,1,3002,6,200,200,0,10,0,0,0],[3,"中级魔法师",7,540,3,2,3003,7,300,300,0,15,0,0,0],[4,"高级魔法师",8,1200,3,3,3004,8,400,400,0,20,0,0,0],[5,"大魔法师",9,2400,0,4,3005,9,500,500,0,25,0,0,0]];
export interface IPlayerLevelConfigElement extends IElementBase{
 	/**Level*/
	id:number
	/**称号*/
	title:string
	/**称号样式*/
	titleType:number
	/**升下一级需要的经验*/
	maxExp:number
	/**升下一级需要徽章数*/
	maxBadge:number
	/**升级奖励ID*/
	rewardID:number
	/**魔法师帽ID*/
	hat:number
	/**试炼点数上限*/
	trail:number
	/**该等级满血*/
	maxHp:number
	/**该等级满蓝*/
	maxMp:number
	/**回血速度*/
	hpRecover:number
	/**回蓝速度*/
	mpRecover:number
	/**该等级防御力*/
	def:number
	/**该等级攻击力*/
	atc:number
	/**该等级暴击率*/
	crit:number
 } 
export class PlayerLevelConfigConfig extends ConfigBase<IPlayerLevelConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}