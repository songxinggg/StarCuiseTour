import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","maxExp","materials","nextID","unlockSkill","skills","rank","prefab"],["","","","","","","",""],[301,0,null,0,null,[206101],0,null],[302,0,null,0,null,[203101],0,null],[303,0,null,0,null,[203102],0,null],[304,0,null,0,null,[203103],0,null],[305,0,null,0,null,[201121],0,null],[306,0,null,0,null,[201122],0,null],[307,0,null,0,null,[201123],0,null],[308,0,null,0,null,[203104],0,null],[309,0,null,0,null,[201124],0,null],[310,0,null,0,null,[201125],0,null],[311,0,null,0,null,[203105],0,null],[312,0,null,0,null,[203106],0,null],[313,0,null,0,null,[203107],0,null],[314,0,null,0,null,[311101],0,null],[140016,0,null,0,null,[800101],0,null],[150001,0,null,0,null,[900101],0,null],[150002,0,null,0,null,[900102],0,null],[150003,0,null,0,null,[900103],0,null],[150004,0,null,0,null,[900104],0,null],[150005,0,null,0,null,[900105],0,null],[150006,0,null,0,null,[900106],0,null],[150007,0,null,0,null,[900107],0,null],[150008,0,null,0,null,[900108],0,null],[150009,0,null,0,null,[900109],0,null],[150010,0,null,0,null,[900110],0,null],[150011,0,null,0,null,[900111],0,null],[150012,0,null,0,null,[900112],0,null],[150013,0,null,0,null,[900113],0,null],[150014,0,null,0,null,[900114],0,null],[150015,0,null,0,null,[900115],0,null],[150016,0,null,0,null,[900116],0,null],[150017,0,null,0,null,[900117],0,null],[150018,0,null,0,null,[900118],0,null],[150019,0,null,0,null,[900119],0,null],[150020,0,null,0,null,[900120],0,null],[150021,0,null,0,null,[900121],0,null],[150022,0,null,0,null,[900122],0,null],[150023,0,null,0,null,[900123],0,null],[150024,0,null,0,null,[900124],0,null],[150025,0,null,0,null,[900125],0,null],[150026,0,null,0,null,[900126],0,null],[150027,0,null,0,null,[900127],0,null],[150028,0,null,0,null,[900128],0,null],[150029,0,null,0,null,[900129],0,null],[150030,0,null,0,null,[900130],0,null],[150031,0,null,0,null,[900131],0,null],[150032,0,null,0,null,[900132],0,null],[150033,0,null,0,null,[900133],0,null],[150034,0,null,0,null,[900134],0,null]];
export interface IItemLevelupElement extends IElementBase{
 	/**道具等级ID*/
	id:number
	/**升级所需经验*/
	maxExp:number
	/**升级所需材料*/
	materials:Array<number>
	/**下一级道具ID*/
	nextID:number
	/**升级后解锁的技能*/
	unlockSkill:Array<number>
	/**当前拥有技能*/
	skills:Array<number>
	/**所需魔法师品阶*/
	rank:number
	/**展示预制体*/
	prefab:string
 } 
export class ItemLevelupConfig extends ConfigBase<IItemLevelupElement>{
	constructor(){
		super(EXCELDATA);
	}

}