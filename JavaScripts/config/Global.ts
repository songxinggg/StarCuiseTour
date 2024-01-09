import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Describe","Value","Value2","Value3","Value4","Judge","Value5","Text"],["","","","","","","","","Language"],[9,"背景全局bgm",0.8,null,"13937",null,null,null,null],[12,"第一人称偏移",0,null,null,null,null,new mw.Vector(100,0,100),null],[13,"第一人称玩家移动速度",100,null,null,null,null,null,null],[14,"第一人称远近范围",0,[-20,-200],null,null,null,null,null],[15,"第一人称左右倾斜角度范围",0,[-5,5],null,null,null,null,null],[16,"第一人称默认远近位置",-80,null,null,null,null,null,null],[17,"第一人称默认相机偏移",0,null,null,null,null,null,null],[18,"三脚架默认相机偏移",0,null,null,null,null,null,null],[19,"三脚架远近范围",0,[200,400],null,null,null,null,null],[20,"三脚架左右倾斜角度范围",0,[-60,60],null,null,null,null,null],[21,"三脚架上下范围",0,[-200,200],null,null,null,null,null],[22,"三脚架左右范围",0,[-200,200],null,null,null,null,null],[23,"三脚架默认远近位置",300,null,null,null,null,null,null],[24,"三脚架上下左右移动速度",20,null,null,null,null,null,null],[25,"第三人称远近范围",0,[200,600],null,null,null,null,null],[26,"第三人称默认相机偏移",0,null,null,null,null,null,null],[27,"第三人称默认远近位置",300,null,null,null,null,null,null],[28,"日程切换一次显隐的时间间隔",0.25,null,null,null,null,null,null],[31,"道具第一人称视角摄像机",1,null,null,null,null,null,null],[32,"道具三脚架视角摄像机",2,null,null,null,null,null,null],[33,"相机滤镜和天气按钮选中态切换的颜色",0,null,"00FDCDFF",null,null,null,null],[59,"所有3dui的对象id",0,null,null,null,null,null,null]];
export interface IGlobalElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**描述*/
	Describe:string
	/**数值*/
	Value:number
	/**数值*/
	Value2:Array<number>
	/**数值*/
	Value3:string
	/**数值*/
	Value4:Array<string>
	/**判断*/
	Judge:boolean
	/**向量*/
	Value5:mw.Vector
	/**多语言*/
	Text:string
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}

}