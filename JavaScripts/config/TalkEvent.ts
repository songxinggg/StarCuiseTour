import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Des1","Name","ICON","ICON2","TEXT","OverRewardText","OverTaskText","EffGuid","Pos","soundGuid","Scale","ActionGuid","Actiontime","stopTime","state","canvasSize","params"],["","","Language","","","","","","","","","","","","","","",""],[1,"跟校长对话","Text_Text_327","106328","106332",1,0,null,null,null,null,0,null,0,2,1,[520,100],0],[2,"平时上课要怎么去","Text_Text_329","106328","106332",2,0,null,null,null,null,0,null,0,2,1,[520,100],0],[3,"我能成为校长吗","Text_Text_331","106328","106332",3,0,null,null,null,null,0,null,0,2,1,[520,100],0],[4,"我是才来的新生，有什么礼物吗","Text_Text_333","106328","106332",4,7,null,null,null,null,0,null,0,2,1,[520,100],0],[5,"不用了 谢谢","Text_Text_337","106328","106332",6,0,null,null,null,null,0,null,0,2,1,[520,100],0],[6,"我还想问其他的","Text_Text_340","106328","106332",8,0,null,null,null,null,0,null,0,2,1,[520,100],0],[7,"跟校警对话","Text_Text_341","106328","106332",9,0,null,null,null,null,0,null,0,2,1,[520,100],0],[8,"最近有发生什么事情吗","Text_Text_343","106328","106332",10,0,null,null,null,null,0,null,0,2,1,[520,100],0],[9,"我听说校警大叔你有传奇故事","Text_Text_344","106328","106332",11,0,null,null,null,null,0,null,0,2,1,[520,100],0],[10,"好的，您先忙","Text_Text_346","106328","106332",12,0,null,null,null,null,0,null,0,2,1,[520,100],0],[11,"好的会注意的","Text_Text_352","106328","106332",15,0,null,null,null,null,0,"14748",1,2,1,[520,100],0],[12,"好的会加油的","Text_Text_353","106328","106332",15,0,null,null,null,null,0,null,0,2,1,[520,100],0],[13,"跟奇怪的人对话","Text_Text_354","106328","106332",16,0,null,null,null,null,0,null,0,2,1,[520,100],0],[14,"抱歉是我不知道","Text_Text_356","106328","106332",17,0,null,null,null,null,0,"14530",1,2,1,[520,100],0],[15,"哦对不起，不过你管不着我","Text_Text_357","106328","106332",18,0,null,null,null,null,0,"29773",1,2,1,[520,100],0],[16,"说说看","Text_Text_360","106328","106332",19,0,null,null,null,null,0,null,0,2,1,[520,100],0],[17,"对不起不感兴趣","Text_Text_361","106328","106332",24,0,null,null,null,null,0,null,0,2,1,[520,100],0],[18,"就打听这么多","Text_Text_366","106328","106332",24,0,null,null,null,null,0,null,0,2,1,[520,100],0],[19,"真有趣，等你下次跟我说","Text_Text_368","106328","106332",24,0,null,null,null,null,0,null,0,2,1,[520,100],0],[20,"跟看书的人对话","Text_Text_378","106328","106332",25,0,null,null,null,null,0,null,0,2,1,[520,100],0],[21,"你在做什么","Text_Text_79","106328","106332",26,0,null,null,null,null,0,null,0,2,1,[520,100],0],[22,"请告知我书名","Text_Text_80","106328","106332",27,0,null,null,null,null,0,null,0,2,1,[520,100],0],[23,"跟厨师对话","Text_Text_380","106328","106332",28,0,null,null,null,null,0,null,0,2,1,[520,100],0],[24,"请给我一份午餐","Text_Text_82","106328","106332",29,0,null,null,null,null,0,null,0,2,1,[520,100],0],[25,"我想要特别的食物","Text_Text_83","106328","106332",30,0,null,null,null,null,0,null,0,2,1,[520,100],0],[26,"（继续说）","Text_Text_382","106328","106332",13,0,null,null,null,null,0,null,0,2,1,[520,100],0],[27,"奇怪的知识增加了","Text_Text_383","106328","106332",20,0,null,null,null,null,0,null,0,2,1,[520,100],0],[28,"奇怪的知识又增加了","Text_Text_384","106328","106332",21,0,null,null,null,null,0,null,0,2,1,[520,100],0],[29,"奇怪的知识继续增加了","Text_Text_385","106328","106332",22,0,null,null,null,null,0,null,0,2,1,[520,100],0],[30,"奇怪的知识越来越多了","Text_Text_386","106328","106332",23,0,null,null,null,null,0,null,0,2,1,[520,100],0],[31,"跟校霸对话","Text_Text_390","106328","106332",31,0,null,null,null,null,0,null,0,2,1,[520,100],0],[32,"你好你好，很高兴认识你们","Text_Text_110","106328","106332",32,0,null,null,null,null,0,null,0,2,1,[520,100],0],[33,"作为同学你们都不欢迎我？","Text_Text_394","106328","106332",34,0,null,null,null,null,0,null,0,2,1,[520,100],0],[34,"(…)","Text_Text_396","106328","106332",35,0,null,null,null,null,0,null,0,2,1,[520,100],0],[35,"你说的不会是我？","Text_Text_399","106328","106332",37,0,null,null,null,null,0,null,0,2,1,[520,100],0],[36,"为什么？","Text_Text_401","106328","106332",38,0,null,null,null,null,0,null,0,2,1,[520,100],0],[37,"与运动少年对话","Text_Text_417","106328","106332",39,0,null,null,null,null,0,null,0,2,1,[520,100],0],[38,"其实，我也喜欢打爆坏人的头","Text_Text_419","106328","106332",40,0,null,null,null,null,0,null,0,2,1,[520,100],0],[39,"当然，打球吗？","Text_Text_420","106328","106332",41,0,null,null,null,null,0,null,0,2,1,[520,100],0],[40,"跟体育老师对话","Text_Text_424","106328","106332",43,0,null,null,null,null,0,null,0,2,1,[520,100],0],[41,"准时运动，嘿Sir","Text_Text_426","106328","106332",44,0,null,null,null,null,0,null,0,2,1,[520,100],0],[42,"我才吃饱了不适合运动","Text_Text_427","106328","106332",45,0,null,null,null,null,0,null,0,2,1,[520,100],0],[43,"跟嘻哈少年对话","Text_Text_431","106328","106332",46,0,null,null,null,null,0,null,0,2,1,[520,100],0],[44,"我想跟你一起玩嘻哈","Text_Text_433","106328","106332",47,0,null,null,null,null,0,null,0,2,1,[520,100],0],[45,"听说你从来不去参加派对","Text_Text_434","106328","106332",48,0,null,null,null,null,0,null,0,2,1,[520,100],0],[46,"没什么，我也是来练舞蹈的","Text_Text_435","106328","106332",51,0,null,null,null,null,0,null,0,2,1,[520,100],0],[47,"那我们舞会时候见","Text_Text_437","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[48,"为什么，你们有什么过节？","Text_Text_439","106328","106332",49,0,null,null,null,null,0,null,0,2,1,[520,100],0],[49,"你可以跟他合作","Text_Text_441","106328","106332",50,0,null,null,null,null,0,null,0,2,1,[520,100],0],[50,"那你加油！","Text_Text_443","106328","106332",0,0,null,null,null,null,0,"88544",0,2,1,[520,100],0],[51,"跟书呆子学霸对话","Text_Text_445","106328","106332",52,0,null,null,null,null,0,null,0,2,1,[520,100],0],[52,"你喜欢看什么书？","Text_Text_447","106328","106332",53,0,null,null,null,null,0,null,0,2,1,[520,100],0],[53,"你成绩怎么样？","Text_Text_448","106328","106332",54,0,null,null,null,null,0,null,0,2,1,[520,100],0],[54,"外面很热闹，怎么不出去看看？","Text_Text_449","106328","106332",55,0,null,null,null,null,0,null,0,2,1,[520,100],0],[55,"好啊好啊，不过我最近在看《校园十大神秘事件》，这本书很好看","Text_Text_453","106328","106332",56,0,null,null,null,null,0,null,0,2,1,[520,100],0],[56,"不是很感兴趣","Text_Text_454","106328","106332",57,0,null,null,null,null,0,null,0,2,1,[520,100],0],[57,"太厉害了，你能帮助我学习吗？","Text_Text_456","106328","106332",57,0,null,null,null,null,0,null,0,2,1,[520,100],0],[58,"那你怎么不去参加？","Text_Text_458","106328","106332",58,0,null,null,null,null,0,null,0,2,1,[520,100],0],[59,"那好吧，谢谢，我先去找我的朋友了","Text_Text_460","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[60,"那我能成为你的朋友吗？","Text_Text_461","106328","106332",59,0,null,null,null,null,0,null,0,2,1,[520,100],0],[61,"跟教师对话","Text_Text_463","106328","106332",60,0,null,null,null,null,0,null,0,2,1,[520,100],0],[62,"好的","Text_Text_465","106328","106332",61,0,null,null,null,null,0,null,0,2,1,[520,100],0],[63,"我能在教室打架吗？","Text_Text_466","106328","106332",62,0,null,null,null,null,0,null,0,2,1,[520,100],0],[64,"跟教学楼附近的学生对话","Text_Text_470","106328","106332",63,0,null,null,null,null,0,null,0,2,1,[520,100],0],[65,"真的吗？那我快去看看","Text_Text_472","106328","106332",64,0,null,null,null,null,0,null,0,2,1,[520,100],0],[66,"表白墙在哪啊？","Text_Text_473","106328","106332",65,0,null,null,null,null,0,null,0,2,1,[520,100],0],[67,"跟树屋营地的学生对话","Text_Text_476","106328","106332",66,0,null,null,null,null,0,null,0,2,1,[520,100],0],[68,"（那我去试试看）","Text_Text_478","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[69,"跟游泳教练对话","Text_Text_495","106328","106332",67,0,null,null,null,null,0,null,0,2,1,[520,100],0],[70,"你好帅啊","Text_Text_497","106328","106332",68,0,null,null,null,null,0,null,0,2,1,[520,100],0],[71,"你能教我游泳吗？","Text_Text_498","106328","106332",69,0,null,null,null,null,0,null,0,2,1,[520,100],0],[72,"你怎么跟体育老师长得好像？","Text_Text_499","106328","106332",70,0,null,null,null,null,0,null,0,2,1,[520,100],0],[73,"游泳拉伤了怎么办？","Text_Text_500","106328","106332",71,0,null,null,null,null,0,null,0,2,1,[520,100],0],[74,"跟魔法师对话","Text_Text_505","106328","106332",72,0,null,null,null,null,0,null,0,2,1,[520,100],0],[75,"你从哪里来？","Text_Text_507","106328","106332",73,0,null,null,null,null,0,null,0,2,1,[520,100],0],[76,"需要帮助吗？","Text_Text_508","106328","106332",74,0,null,null,null,null,0,null,0,2,1,[520,100],0],[77,"我来兑换物品","Text_Text_514","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[78,"不，我很忙！","Text_Text_512","106328","106332",75,0,null,null,null,null,0,null,0,2,1,[520,100],0],[79,"当然可以！","Text_Text_511","106328","106332",74,0,null,null,null,null,0,null,0,2,1,[520,100],0],[80,"好的！","Text_Text_513","106328","106332",75,0,null,null,null,null,0,null,0,2,1,[520,100],0],[81,"跟派对咖对话","Text_Text_403","106328","106332",76,0,null,null,null,null,0,null,0,2,1,[520,100],0],[82,"那我能在旁边跳迪斯科吗？","Text_Text_405","106328","106332",77,0,null,null,null,null,0,null,0,2,1,[520,100],0],[83,"好的，期待你的表演","Text_Text_406","106328","106332",78,0,null,null,null,null,0,null,0,2,1,[520,100],0],[84,"听说你跟嘻哈少年关系不好？","Text_Text_407","106328","106332",79,0,null,null,null,null,0,null,0,2,1,[520,100],0],[85,"晚上有派对吗？","Text_Text_413","106328","106332",82,0,null,null,null,null,0,"88544",0,2,1,[520,100],0],[86,"我已经等不及了！","Text_Text_415","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[87,"跟啦啦队对话","Text_Text_479","106328","106332",83,0,null,null,null,null,0,null,0,2,1,[520,100],0],[88,"跟啦啦队对话","Text_Text_479","106328","106332",86,0,null,null,null,null,0,null,0,2,1,[520,100],0],[89,"跟宿管阿姨对话","486","106328","106332",88,0,null,null,null,null,0,null,0,2,1,[520,100],0],[90,"我可以离开宿舍吗？","488","106328","106332",89,0,null,null,null,null,0,null,0,2,1,[520,100],0],[91,"舍友不舒服怎么办？","489","106328","106332",91,0,null,null,null,null,0,null,0,2,1,[520,100],0],[92,"阿姨我睡不着","490","106328","106332",92,0,null,null,null,null,0,null,0,2,1,[520,100],0],[93,"跟上帝对话","Text_Text_535","106328","106332",93,0,null,null,null,null,0,null,0,2,1,[520,100],0],[94,"爬上来很容易，建议上帝你加点难度","Text_Text_537","106328","106332",94,0,null,null,null,null,0,null,0,2,1,[520,100],0],[95,"他们去摸鱼了","Text_Text_539","106328","106332",95,0,null,null,null,null,0,null,0,2,1,[520,100],0],[96,"我没看到他们","Text_Text_540","106328","106332",95,0,null,null,null,null,0,null,0,2,1,[520,100],0],[97,"你现在做什么","Text_Text_542","106328","106332",96,0,null,null,null,null,0,null,0,2,1,[520,100],0],[98,"我来兑换宝物","Text_Text_619","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[99,"我来兑换白天的特产的啦（废弃）","Text_Text_621","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[100,"与战斗牧师对话","Text_Text_623","106328","106332",98,0,null,null,null,null,0,null,0,2,1,[520,100],0],[101,"那你会什么魔法","Text_Text_627","106328","106332",99,0,null,null,null,null,0,null,0,2,1,[520,100],0],[102,"好的，上课时候再见！","Text_Text_628","106328","106332",101,0,null,null,null,null,0,null,0,2,1,[520,100],0],[103,"与狸正喵沟通","Text_Text_642","106328","106332",102,0,null,null,null,null,0,null,0,2,1,[520,100],0],[104,"好可爱的猫猫啊","Text_Text_644","106328","106332",103,0,null,null,null,null,0,null,0,2,1,[520,100],0],[105,"这只猫居然会说话！！","Text_Text_645","106328","106332",104,0,null,null,null,null,0,null,0,2,1,[520,100],0],[106,"你说的跟班是什么意思？","Text_Text_646","106328","106332",105,0,null,null,null,null,0,null,0,2,1,[520,100],0],[107,"那我以后有机会给你带小零食！","Text_Text_650","106328","106332",106,0,null,null,null,null,0,null,0,2,1,[520,100],0],[108,"那以后你要教我更强大魔法哦！","Text_Text_651","106328","106332",106,0,null,null,null,null,0,null,0,2,1,[520,100],0],[109,"好的，这是我们的秘密！","Text_Text_652","106328","106332",106,0,null,null,null,null,0,null,0,2,1,[520,100],0],[110,"与昆卡船长对话","Captain_01","106328","106332",108,0,null,null,null,null,0,null,0,2,1,[520,100],0],[111,"你是谁？","Captain_03","106328","106332",109,0,null,null,null,null,0,null,0,2,1,[520,100],0],[112,"你为什么从天上来啊？我们的校园也在云上？","Captain_05","106328","106332",110,0,null,null,null,null,0,null,0,2,1,[520,100],0],[113,"欸？船长先生？（他似乎陷入回忆了）","Captain_10","106328","106332",111,0,null,null,null,null,0,null,0,2,1,[520,100],0],[114,"为什么要一直飞行呢？船长先生在旅行吗？","Captain_12","106328","106332",112,0,null,null,null,null,0,null,0,2,1,[520,100],0],[115,"原来还发生过这样的事啊","Captain_14","106328","106332",118,0,null,null,null,null,0,null,0,2,1,[520,100],0],[116,"你来这的目的是什么？","Captain_06","106328","106332",113,0,null,null,null,null,0,null,0,2,1,[520,100],0],[117,"狸月真的很强大吗？收集的金币和银币到底有什么用？","Captain_07","106328","106332",114,0,null,null,null,null,0,null,0,2,1,[520,100],0],[118,"您是认真的吗，船长先生......","Captain_19","106328","106332",115,0,null,null,null,null,0,null,0,2,1,[520,100],0],[119,"后来发生了什么呢？","Captain_21","106328","106332",116,0,null,null,null,null,0,null,0,2,1,[520,100],0],[120,"沉默","Captain_23","106328","106332",117,0,null,null,null,null,0,null,0,2,1,[520,100],0],[121,"那戴安娜院长是不是...","Captain_24","106328","106332",117,0,null,null,null,null,0,null,0,2,1,[520,100],0],[122,"船头有个宝箱，我能打开看看吗？","Captain_08","106328","106332",120,0,null,null,null,null,0,null,0,2,1,[520,100],0],[123,"与莱琳对话","Leryn_01","106328","106332",121,0,null,null,null,null,0,null,0,2,1,[520,100],0],[124,"选择目的地世界","Leryn_03","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[125,"你是谁","Leryn_04","106328","106332",122,0,null,null,null,null,0,null,0,2,1,[520,100],0],[126,"与莱琳对话","LerynNew_01","106328","106332",123,0,null,null,null,null,0,null,0,2,1,[520,100],0],[127,"你跟昆卡船长也经常去冒险吗？","LerynNew_06","106328","106332",124,0,null,null,null,null,0,null,0,2,1,[520,100],0],[128,"想回到魔法校园","LerynNew_07","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[129,"先不上车了","Leryn_09","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[130,"与莎尔嘉对话","Sharega_01","106328","106332",125,0,null,null,null,null,0,null,0,2,1,[520,100],0],[131,"你是谁？","Sharega_11","106328","106332",126,0,null,null,null,null,0,null,0,2,1,[520,100],0],[132,"这里为什么会有三道门？","Sharega_12","106328","106332",127,0,null,null,null,null,0,null,0,2,1,[520,100],0],[133,"离开","Sharega_13","106328","106332",0,0,null,null,null,null,0,null,0,2,1,[520,100],0],[134,"魔法试炼是什么？","Sharega_14","106328","106332",128,0,null,null,null,null,0,null,0,2,1,[520,100],0],[135,"怎样才能开始魔法试炼呢？","Sharega_15","106328","106332",129,0,null,null,null,null,0,null,0,2,1,[520,100],0],[136,"参加试炼有什么要求吗？","Sharega_16","106328","106332",130,0,null,null,null,null,0,null,0,2,1,[520,100],0],[137,"知道了，我会努力的！","Sharega_17","106328","106332",132,0,null,null,null,null,0,null,0,2,1,[520,100],0],[138,"我来兑换道具","GuanJia_1","106328","106332",0,0,null,null,null,null,0,null,0,0,0,[520,100],1]];
export interface ITalkEventElement extends IElementBase{
 	/**qid*/
	ID:number
	/**中文文本描述（不读）*/
	Des1:string
	/**事件名称(索引SquareLanguage表)文本，玩家说的话*/
	Name:string
	/**事件itemicon*/
	ICON:string
	/**事件icon2*/
	ICON2:string
	/**点击对话过后底部显示的对话文本NPC说的话*/
	TEXT:number
	/**奖励获得过后NPC的说话文本*/
	OverRewardText:number
	/**完成任务x后的对话列表*/
	OverTaskText:Array<Array<number>>
	/**特效guid*/
	EffGuid:string
	/**特效偏移xyz*/
	Pos:mw.Vector
	/**音效guid*/
	soundGuid:string
	/**音效大小*/
	Scale:number
	/**动作guid*/
	ActionGuid:string
	/**动作时长*/
	Actiontime:number
	/**停留时间*/
	stopTime:number
	/**npc状态（动态，静态）填2的话会跟随玩家走*/
	state:number
	/**选择对话框的大小，有些长文字UI无法自适应，得手动调*/
	canvasSize:Array<number>
	/**额外参数*/
	params:number
 } 
export class TalkEventConfig extends ConfigBase<ITalkEventElement>{
	constructor(){
		super(EXCELDATA);
	}

}