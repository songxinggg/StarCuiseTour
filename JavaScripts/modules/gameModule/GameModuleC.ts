import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../config/GameConfig";
import { HudGameUIState, PlayerStateType } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { SoundManager } from "../../ExtensionType";
import GMHUD_generate from "../../ui-generate/uiTemplate/GM/GMHUD_generate";
import { SettingUI } from "../../ui/SettingUI";
import GameUtils from "../../utils/GameUtils";
import { BagModuleC } from "../bag/BagModuleC";
import GMBasePanelUI from "../gm/GMBasePanelUI";
import ActionManager from "../player/managers/ActionManager";
import PlayerManager from "../player/managers/PlayerManager";
import { IGameModuleS } from "./GameModuleS";
import Game_HUDUI from "./ui/Game_HUDUI";
import Tips from "../../ui/commonUI/Tips";

export interface IGameModuleC {
	net_PlayEmojiC(guid: string, pid: number)
}
//客户端
export class GameModuleC extends ModuleC<IGameModuleS, null> implements IGameModuleC {
	public hudPanel: Game_HUDUI;
	public curBgmID: number = 13;

	private btnExitInteractiveCallback: () => void;
	private moveExitInteractiveCallback: () => void;
	private jumpExitInteractiveCallback: () => void;

	onStart() {
		this.hudPanel = UIManager.getUI(Game_HUDUI, true);

		this.hudPanel.mJump_btn.onPressed.add(() => {
			ActionManager.instance.cleanStance();
			this.localPlayer.character.jump();
			if (this.jumpExitInteractiveCallback != null) {
				this.jumpExitInteractiveCallback();
				this.jumpExitInteractiveCallback = null;
			}
		});
		//玩家属性UI
		this.hudPanel.mIdCard_btn.onClicked.add(() => {
			UIManager.show(SettingUI);
		});

		/**点击退出交互物按钮 */
		this.hudPanel.mExitInteractive_btn.onClicked.add(() => {
			if (this.btnExitInteractiveCallback != null) {
				this.btnExitInteractiveCallback();
				this.btnExitInteractiveCallback = null;
			}
		});
		/**摇杆移动事件 */
		this.hudPanel.mVirtualJoystick.onInputDir.add((vec: mw.Vector2) => {
			if (this.moveExitInteractiveCallback != null) {
				this.moveExitInteractiveCallback();
				this.moveExitInteractiveCallback = null;
			}
		});

		Event.addLocalListener("PlyaerReset", this.resetState)
	}

	//进入场景
	onEnterScene(sceneType: number): void {
		let char = Player.localPlayer && Player.localPlayer.character
		if (!char) {
			console.log('onEnterScene error char is null')
			return
		}
		GlobalData.globalRot = char.worldTransform.rotation.clone()
		if (GlobalData.isOpenGM) {
			this.addGM();
			new GMBasePanelUI().show();
			InputUtil.onKeyDown(mw.Keys.G, () => { UIManager.show(GMHUD_generate) })
		}

		let lastTime = 0
		this.hudPanel.mPulloff_btn.onClicked.add(() => {
			if (!GlobalData.canClickKaZhu) {
				Tips.show(GameUtils.getTxt("Text_Text_974"))
				return
			}
			
			let nt = TimeUtil.elapsedTime();
			if (nt - lastTime < 3)
				return;
			lastTime = nt;
			this.resetState();
			setTimeout(() => {
				this.localPlayer.character.worldTransform.position = GlobalData.globalPos
				this.localPlayer.character.worldTransform.rotation = GlobalData.globalRot
				UIManager.setUIstate(null, HudGameUIState.Show)
			}, 500);
		});

		this.loginChoose();
		this.playBGM();
	}



	public resetState = () => {
		if (this.btnExitInteractiveCallback != null) {
			this.btnExitInteractiveCallback();
			this.btnExitInteractiveCallback = null;
		}
		ActionManager.instance.off();
		PlayerManager.instance.setPlayerState(PlayerStateType.None, true)
		this.localPlayer.character.movementDirection = mw.MovementDirection.ViewDirection
		this.localPlayer.character.movementEnabled = true
		this.localPlayer.character.jumpEnabled = true
	}

	private addGM() {

		AddGMCommand("隐藏GM_UI", (player: mw.Player, value: string) => {
			UIManager.hide(GMHUD_generate)
		})
		AddGMCommand("添加指定物品", (player: mw.Player, value: string) => {
			const v = value.split(",").map(v => Number(v));
			const id = v[0];
			const count = v[1] ? v[1] : 1;
			id && ModuleService.getModule(BagModuleC).addItem(id, count);
		});
		AddGMCommand("添加所有物品", (player: mw.Player, value: string) => {
			const allItemLst = GameConfig.Item.getAllElement();
			for (const item of allItemLst) {
				if ([1, 3].includes(item.ItemType)) ModuleService.getModule(BagModuleC).addItem(item.ID, 1, false);
			}
		});

	}

	/**
	 * 监听退出交互物的操作
	 * @param type 类型 1-按钮退出 2-行走和跳跃退出 3-跳跃退出
	 * @param Callback 退出的回调
	 */
	public addExitInteractiveListener(type: number, Callback: () => void) {
		if (type == 1) {
			this.hudPanel.showExitInteractiveBtn(true);
			this.btnExitInteractiveCallback = Callback;
			this.moveExitInteractiveCallback = null;
			this.jumpExitInteractiveCallback = null;
		} else if (type == 2) {
			this.hudPanel.showExitInteractiveBtn(false);
			this.moveExitInteractiveCallback = Callback;
			this.jumpExitInteractiveCallback = Callback;
			this.btnExitInteractiveCallback = null;
		} else if (type == 3) {
			this.hudPanel.showExitInteractiveBtn(false);
			this.jumpExitInteractiveCallback = Callback;
			this.moveExitInteractiveCallback = null;
			this.btnExitInteractiveCallback = null;
		}
	}

	public removeExitInteractiveListener() {
		this.btnExitInteractiveCallback = null;
		this.moveExitInteractiveCallback = null;
		this.jumpExitInteractiveCallback = null;
		this.hudPanel.showExitInteractiveBtn(false);
	}

	/**
	 * 登录设置身份牌
	 * @param occupation
	 * @returns
	 */
	private loginChoose() {
		let nickName = mw.AccountService.getNickName();
		this.server.net_PlayerLogin(!nickName ? this.localPlayer.character.displayName : nickName);
	}

	/**播放大厅音乐 */
	public playBGM() {
		let ID = 13;
		let cfg = GameConfig.Music.getElement(ID);
		SoundManager.playBGM(cfg.MusicGUID, 0.7);
		this.curBgmID = ID;
	}

	public net_PlayEmojiC(guid: string, pid: number) {
		let player = Player.getPlayer(pid);
		let scale = new Vector(2,2,2)
		let offset = 200;
		GeneralManager.rpcPlayEffectOnPlayer(guid, player, 23, 1, new mw.Vector(0, 0, offset), mw.Rotation.zero, scale);
	}

	public playEmoji(guid: string) {
		this.server.net_playEmojiS(guid)
	}
}
