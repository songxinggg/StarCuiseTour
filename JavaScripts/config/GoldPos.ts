import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","pos","maxcount"],["","",""],[1,new mw.Vector(4421.00,1310.05,3500.00),10],[2,new mw.Vector(2256.00,1310.05,3500.00),0],[3,new mw.Vector(3136.00,-1289.95,3500.00),0],[4,new mw.Vector(3951.00,-1154.95,4200.00),0],[5,new mw.Vector(3951.00,1100.05,4200.00),0],[6,new mw.Vector(3951.00,590.05,4850.00),0],[7,new mw.Vector(4211.00,-489.95,4850.00),0],[8,new mw.Vector(2651.00,-489.95,4850.00),0],[9,new mw.Vector(-4354.00,-794.95,3450.00),0],[10,new mw.Vector(-7059.00,545.05,3450.00),0],[11,new mw.Vector(-7774.00,1515.05,3450.00),0],[12,new mw.Vector(-5724.00,-1514.95,3450.00),0],[13,new mw.Vector(-7839.00,-659.95,3450.00),0],[14,new mw.Vector(-7074.00,-359.95,3450.00),0],[15,new mw.Vector(-7329.00,2225.05,4550.00),0],[16,new mw.Vector(-5904.00,2125.05,4550.00),0],[17,new mw.Vector(-5904.00,2505.05,6250.00),0],[18,new mw.Vector(-5904.00,-2364.95,6250.00),0],[19,new mw.Vector(-7849.00,-2669.95,6250.00),0],[20,new mw.Vector(-4144.00,-3479.95,3550.00),0],[21,new mw.Vector(-3079.00,3620.05,3550.00),0]];
export interface IGoldPosElement extends IElementBase{
 	/**qid*/
	ID:number
	/**点位*/
	pos:mw.Vector
	/**最大刷新数量*/
	maxcount:number
 } 
export class GoldPosConfig extends ConfigBase<IGoldPosElement>{
	constructor(){
		super(EXCELDATA);
	}

}