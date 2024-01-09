import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../config/GameConfig";
import { EventsName, PlayerStateType } from "../../const/GameEnum";
import { GlobalData } from "../../const/GlobalData";
import GameUtils from "../../utils/GameUtils";
import { BagModuleC } from "../bag/BagModuleC";
import { PropBaseModuleC } from "../squareBase/PropBase/PropBaseModule";
import { mathTools_firstPlaceNumber, PropBaseType } from "../squareBase/PropBase/PropTool";
import { PrefabObject } from "./PrefabObject";
import { PropModuleS } from "./PropModuleS";

export enum ClothType {
	behindHair = "behindHair",
	frontHair = "frontHair",
}

export class PropModuleC extends PropBaseModuleC<PropModuleS, null> {
	private _clothMap: Map<string, string> = new Map();
	private _headTimer
	private _curShow: any;
	private _prefabPoolMap: Map<string, PrefabObject[]> = new Map()

	get clickAction() {
		return this.ui_action.action
	}

	get clickPlace() {
		return this.ui_Placement.action
	}

	public onStart(): void {
		super.onStart();
		Event.addLocalListener(EventsName.PLAYER_STATE, (state: PlayerStateType) => {
			if ([PlayerStateType.Interaction, PlayerStateType.DoublePeopleAction].includes(state)) {
				this.setFlyState(false)
			} else {
				this.setFlyState(true)
			}
		})
	}

	public net_ControlPropState(propID: number, bo: boolean, param1?: any, param2?: any): void {
		const item = ModuleService.getModule(BagModuleC).getCurEquipItem()
		if (bo && item?.configID > 300) {//ID300以内是广场道具
			return;
		}
		super.net_ControlPropState(propID, bo, param1, param2);
	}

	public setUIHide() {
		if (this["ui_action"].visible) {
			this._curShow = this["ui_action"]
			UIManager.hideUI(this._curShow)
		}
		if (this["ui_fly"].visible) {
			this._curShow = this["ui_fly"]
			UIManager.hideUI(this._curShow)
		}
		if (this["ui_Placement"].visible) {
			this._curShow = this["ui_Placement"]
			UIManager.hideUI(this._curShow)
		}
	}

	public setFlyState(isFly: boolean) {
		if (isFly) {
			this.ui_fly.mBtn.enable = true;
			this.ui_fly.forbidden.visibility = mw.SlateVisibility.Collapsed;
		} else {
			this.ui_fly.mBtn.enable = false;
			if (!this.ui_fly._isActive) {
				this.ui_fly.mBtn.onClicked.broadcast();
			}
			this.ui_fly.forbidden.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
	}

	public propClickEnd(propId: number): void {
		console.log("道具点击@@@@@@@@@@@@@@@@@@@@@", propId)
		if (mathTools_firstPlaceNumber(propId) == PropBaseType.Action) {
			setTimeout(() => {
				ModuleService.getModule(BagModuleC).useSquareItem(propId);
			}, GameConfig.PropAction.getElement(propId).ActionOldTime * 1000);
		} else if (mathTools_firstPlaceNumber(propId) == PropBaseType.Fly) {
			console.log("飞行点击@@@@@@@@@@@@@@@@@@@@@")
			return;
		} else {
			ModuleService.getModule(BagModuleC).useSquareItem(propId);
		}
	}

	/** 
	 * 释放造物技能
	 * @param  id       造物表ID
	 * @param  callBack 技能表现完成回调
	 * @return 
	 */
	public async doItemSkill(id: number, callBack?: () => void) {
		const character = Player.localPlayer.character;
		const skillCfg = GameConfig.CreateItem.getElement(id);
		let time = 0;
		let anim: mw.Animation;
		if (skillCfg.AnimGuid) {
			await GameUtils.downAsset(skillCfg.AnimGuid)
			anim = PlayerManagerExtesion.loadAnimationExtesion(character, skillCfg.AnimGuid, true)
			anim.loop = 0
			anim.speed = 1
			anim.play()
			time = anim.length
		}
		if (skillCfg.Appearance) {
			this.recoverCloth(skillCfg.Appearance, skillCfg.ClothType, skillCfg.ClothTime)
		}
		if (skillCfg.SoundGuid) {
			await GameUtils.downAsset(skillCfg.SoundGuid)
			const loc = character.worldTransform.position
			const param = skillCfg.SoundParameter;
			//xxj
			let info = { innerRadius: param[0], maxDistance: param[0] * 1.2 }
			let str = JSON.stringify(info)
			this.server.net_PlaySound(skillCfg.SoundGuid, loc, param[2], param[1], str);
		}
		if (skillCfg.EffGuid) {
			const transform = this.arrayToVector(skillCfg.TransformEffect)
			this.server.net_PlayEffect(skillCfg.EffGuid, skillCfg.EffectPoint, 0, transform.loc, transform.roc, transform.scale);
		}
		if (skillCfg.SkillGuid) {
			this.spawnPrefab(skillCfg.SkillGuid, 100, skillCfg.SkillTime, skillCfg.SkillIsClient)
		}
		if (skillCfg.Time) {
			time = skillCfg.Time
		}
		GlobalData.skillCD = time
		setTimeout(() => {
			anim && anim.stop();
			this.server.net_StopEffect();
			this.server.net_StopSound();
			if (callBack) {
				callBack();
			}
		}, time * 1000);
	}

	public arrayToVector(arr: Array<number>): { loc: mw.Vector, roc: mw.Rotation, scale: mw.Vector } {
		if (arr.length == 9) {
			const loc = new mw.Vector(arr[0], arr[1], arr[2])
			const roc = new mw.Rotation(arr[3], arr[4], arr[5])
			const scale = new mw.Vector(arr[6], arr[7], arr[8])
			const transform: { loc: mw.Vector, roc: mw.Rotation, scale: mw.Vector } = {
				loc: loc,
				roc: roc,
				scale: scale
			};
			return transform
		}
	}

	/** 
	 * 在角色前方创建object
	 * @param  guid	
	 * @param  zOffset 相对于角色高度z偏移量
	 * @return 
	 */
	public async spawnPrefab(guid: string, zOffset: number, time: number = 99999, isClient: boolean = true) {
		const character = Player.localPlayer.character
		const forward = character.worldTransform.getForwardVector().normalize()
		const loc = character.worldTransform.position.add(forward.multiply(200));
		loc.z -= zOffset
		if (isClient) this.net_SpawnPrefab(guid, time, loc)
		this.server.net_SpawnPrefab(guid, time, loc, isClient)
		return loc;
	}

	public async net_SpawnPrefab(guid: string, time: number, loc: mw.Vector) {
		let objPool: PrefabObject[]
		if (!this._prefabPoolMap.has(guid)) {
			objPool = []
			this._prefabPoolMap.set(guid, objPool)
		} else {
			objPool = this._prefabPoolMap.get(guid);
		}
		let prefab: PrefabObject;
		let isNew: boolean = true
		for (let i = 0; i < objPool.length; i++) {
			const element = objPool[i]
			if (!element.isActive) {
				prefab = element;
				isNew = false;
				break;
			}
			if (i == 30) {
				prefab = objPool.shift()
				objPool.push(prefab)
				isNew = false;
			}
		}
		if (isNew) {
			prefab = new PrefabObject(guid);
			objPool.push(prefab)
		}
		await prefab.spawn(time, true);
		if(prefab.obj)
		prefab.obj.worldTransform.position = loc
		return prefab
	}

	/** 
	 * 角色换装
	 * @param  appearance
	 * @param  type
	 * @param  time
	 * @return 
	 */
	public recoverCloth(appearance: string, type: number, time: number) {
		switch (type) {
			case 1:
				this.headPartCloth(appearance, time)
				break;
			default:
				break;
		}
	}

	headPartCloth(appearance: string, time: number) {
		const v2 = Player.localPlayer.character.getDescription()
		const { frontHair, backHair } = v2.advance.hair;
		if (this._headTimer) {
			const oldF = this._clothMap.get(ClothType.frontHair)
			const oldB = this._clothMap.get(ClothType.behindHair)
			backHair.style=oldB
			frontHair.style=oldF
			clearTimeout(this._headTimer);
			this._headTimer = null;
		} else {
			this._clothMap.set(ClothType.frontHair, frontHair.style);
			this._clothMap.set(ClothType.behindHair, backHair.style);
		}
		backHair.style=appearance
		frontHair.style=""
		Player.localPlayer.character.syncDescription();
		this._headTimer = setTimeout(() => {
			const oldF = this._clothMap.get(ClothType.frontHair)
			const oldB = this._clothMap.get(ClothType.behindHair)
			backHair.style=oldB
			frontHair.style=oldF
			Player.localPlayer.character.syncDescription();
			clearTimeout(this._headTimer);
			this._headTimer = null;
		}, time * 1000);
	}

	protected onUpdate(dt: number): void {
		for (const [guid, prefabPool] of this._prefabPoolMap) {
			for (let i = 0; i < prefabPool.length; i++) {
				const element = prefabPool[i];
				if (element.isActive) {
					element.life -= dt;
					if (element.life <= 0) {
						element.despawn()
					}
				}
			}
		}
	}

	protected onDestroy(): void {
		for (const [guid, prefabPool] of this._prefabPoolMap) {
			for (let i = 0; i < prefabPool.length; i++) {
				const element = prefabPool[i];
				element.destory()
			}
		}
	}
}