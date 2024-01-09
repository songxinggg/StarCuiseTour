import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","CharLoc","VectorType","Max","lockRotation","Face"],["","","","","",""],[1,new mw.Vector(-4130,-2890,200),[2,200],[200,5],new mw.Vector(100,10,20),new mw.Vector(0,0,0),"舞蹈"],[2,new mw.Vector(-1712,4007,200),[1,200],[200,5],new mw.Vector(100,10,20),new mw.Vector(0,0,0),"音乐"]];
export interface ICameraElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**第一个人物位置*/
	CharLoc:mw.Vector
	/**增加的坐标种类|加多少*/
	VectorType:Array<number>
	/**排与排之间的距离|满多少人自动换下一排*/
	Max:Array<number>
	/**摄像机相对位置坐标*/
	lockRotation:mw.Vector
	/**人物旋转角度*/
	Face:mw.Vector
 } 
export class CameraConfig extends ConfigBase<ICameraElement>{
	constructor(){
		super(EXCELDATA);
	}

}