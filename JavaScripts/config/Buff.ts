import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","buffName","description","icon","overlayType","lifecycleType","duration","triggerCount","triggerInterval","param1","param2"],["","","","","","","","","","",""],[1,"ReduceAttr","持续更改某个属性",11111,1,1,0,0,1,0,0]];
export interface IBuffElement extends IElementBase{
 	/**id*/
	id:number
	/**名称*/
	buffName:string
	/**buff描述*/
	description:string
	/**图标*/
	icon:number
	/**buff的叠加方式*/
	overlayType:number
	/**buff的生命周期类型*/
	lifecycleType:number
	/**持续时间(单位s)*/
	duration:number
	/**触发次数*/
	triggerCount:number
	/**触发间隔(单位s)*/
	triggerInterval:number
	/**参数1*/
	param1:number
	/**参数2*/
	param2:number
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}