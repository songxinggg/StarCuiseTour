
import { GameConfig } from "./config/GameConfig";
import { GlobalData } from "./const/GlobalData";
import { BagModuleDataHelper } from "./modules/bag/BagDataHelper";
import { BagModuleC } from "./modules/bag/BagModuleC";
import { BagModuleS } from "./modules/bag/BagModuleS";
import { CameraModuleC, CameraModuleS } from "./modules/camera/CameraModule";
import { GameModuleC } from "./modules/gameModule/GameModuleC";
import { GameModuleS } from "./modules/gameModule/GameModuleS";
import Game_HUDUI from "./modules/gameModule/ui/Game_HUDUI";
import { GuideDataHelper } from "./modules/guideModule/GuideModelData";
import { GuideModuleC } from "./modules/guideModule/GuideModuleC";
import { GuideModuleS } from "./modules/guideModule/GuideModuleS";
import { InteractModuleClient } from "./modules/interactModule/InteractModuleClient";
import { InteractModuleServer } from "./modules/interactModule/InteractModuleServer";
import PartyModuleC from "./modules/party/PartyModuleC";
import PartyModuleS from "./modules/party/PartyModuleS";
import { PlayerData } from "./modules/player/PlayerData";
import PlayerModuleClient from "./modules/player/PlayerModuleClient";
import PlayerModuleServer from "./modules/player/PlayerModuleServer";
import { PropModuleC } from "./modules/prop/PropModuleC";
import { PropModuleS } from "./modules/prop/PropModuleS";
import ShopData from "./modules/shop/ShopData";
import ShopModuleC from "./modules/shop/ShopModuleC";
import ShopModuleS from "./modules/shop/ShopModuleS";
import SkillModule_Client from "./modules/skill/SkillModule_Client";
import SkillModule_Server from "./modules/skill/SkillModule_Server";
import GameUtils from "./utils/GameUtils";

declare global {
	var UE: any;
	var puerts: any;
}

@Component
class GameStart extends mw.Script {
	@mw.Property()
	private isOnline: boolean = false;

	@mw.Property({ displayName: "是否打开GM" })
	private isOpenGM = false;

	@mw.Property({ displayName: "多语言", selectOptions: { default: "-1", en: "0", zh: "1" } })
	private language: string = "-1";

	onStart() {
		super.onStart();
		let sd = SystemUtil.isPIE ? true : !this.isOnline;
		DataStorage.setTemporaryStorage(sd);
		GameUtils.systemLanguageIndex = Number(this.language);
		if (SystemUtil.isClient()) {
			//初始化表格语言
			GameConfig.initLanguage(GameUtils.systemLanguageIndex, key => {
				if (!key) return;
				let ele = GameConfig.SquareLanguage.getElement(key);
				if (ele == null) return "unknow_" + key;
				return ele.Value;
			});
			mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
				let key: string = ui.text;
				if (key) {
					let data = GameUtils.getLanguage(key);
					if (data) {
						ui.text = data.info;
						if (data.size > 0) {
							ui.fontSize = data.size;
						}
					}
				}
			});
		}
		GlobalData.isOpenGM = this.isOpenGM;
		GlobalData.globalPos = this.gameObject.worldTransform.position;
		this.useUpdate = true;
		this.onRegisterModule();
		UIManager.addUILayerMap(mw.UILayerTop, 500000)
		
	}
	onUpdate(dt: number): void {
		super.onUpdate(dt);
		TweenUtil.TWEEN.update();
	}
	//获取系统语言索引
	private getSystemLanguageIndex(): number {
		let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
		if (!!language.match("en")) {
			return 0;
		}
		if (!!language.match("zh")) {
			return 1;
		}
		if (!!language.match("ja")) {
			return 2;
		}
		if (!!language.match("de")) {
			return 3;
		}
		return 0;
	}
	//注册模块
	async onRegisterModule() {
		ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
		ModuleService.registerModule(PlayerModuleServer, PlayerModuleClient, PlayerData); //整体角色管理
		ModuleService.registerModule(GameModuleS, GameModuleC, null); //负责大厅的一些UI点击
		ModuleService.registerModule(BagModuleS, BagModuleC, BagModuleDataHelper); //背包 和广场那边一样
		ModuleService.registerModule(CameraModuleS, CameraModuleC, null); //拍照 相机视角切换
		ModuleService.registerModule(PropModuleS, PropModuleC, null); //背包中那些道具的使用
		ModuleService.registerModule(ShopModuleS, ShopModuleC, ShopData);
		ModuleService.registerModule(InteractModuleServer, InteractModuleClient, null);
		ModuleService.registerModule(SkillModule_Server, SkillModule_Client, null);
		ModuleService.registerModule(PartyModuleS, PartyModuleC, null);

		if (SystemUtil.isClient()) {
			UIManager.show(Game_HUDUI);
		}
	}
}
export default GameStart;
