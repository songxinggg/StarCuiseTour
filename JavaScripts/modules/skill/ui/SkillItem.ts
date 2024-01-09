

import { GameConfig } from "../../../config/GameConfig";
import { SkillState } from "../../../const/GameEnum";
import GameUtils from "../../../utils/GameUtils";
import SkillBase from "../logic/SkillBase";
import SkillMgr from "../SkillMgr";
import MakePropUI from "./MakePropUI";

export class skillItem {
	public uiObject: mw.Canvas = undefined;
	public btn: mw.Button = undefined;
	public maskBtn: mw.MaskButton = undefined;
	public charge: mw.TextBlock = undefined;
	public CD: mw.TextBlock = undefined;
	public dis: mw.Image = undefined;
	public des: mw.TextBlock = undefined;
	public skill: SkillBase;
	private _fire: mw.VirtualJoystickPanel = undefined;

	constructor(
		uiObject: mw.Canvas,
		btn: mw.Button,
		maskBtn: mw.MaskButton,
		charge: mw.TextBlock,
		CD: mw.TextBlock,
		dis: mw.Image,
		fire: mw.VirtualJoystickPanel,
		des: mw.TextBlock
	) {
		this.uiObject = uiObject;
		this.btn = btn;
		this.maskBtn = maskBtn;
		this.charge = charge;
		this.CD = CD;
		this.dis = dis;
		this._fire = fire;
		this.des = des;
		this.btn.onClicked.clear();
		this.btn.onPressed.clear();
		this.btn.clickMethod = mw.ButtonClickMethod.MouseDown
	}

	public show(skill: SkillBase) {
		this.btn.onPressed.clear();
		this._fire.onJoyStickUp.clear();
		this.skill = skill;
		this.skill.onChargeChange.add(this.chargeChange);
		this.skill.onStateChange.add(this.stateChange);
		this.stateChange(skill.State)
		this.chargeChange(skill.charge, skill.maxCharge)
		const config = GameConfig.Skill.getElement(this.skill.skill);
		//技能描述
		if (config.Des && config.Des[0] != null) {
			this.des.visibility = mw.SlateVisibility.SelfHitTestInvisible
			this.des.text = GameUtils.getTxt(config.Des[0]);
		} else {
			this.des.visibility = mw.SlateVisibility.Collapsed
			this.des.text = ""
		}
		//技能点击两种形式
		this.btn.visibility = mw.SlateVisibility.Visible;
		this._fire.visibility = mw.SlateVisibility.Collapsed;
		this.btn.onPressed.add(() => {
			SkillMgr.Inst.skillStart(this.skill)
		});
		// if (config.SkillType == 0) {
		// }
		// if (config.SkillType == 1) {
		// 	this._fire.visibility = mw.SlateVisibility.Visible;
		// 	this.btn.visibility = mw.SlateVisibility.Collapsed;
		// 	this._fire.onJoyStickUp.add(() => {
		// 		SkillMgr.Inst.skillStart(this.skill)
		// 	});
		// }
		this._fire.backgroundImageId = config.Icon;
		this.maskBtn.normalImageGuid = config.Icon;
		this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	}

	private chargeChange = (charge: number, maxCharge: number) => {
		if (maxCharge >= 2) {
			this.charge.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.charge.text = charge.toString();
		} else {
			this.charge.visibility = mw.SlateVisibility.Collapsed;
			this.charge.text = ""
		}
	};

	private stateChange = (state: SkillState, ...params: any[]) => {
		const config = GameConfig.Skill.getElement(this.skill.skill);
		if (state >= SkillState.Using) {
			this.maskBtn.normalImageColor = mw.LinearColor.colorHexToLinearColor("#FF907E")
			if (config.Des && config.Des[1]) this.des.text = GameUtils.getTxt(config.Des[1]);
		} else {
			this.maskBtn.normalImageColor = mw.LinearColor.colorHexToLinearColor("#FFED83")
			if (config.Des) this.des.text = GameUtils.getTxt(config.Des[0]);
		}
		if (state == SkillState.Creation) {
			UIManager.show(MakePropUI, this.uiObject.position.clone(), params[0], params[1])
		}
		if (state < 0 && state != SkillState.CD) {
			this.dis.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		} else {
			this.dis.visibility = mw.SlateVisibility.Collapsed;
		}
	};

	public hide() {
		if (!this.skill) {
			return;
		}
		this.skill.onChargeChange.remove(this.chargeChange, this);
		this.skill.onStateChange.remove(this.stateChange, this);
		this.maskBtn.circleValue = 1;
		this.uiObject.visibility = mw.SlateVisibility.Collapsed;
	}
}
