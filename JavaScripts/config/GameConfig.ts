import {ConfigBase, IElementBase} from "./ConfigBase";
import {ActionConfig} from "./Action";
import {CakePosConfig} from "./CakePos";
import {ChatExpressionConfig} from "./ChatExpression";
import {ChatWordConfig} from "./ChatWord";
import {CreateItemConfig} from "./CreateItem";
import {EffectConfig} from "./Effect";
import {GoldPosConfig} from "./GoldPos";
import {GuideHandleConfig} from "./GuideHandle";
import {GuideConfig} from "./Guide";
import {InteractConfigConfig} from "./InteractConfig";
import {ItemLevelupConfig} from "./ItemLevelup";
import {ItemConfig} from "./Item";
import {ModelConfig} from "./Model";
import {MusicConfig} from "./Music";
import {PropActionConfig} from "./PropAction";
import {PropFlyConfig} from "./PropFly";
import {PropPlacementConfig} from "./PropPlacement";
import {RoleAvatarConfig} from "./RoleAvatar";
import {ShopConfig} from "./Shop";
import {SkillLevelConfig} from "./SkillLevel";
import {SkillConfig} from "./Skill";
import {SquareActionConfigConfig} from "./SquareActionConfig";
import {SquareLanguageConfig} from "./SquareLanguage";
import {TitleStyleConfig} from "./TitleStyle";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Action():ActionConfig{ return this.getConfig(ActionConfig) };
	public static get CakePos():CakePosConfig{ return this.getConfig(CakePosConfig) };
	public static get ChatExpression():ChatExpressionConfig{ return this.getConfig(ChatExpressionConfig) };
	public static get ChatWord():ChatWordConfig{ return this.getConfig(ChatWordConfig) };
	public static get CreateItem():CreateItemConfig{ return this.getConfig(CreateItemConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get GoldPos():GoldPosConfig{ return this.getConfig(GoldPosConfig) };
	public static get GuideHandle():GuideHandleConfig{ return this.getConfig(GuideHandleConfig) };
	public static get Guide():GuideConfig{ return this.getConfig(GuideConfig) };
	public static get InteractConfig():InteractConfigConfig{ return this.getConfig(InteractConfigConfig) };
	public static get ItemLevelup():ItemLevelupConfig{ return this.getConfig(ItemLevelupConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Model():ModelConfig{ return this.getConfig(ModelConfig) };
	public static get Music():MusicConfig{ return this.getConfig(MusicConfig) };
	public static get PropAction():PropActionConfig{ return this.getConfig(PropActionConfig) };
	public static get PropFly():PropFlyConfig{ return this.getConfig(PropFlyConfig) };
	public static get PropPlacement():PropPlacementConfig{ return this.getConfig(PropPlacementConfig) };
	public static get RoleAvatar():RoleAvatarConfig{ return this.getConfig(RoleAvatarConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get SkillLevel():SkillLevelConfig{ return this.getConfig(SkillLevelConfig) };
	public static get Skill():SkillConfig{ return this.getConfig(SkillConfig) };
	public static get SquareActionConfig():SquareActionConfigConfig{ return this.getConfig(SquareActionConfigConfig) };
	public static get SquareLanguage():SquareLanguageConfig{ return this.getConfig(SquareLanguageConfig) };
	public static get TitleStyle():TitleStyleConfig{ return this.getConfig(TitleStyleConfig) };
}