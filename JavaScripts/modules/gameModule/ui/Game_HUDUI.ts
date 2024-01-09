
import { GameConfig } from "../../../config/GameConfig";
import {  HudGameUIState } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import { GlobalModule } from "../../../const/GlobalModule";
import { MyAction, Tween } from "../../../ExtensionType";
import Emoji_generate from "../../../ui-generate/uiTemplate/Chat/Emoji_generate";
import Word_generate from "../../../ui-generate/uiTemplate/Chat/Word_generate";
import Game_HUD_generate from "../../../ui-generate/uiTemplate/gameModule/Game_HUD_generate";
import { GridLayout } from "../../../ui/commonUI/GridLayout";
import Tips from "../../../ui/commonUI/Tips";
import GameUtils from "../../../utils/GameUtils";
import { BagModuleC } from "../../bag/BagModuleC";
import { BagHub } from "../../bag/ui/BagHub";
import { BagPanel } from "../../bag/ui/BagPanel";
import ActionManager from "../../player/managers/ActionManager";
import ShopModuleC from "../../shop/ShopModuleC";
import SkillUI from "../../skill/ui/SkillUI";


export default class Game_HUDUI extends Game_HUD_generate {
	public guideAction: MyAction = new MyAction();
	public flyguide: boolean = false;
	public creatguide: boolean = false;
	public fightGuide: boolean = false;


	/**---------------------------聊天和表情------------------------------------*/
	private _firstClickFlag: boolean = true;		// 判断玩家是否第一次点击快捷聊天按钮
	private layout_emoji: GridLayout<Emoji_generate>;	// 存放聊天表情的滚动框
	private layout_word: GridLayout<Word_generate>;	// 存放聊天文字的滚动框

	protected onAwake() {
		super.onAwake();
		this.layer = mw.UILayerBottom;
	}

	protected onStart() {
		this.canUpdate = true;
		this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;

		this.emojiBtn.onClicked.add(() => {
			this.canvas_emoji.visibility = this.canvas_emoji.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
			this.canvas_word.visibility = mw.SlateVisibility.Collapsed;

			if (this._firstClickFlag) {// 标准的初始化流程，勿改函数顺序
				this.initScrollBox();
				this.addLayoutNodes();
				this.addEmojiBtnEvents();
				this.addWordBtnEvents();
				this.layout_emoji.invalidate();
				this.layout_word.invalidate();
				this._firstClickFlag = false;
			}
		});

		this.wordBtn.onClicked.add(() => {
			this.canvas_word.visibility = this.canvas_word.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
			this.canvas_emoji.visibility = mw.SlateVisibility.Collapsed;

			if (this._firstClickFlag) {
				this.initScrollBox();
				this.addLayoutNodes();
				this.addEmojiBtnEvents();
				this.addWordBtnEvents();
				this.layout_emoji.invalidate();
				this.layout_word.invalidate();
				this._firstClickFlag = false;
			}
		});

		this.mAction_btn.onClicked.add(() => {
			ActionManager.instance.openActionPanle()
		})

		this.mBtnShop.onClicked.add(() => {
			ModuleService.getModule(ShopModuleC).showShopPanle()
		})

		this.mBagBtn.onClicked.add(() => {
			if (GlobalData.inParty) {
				Tips.show(GameUtils.getTxt("Text_Text_975"))
				return
			}
			UIManager.show(BagPanel);
		});

		ModuleService.getModule(BagModuleC).onCashChange.add((num: number) => { 
			this.cashNum.text = "X"+num.toString();
		})
	}

	/**初始化滚动条 */
	private initScrollBox() {
		this.layout_emoji = new GridLayout(this.scrollBox_emoji, true);
		this.layout_emoji.spacingX = 20;// 读表
		this.layout_emoji.spacingY = 20;// 读表
		this.layout_word = new GridLayout(this.scrollBox_word, true);
		if (this.scrollBox_word.orientation == mw.Orientation.OrientVertical)
			this.layout_word.spacingY = 10;// 读表，纵向间距
		else
			this.layout_word.spacingX = 10;// 读表，横向间距
	}

	/**向滚动条中添加结点 */
	private addLayoutNodes() {
		try {
			let length = GameConfig.ChatExpression.getAllElement().length;
			for (let i = 0; i < length; i++) {
				this.layout_emoji.addNode(Emoji_generate);
			}

			let length_word = GameConfig.ChatWord.getAllElement().length;
			for (let i = 0; i < length_word; i++) {
				this.layout_word.addNode(Word_generate);
			}
		}
		catch (e) {
			console.error(e);
		}
	}

	/** 为每个表情按钮添加监听事件 */
	private addEmojiBtnEvents() {
		let eNodes = this.layout_emoji.nodes;
		let config = GameConfig.ChatExpression.getAllElement();
		eNodes.forEach(element => {
			let btn = element.mBtn_expression;
			let index = eNodes.indexOf(element);// index如果拿到外面会溢出
			btn.touchMethod = mw.ButtonTouchMethod.PreciseTap
			btn.normalImageGuid = (config[index].ExpressionIcon);
			btn.onClicked.add(() => {
				this.canvas_emoji.visibility = (1);
				if (config[index].ExpressionVfx) {
					GlobalModule.GameModuleC.playEmoji(config[index].ExpressionVfx)
				}
			});
		});
	}

	/**为每个文字按钮添加监听事件 */
	private addWordBtnEvents() {
		let config = GameConfig.ChatWord.getAllElement();
		let index = 0;
		this.layout_word.nodes.forEach(node => {
			let string = GameConfig.SquareLanguage.getElement(config[index].WordID).Value;
			node.mBtn_word.text = (string);
			node.mBtn_word.touchMethod = mw.ButtonTouchMethod.PreciseTap
			node.mBtn_word.onClicked.add(() => {
				this.canvas_word.visibility = (1);
				GlobalModule.MyPlayerC.chatBack(string);
			});
			index++;
		});
	}

	public setUIState(state: HudGameUIState) {
		switch (state) {
			case HudGameUIState.Show:
				this.mBottomCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				this.mTopEventCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				this.mRightDownCon.visibility = mw.SlateVisibility.SelfHitTestInvisible
				this.mVirtualJoystick.visibility = mw.SlateVisibility.Visible
				this.visible = true
				break;
			case HudGameUIState.BaseHide:
				this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				break;
			case HudGameUIState.CanUseSkill:
				this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				UIManager.getUI(SkillUI).rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				break;
			case HudGameUIState.CanUseBag:
				// this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mRightDownCon.visibility = mw.SlateVisibility.Collapsed
				UIManager.getUI(SkillUI).rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				UIManager.getUI(BagHub).rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				break;
			case HudGameUIState.CanMove:
				this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mRightDownCon.visibility = mw.SlateVisibility.Collapsed
				break;
			case HudGameUIState.TrialLevel:
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				UIManager.getUI(SkillUI).rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				UIManager.getUI(BagHub).rootCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible
				break;
			case HudGameUIState.HideAll:
				this.mBottomCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mTopEventCanvas.visibility = mw.SlateVisibility.Collapsed
				this.mRightDownCon.visibility = mw.SlateVisibility.Collapsed
				this.mVirtualJoystick.visibility = mw.SlateVisibility.Collapsed
				break;
			default:
				break;
		}
	}

	protected onShow(name: string) {
		this.resetJoyStick();
		UIManager.show(SkillUI);
		const count  = ModuleService.getModule(BagModuleC).getItem(90006)?.count||0
		this.cashNum.text = "X"+count.toString();
	}

	protected onHide(): void {
		UIManager.hide(SkillUI);
	}

	public showExitInteractiveBtn(isShow: boolean) {
		if (isShow) {
			this.mExitInteractive_btn.visibility = mw.SlateVisibility.Visible;
			this.mJump_btn.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;
			this.mJump_btn.visibility = mw.SlateVisibility.Visible;
		}
	}


	public refreshActionBtn(name: string, guid: string) {
		this.mAction_btn.normalImageGuid = guid;
		this.textBtn.text = name;
	}

	public resetJoyStick() {
		this.mVirtualJoystick?.resetJoyStick();
	}


}
