import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","parallelHandles","nextGuideId"],["","",""],[1,[1],2],[2,[2],3],[3,[3],4],[4,[4],5],[5,[5],0]];
export interface IGuideElement extends IElementBase{
 	/**id*/
	id:number
	/**并行引导操作数组*/
	parallelHandles:Array<number>
	/**下一个引导id*/
	nextGuideId:number
 } 
export class GuideConfig extends ConfigBase<IGuideElement>{
	constructor(){
		super(EXCELDATA);
	}

}