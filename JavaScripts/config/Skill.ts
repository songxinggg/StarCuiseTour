import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","SkillName","Icon","Des","CanMove","IsSupport","AimType","ReleaseType","SkillConfig1"],["","","","","","","","",""],[2011,"魔法扫帚","96593",["Wand_skill_describe_09"],true,false,0,0,null],[2013,"飞行加速","96608",["Wand_skill_describe_10"],true,false,0,0,null],[2031,"滑板","96635",null,true,false,0,0,null],[2061,"滑翔","162668",null,true,false,0,0,null],[3011,"造物","106325",["Wand_skill_describe_12"],true,false,0,0,null],[3012,"方块","106325",["Wand_skill_describe_13"],true,false,0,0,null],[3021,"换装技能","164194",null,true,false,0,0,null],[3101,"自己变身技能","142768",["Prop_147","Prop_151"],true,false,0,0,null],[3102,"他人变身技能","142781",["Prop_148"],true,true,1,0,null],[3111,"水枪技能","174701",["Action_55"],true,true,1,0,null],[8001,"专属派对魔盒","129971",["PartySkill_1"],true,false,0,0,null],[9001,"变身模型技能","37788",null,true,false,0,0,null]];
export interface ISkillElement extends IElementBase{
 	/**技能ID*/
	ID:number
	/**技能名字*/
	SkillName:string
	/**技能图标*/
	Icon:string
	/**技能描述*/
	Des:Array<string>
	/**释放技能过程中是否可移动*/
	CanMove:boolean
	/**是否辅助瞄准*/
	IsSupport:boolean
	/**瞄准类型*/
	AimType:number
	/**释放类型*/
	ReleaseType:number
	/**技能参数1*/
	SkillConfig1:string
 } 
export class SkillConfig extends ConfigBase<ISkillElement>{
	constructor(){
		super(EXCELDATA);
	}

}