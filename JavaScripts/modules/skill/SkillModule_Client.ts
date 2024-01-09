
import { GameConfig } from "../../config/GameConfig";
import { EventsName, PlayerStateType, SkillState } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import { getMyCharacterGuid } from "../../ExtensionType";
import { BagModuleC } from "../bag/BagModuleC";
import BulletTrrigerMgr from "./bullettrriger/BulletTrrigerMgr";
import SkillBase from "./logic/SkillBase";
import { SkillData } from "./SkillData";
import SkillMgr from "./SkillMgr";
import SkillModule_Server from "./SkillModule_Server";
import SkillUI from "./ui/SkillUI";

export default class SkillModule_Client extends ModuleC<SkillModule_Server, SkillData> {
	private _disableStateArr: SkillBase[] = []
	private _callArr: any[] = []
	private _skillUI: SkillUI;
	private _curSkill: SkillBase[] = [null, null, null, null];
	private lastItemID: number = 0;
	protected onStart(): void {
		this._skillUI = UIManager.show(SkillUI);
		this.registerSkill();
		Event.addLocalListener(EventsName.UseSkill, (itemID: number, skillID: number) => {
		});
		Event.addLocalListener(EventsName.PLAYER_STATE, (state: PlayerStateType) => {
			this.setState(state)
		})
	}

	private registerSkill() {
		for (const config of GameConfig.Skill.getAllElement()) {
			this._callArr.push(() => {
				const skill = SkillMgr.Inst.registerSkill(config.ID, getMyCharacterGuid())
				if (skill.disableState.length > 0) {
					this._disableStateArr.push(skill)
				}
			})
		}
	}

	public setState(state: PlayerStateType) {
		for (const skill of this._curSkill) {
			if (skill && skill.runtime > 0 && state != PlayerStateType.isUsingSkill && [SkillState.Using].includes(skill.State)) {
				SkillMgr.Inst.skillOver(skill)
			}
		}
		for (const skill of this._disableStateArr) {
			if (skill.disableState.includes(state)) {
				skill.State = SkillState.Disable
			} else {
				if (skill.State == SkillState.Disable) skill.State = SkillState.Enable
			}
		}
	}

	public getSkill(itemID: number) {
		if (itemID == 0)
			this.getSkillUI([]);
		else if (this.lastItemID != itemID) {
			const bagModuleC = ModuleService.getModule(BagModuleC)
			const item = bagModuleC.getItem(itemID);
			const level = item && item.level ? item.level : 0;
			if (level) {
				itemID = Math.floor(itemID / 100) * 100 + level;
			}
			const config = GameConfig.ItemLevelup.getElement(itemID);
			this.getSkillUI(config?.skills, itemID);
		}
		this.lastItemID = itemID;
	}

	public getSkillUI(skills: number[], itemID: number = 0) {
		if (!skills) {
			skills = [];
		}
		const skillItemArr = this._skillUI.skillItemArr;
		for (const iterator of skillItemArr) {
			iterator.hide();
		}
		for (let i = 0; i < this._curSkill.length; i++) {
			if (this._curSkill[i]) {
				SkillMgr.Inst.skillRemove(this._curSkill[i])
				this._curSkill[i] = null;
			}
		}
		for (let i = 0; i < skills.length; i++) {
			const ID = Number((skills[i] / 100).toFixed(0));
			this._callArr.push(() => {
				const skill: SkillBase = SkillMgr.Inst.findSkill(ID, getMyCharacterGuid());
				if (skill) {
					skill.show(skills[i], itemID);
					skillItemArr[i].show(skill);
					this._curSkill[i] = skill;
				}
			})
		}
	}

	protected onUpdate(dt: number): void {
		BulletTrrigerMgr.instance.update(dt);
		if (GlobalData.skillCD >= 0) {
			GlobalData.skillCD -= dt;
		}
		if (this._callArr.length > 0) {
			this._callArr.shift()();
		}
		SkillMgr.Inst.update(dt);
	}
}
