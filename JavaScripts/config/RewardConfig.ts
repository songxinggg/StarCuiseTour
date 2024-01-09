import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","itemIDs","itemNums","clothIDs","gold","moon","system"],["","","","","","",""],[1,[11201,13401,14101],[1,1,1],[3002],200,100,null],[2,[11301,12601,12901],[1,1,1],[3003],400,200,null],[3,[11401,12801,13001],[1,1,1],[3004],600,300,null],[4,null,null,[3005],1000,400,null]];
export interface IRewardConfigElement extends IElementBase{
 	/**id*/
	ID:number
	/**道具ID*/
	itemIDs:Array<number>
	/**道具数量*/
	itemNums:Array<number>
	/**服装ID*/
	clothIDs:Array<number>
	/**金币数量*/
	gold:number
	/**月亮币*/
	moon:number
	/**解锁系统*/
	system:Array<number>
 } 
export class RewardConfigConfig extends ConfigBase<IRewardConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}