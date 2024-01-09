import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","handleType","dialogText","pos","targetLocation","lockRotation","camLen","AppearUI","NodePath","UIDiag"],["","","Language","","","","","","","Language"],[1,1,"New_01",null,null,null,0,null,null,null,"显示对话框"],[2,5,null,null,null,null,0,"SkillUI","guideBtn","Text_Text_274","引导点击派对魔盒"],[3,1,"New_02",null,null,null,0,null,null,null,"显示对话框"],[4,4,null,new mw.Vector(-3455.0,20,3480),null,null,0,null,null,null,"引导去NPC"],[5,1,"New_03",null,null,null,0,null,null,null,"显示对话框"]];
export interface IGuideHandleElement extends IElementBase{
 	/**id*/
	id:number
	/**操作类型*/
	handleType:number
	/**对话内容文本*/
	dialogText:string
	/**引导点*/
	pos:mw.Vector
	/**目标点绑定对象*/
	targetLocation:mw.Vector
	/**锁定目标时的方向*/
	lockRotation:mw.Vector
	/**相机弹簧臂长度*/
	camLen:number
	/**出现界面*/
	AppearUI:string
	/**节点路径*/
	NodePath:string
	/**UI提示语*/
	UIDiag:string
 } 
export class GuideHandleConfig extends ConfigBase<IGuideHandleElement>{
	constructor(){
		super(EXCELDATA);
	}

}