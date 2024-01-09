import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","doorPos","doorRot","transformPos","color"],["","","","",""],[1,new mw.Vector(-134.16,2330.76,346.88),new mw.Vector(0,0,90),new mw.Vector(2168.93,3134.64,331.11),"#FDFFF1"],[2,new mw.Vector(1695.84,3100.76,346.88),new mw.Vector(0,0,90),new mw.Vector(-881.07,2404.64,331.11),"#FDFFF1"],[3,new mw.Vector(293.93,-920.36,341.11),new mw.Vector(0,0,0),new mw.Vector(808.93,834.64,341.11),"#FDFFF1"],[4,new mw.Vector(878.93,284.64,341.11),new mw.Vector(0,0,0),new mw.Vector(308.93,-1515.36,341.11),"#FDFFF1"],[5,new mw.Vector(-2291.07,-1445.36,341.11),new mw.Vector(0,0,0),new mw.Vector(-2561.07,3009.64,341.11),"#FDFFF1"],[6,new mw.Vector(-2561.07,2594.64,341.11),new mw.Vector(0,0,0),new mw.Vector(-2291.07,-1855.36,341.11),"#FDFFF1"],[7,new mw.Vector(-2561.07,4844.64,31.11),new mw.Vector(0,0,0),new mw.Vector(3868.93,-3355.36,31.11),"#FDFFF1"],[8,new mw.Vector(3868.93,-2965.36,31.11),new mw.Vector(0,0,0),new mw.Vector(-2321.07,5219.64,31.11),"#FDFFF1"],[9,new mw.Vector(4453.93,5344.64,341.11),new mw.Vector(0,0,0),new mw.Vector(4038.93,-760.36,341.11),"#FDFFF1"],[10,new mw.Vector(4458.93,-760.36,341.11),new mw.Vector(0,0,90),new mw.Vector(4643.93,5594.64,341.11),"#FDFFF1"]];
export interface ITransformDoorElement extends IElementBase{
 	/**qid*/
	id:number
	/**生成的门位置*/
	doorPos:mw.Vector
	/**生成的门的旋转*/
	doorRot:mw.Vector
	/**碰到传送门后传送的点位（注意不要碰到另一个传送门了会卡死）*/
	transformPos:mw.Vector
	/**传送门颜色*/
	color:string
 } 
export class TransformDoorConfig extends ConfigBase<ITransformDoorElement>{
	constructor(){
		super(EXCELDATA);
	}

}