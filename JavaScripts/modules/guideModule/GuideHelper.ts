import { ModifiedCameraSystem,CameraModifid, } from '../../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../../config/GameConfig";
import { IGuideElement } from "../../config/Guide";
import { GlobalData } from "../../const/GlobalData";
import { MyAction } from "../../ExtensionType";
import GameUtils from "../../utils/GameUtils";
import { BagHub } from "../bag/ui/BagHub";
import SkillUI from "../skill/ui/SkillUI";
import { ChatUI } from "./ChatUI";
import { GuideDataHelper } from "./GuideModelData";
import { GuideModuleC } from "./GuideModuleC";
import { GuideModuleView } from "./GuideModuleView";

enum HandleType {
	/**对话操作 */
	DialogText = 1,
	/**移动相机操作 */
	CameraMove,
	/**相机回归自身 */
	CameraBack,
	/**引导线操作 */
	GuideLinear,
	/**强制引导 */
	Force,
	/**引导条件 */
	Condition,
}
type condCall = () => boolean;

export namespace GuideEvent {
	
}

export class GuideHelper {
	private guideC: GuideModuleC = null;
	private guideUI: ChatUI;
	private defaultCamLen: number = 0;
	private relTransform: mw.Transform;

	private static _Instance: GuideHelper = null;
	public static get getInstance(): GuideHelper {
		if (mw.SystemUtil.isServer()) {
			return null;
		}
		if (GuideHelper._Instance == null) {
			GuideHelper._Instance = new GuideHelper();
			GuideHelper._Instance.init();
		}
		return GuideHelper._Instance;
	}

	public get guideData(): GuideDataHelper {
		return DataCenterC.getData(GuideDataHelper);
	}

	init(): void {
		this.guideC = ModuleService.getModule(GuideModuleC);
		this.defaultCamLen = Camera.currentCamera.springArm.length;
		this.relTransform = Camera.currentCamera.worldTransform.clone();
		GlobalData.cameraSystemRelativeTransform = Camera.currentCamera.springArm.localTransform.clone().clone();
		this.guideC.setGuideArrowGuid("7697", "196988", "197483");
		this.guideC.setGuideArrowScaleY(0.5);
		this.guideC.reSetToTargetPosDistance(100);
		// 监听引导回调
		this.guideC.guideComplateAction.clear();
		this.guideC.guideComplateAction.add((guideId: number) => {
			console.log("guideComplateAction", guideId);
			switch (guideId) {
				case 4:
				
				default:
					break;
			}
			const config = GameConfig.Guide.getElement(guideId)
			if (config.nextGuideId && config.nextGuideId > 0) {
				this.guideC.forceComplateGuide(guideId)
				this.guideC.triggerGuide(config.nextGuideId)
			}
		});

		this.addLisntener();
	}

	private downloadAssets() {
		return Promise.all([GameUtils.downAsset("7697"), GameUtils.downAsset("13587"), GameUtils.downAsset("197483")]);
	}

	/**
	 * 其他模块触发引导
	 */
	async addLisntener() {
		await this.downloadAssets();
	}


	/**添加引导操作 */
	private addHandle(guideCfg: IGuideElement): void {
		if (guideCfg.parallelHandles == null) {
			console.error("addHandle  guideCfg.parallelHandles==null ", guideCfg.id);
			return;
		}
		// 引导步骤
		const { id, parallelHandles, nextGuideId } = guideCfg;
		let guideHandle = this.guideC.addGuideStageHandle(id);
		let conds: condCall[] = [];
		let standbyFunc: MyAction = new Action()
		// 引导条件
		guideHandle.addRunFunc(() => {
			standbyFunc.call()
		})
		// 引导分步
		for (let i = 0; i < parallelHandles.length; i++) {
			const handleId = parallelHandles[i];
			let handleCfg = GameConfig.GuideHandle.getElement(handleId);

			if (handleCfg == null) {
				console.log("addHandle handleCfg == null ", handleId);
				continue;
			}
			switch (handleCfg.handleType) {
				case HandleType.DialogText:
					guideHandle.addRunFunc(() => {
						this.guideUI = UIManager.show(ChatUI)
						// 显示弹框UI，刷新介绍信息
						this.guideUI.msgShowEnd.clear();
						this.guideUI.msgShowEnd.add(() => {
							UIManager.hideUI(this.guideUI)
						});

						this.guideUI.setMSG([handleCfg.dialogText]);

						conds.push(() => {
							return this.guideUI.visible == false;
						});
					})
					break;
				case HandleType.CameraMove:
					guideHandle.addRunFunc(() => {
						this.changeCamera(handleCfg.targetLocation, handleCfg.camLen, handleCfg.lockRotation);
					})
					break;
				case HandleType.CameraBack:
					guideHandle.addRunFunc(() => {
						this.cameraBack();
					})
					break;
				case HandleType.GuideLinear:
					let pos = handleCfg.pos;
					let isOver = false;
					if (pos != null) {
						guideHandle.addBindWorldPos(pos).addRunFunc(() => {
							isOver = true;
						});
						conds.push(() => {
							return isOver;
						});
					}
					break;
				case HandleType.Force:
					//引导阶段设置
					if (!handleCfg.AppearUI) {
						return;
					}
					let ui: mw.UIScript = null;
					let widget: mw.Widget = null;

					// 17
					if (handleCfg.AppearUI == "SkillUI") {
						ui = UIManager.getUI(SkillUI, false);
					}
					widget = ui[handleCfg.NodePath];
					guideHandle.addBindUIAndTips(widget, handleCfg.UIDiag);
					break;
				case HandleType.Condition:
					if (handleCfg.AppearUI == "BagHub") {
						guideHandle.addCondition(() => {
							const bagHub = UIManager.getUI(BagHub);
							return bagHub["_allSlot"][1].id !== "";
						});
					}
					break;
				default:
					break;
			}
		}

		guideHandle.addCondition(() => {
			let isTrue = true;
			for (let index = 0; index < conds.length; index++) {
				if (conds[index]() == false) {
					isTrue = false;
					break;
				}
			}
			return isTrue;
		}).addRunFunc(async () => {
		
		});
	}

	public changeCamera(loc: mw.Vector, len: number, rot: mw.Vector) {
		const player = Player.localPlayer;
		const camSys = Camera.currentCamera;

		camSys.positionLagEnabled = false;
		camSys.rotationLagEnabled = false;
		camSys.springArm.useControllerRotation = false;

		let tran = camSys.worldTransform.clone().clone();
		camSys.positionMode = mw.CameraPositionMode.PositionFixed;
		setTimeout(() => {
			camSys.springArm.worldTransform = new mw.Transform(loc, new mw.Rotation(rot), tran.scale);
		}, 150);
		camSys.springArm.length = len;

		player.character.movementEnabled = false;
		player.character.jumpEnabled = false;
		player.character.setVisibility(mw.PropertyStatus.Off, true);
	}

	public async cameraBack() {
		const player = Player.localPlayer;
		const cameraSystem = Camera.currentCamera;

		cameraSystem.springArm.worldTransform = this.relTransform;
		cameraSystem.positionMode = mw.CameraPositionMode.PositionFollow;
		ModifiedCameraSystem.cancelCameraFollowTarget();
		Camera.currentCamera.springArm.localTransform = GlobalData.cameraSystemRelativeTransform.clone();
		cameraSystem.springArm.useControllerRotation = true;
		cameraSystem.springArm.collisionEnabled = true;
		cameraSystem.springArm.length = this.defaultCamLen;

		player.character.movementEnabled = true;
		player.character.jumpEnabled = true;
		player.character.setVisibility(mw.PropertyStatus.On, true)

	}

	public async resetGuide(guideId: number) {
		await ModuleService.getModule(GuideModuleC).resetAllGuideDB();
		this.guideC.triggerGuide(guideId);
	}


	/**设置引导线到目标点 */
	public async setGuideLinear(show: boolean, loc: mw.Vector|mw.GameObject) {

		if (show) {
			await this.downloadAssets();
			UIManager.getUI(GuideModuleView).setGuideArrowTargetPos(loc,this.clearTime, 0, false);
			this._tid && this.clearTime();
			this._tid = TimeUtil.setInterval(() => {
				UIManager.getUI(GuideModuleView).setGuideArrowTargetPos(loc,null, 0, true);
			}, 0.01);
		} else {
			if (this._tid) {
				UIManager.getUI(GuideModuleView).hideAllItem();
				this.clearTime();
			}
		}
	}

	private _tid;
	private clearTime = () => {
		oTrace("_________________Guide.endGudieLinear");
		TimeUtil.clearInterval(this._tid);
		this._tid = null;
		Event.dispatchToLocal(GuideLinear_CancelGuide);
		return true;
	};
}
/**设置引导线 */
export const GuideLinear_StartGuide = "GuideLinear_StartGuide";
/**引导完成 取消引导 */
export const GuideLinear_CancelGuide = "GuideLinear_CancelGuide";

export const Guide_ChipMax = 101
