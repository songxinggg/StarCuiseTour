import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","pos","maxcount"],["","",""],[1,new mw.Vector(-1797.54,-646.99,3400.00),10],[2,new mw.Vector(-1797.54,768.01,3400.00),0],[3,new mw.Vector(-147.54,-646.99,3400.00),0],[4,new mw.Vector(-147.54,658.01,3400.00),0],[5,new mw.Vector(707.46,18.01,3400.00),0],[6,new mw.Vector(2612.46,13.01,3400.00),0],[7,new mw.Vector(3742.46,-911.99,3400.00),0],[8,new mw.Vector(3742.46,908.01,3400.00),0],[9,new mw.Vector(4887.46,-1.99,3400.00),0],[10,new mw.Vector(3322.46,623.01,4200.00),0],[11,new mw.Vector(3322.46,-531.99,4200.00),0],[12,new mw.Vector(372.46,-531.99,4200.00),0],[13,new mw.Vector(372.46,588.01,4200.00),0],[14,new mw.Vector(-907.54,3.01,4200.00),0],[15,new mw.Vector(1117.46,3.01,5100.00),0],[16,new mw.Vector(3652.46,-1156.99,5100.00),0],[17,new mw.Vector(3652.46,1133.01,5100.00),0],[18,new mw.Vector(5267.46,28.01,5100.00),0],[19,new mw.Vector(-3455.56,-1761.79,4600.00),0],[20,new mw.Vector(-3455.56,1728.21,4600.00),0],[21,new mw.Vector(-6085.56,103.21,4600.00),0],[22,new mw.Vector(-8690.56,103.21,4600.00),0],[23,new mw.Vector(-5840.56,103.21,6300.00),0],[24,new mw.Vector(-5840.56,103.21,6300.00),0],[25,new mw.Vector(-3480.56,-2411.79,3400.00),0],[26,new mw.Vector(-3480.56,2323.21,3400.00),0]];
export interface ICakePosElement extends IElementBase{
 	/**qid*/
	ID:number
	/**点位*/
	pos:mw.Vector
	/**最大刷新数量*/
	maxcount:number
 } 
export class CakePosConfig extends ConfigBase<ICakePosElement>{
	constructor(){
		super(EXCELDATA);
	}

}