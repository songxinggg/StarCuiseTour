
import { SpawnManager, } from '../../Modified027Editor/ModifiedSpawn';
import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { GlobalData } from "../../const/GlobalData";
import { GlobalModule } from "../../const/GlobalModule";
import { Tween } from "../../ExtensionType";
import { GameModuleC } from "../gameModule/GameModuleC";
 
export class CameraModuleC extends ModuleC<CameraModuleS, null> {
	//摄像机
	private camera: Camera;
	private cameraBornLength: number;
	private cameraRot: mw.Rotation;
	private relTransform: mw.Transform;
	private rotationLag;
	private tween: Tween<any>;
	private oldCameraLocLag: number;
	private oldCameraRotaLag: number;
	private rotationTime;
	private postProcess: mw.PostProcess;

	//玩家
	private playerWalkSpeed: number;

	private tempObj: mw.GameObject;

	public gameModuleC: GameModuleC;

	protected onStart(): void {
		//玩家
		this.playerWalkSpeed = this.localPlayer.character.maxWalkSpeed;
		//摄像机
		this.camera = Camera.currentCamera;
		this.cameraBornLength = this.camera.springArm.length;
		this.relTransform = this.camera.localTransform.clone();
		this.oldCameraLocLag = this.camera.positionLagSpeed;
		this.oldCameraRotaLag = this.camera.rotationLagSpeed;
		this.initProcess();
		SpawnManager.asyncSpawn({ guid: "Anchor" }).then(obj => {
			this.tempObj = obj;
		});

		this.gameModuleC = GlobalModule.GameModuleC;
	}


	/**注册后处理--滤镜功能 */
	public async initProcess() {
		let obj = await SpawnManager.wornAsyncSpawn("PostProcessAdvance");
		if (!obj) {
			this.initProcess();
		}
		this.postProcess = obj as mw.PostProcess;
	}

	/**
	 * @description: 装扮模块玩家特写
	 * @param {*} isShow
	 * @param {*} offsetAngle 偏移角度
	 * @param {*} offsetZ 偏移量z
	 * @param {*} fov 广角
	 * @return {*}
	 */
	public facadPlayerRotation(isShow = true, lookHuman?: mw.GameObject, x = 200, y = 0, z = -40) {
		if (mw.SystemUtil.isServer()) return;
		if (isShow) {
			ModifiedCameraSystem.followTargetInterpSpeed = 0;
			ModifiedCameraSystem.setCameraFollowTarget(lookHuman)
			this.camera.fov = 60
			let ro = lookHuman.worldTransform.rotation
			ro.z -= 180;
			let forward = lookHuman.worldTransform.getForwardVector().multiply(200)
			this.camera.springArm.localTransform.position = new mw.Vector(x, y, z)
			ModifiedCameraSystem.setOverrideCameraRotation(ro);
		}
		else {
			ModifiedCameraSystem.followTargetInterpSpeed = 0;
			ModifiedCameraSystem.cancelCameraFollowTarget()
			Camera.currentCamera.springArm.localTransform = GlobalData.cameraSystemRelativeTransform.clone();
			this.camera.fov = 90;
			this.camera.positionLagEnabled = false;
			this.camera.rotationLagEnabled = false;
			this.camera.springArm.localTransform.position = mw.Vector.zero
			ModifiedCameraSystem.resetOverrideCameraRotation();
		}
	}

	/**摄像机关特写旋转 */
	public cameraPlayerReset() {
		if (this.rotationLag != null) {
			clearTimeout(this.rotationLag);
			this.rotationLag = null;
		}
		this.camera.positionLagEnabled = false;
		this.camera.rotationLagEnabled = false;
		this.camera.rotationLagSpeed = this.oldCameraRotaLag;
		this.camera.positionLagSpeed = this.oldCameraLocLag;
	}
	/**
	 * 摄像机移动
	 * @param originLoc 起始位置
	 * @param toLoc 目标位置
	 * @param duration 持续时间
	 * @param fun 到达后的执行的方法
	 */
	public cameraMoveTween(originLoc: mw.Vector, toLoc: mw.Vector, duration: number, fun: Function) {
		this.camera.localTransform = new mw.Transform(
			originLoc,
			this.camera.localTransform.clone().rotation,
			this.camera.localTransform.clone().scale
		);
		let newPos = mw.Vector.zero;
		this.tween = new Tween(this.camera.localTransform.clone().position)
			.to({ x: toLoc.x, y: toLoc.y, z: toLoc.z }, duration * 1000)
			.start()
			.onUpdate(loc => {
				newPos.x = loc.x;
				newPos.y = loc.y;
				newPos.z = loc.z;
				this.camera.localTransform = new mw.Transform(
					newPos,
					this.camera.localTransform.clone().rotation,
					this.camera.localTransform.clone().scale
				);
			})
			.onComplete(() => {
				fun();
				this.tween = null;
			});
	}

	
	/**重置所有相机 */
	public resetAllCamera() {
		if (this.tween != null) {
			this.tween.stop();
		}
		if (this.rotationTime != null) {
			clearTimeout(this.rotationTime);
			this.rotationTime = null;
		}
		this.cameraPlayerReset();
		this.camera.springArm.collisionEnabled = true;
		ModifiedCameraSystem.resetOverrideCameraRotation();
		this.camera.springArm.length = this.cameraBornLength;
		this.camera.localTransform = this.relTransform;
		this.localPlayer.character.maxWalkSpeed = this.playerWalkSpeed;
		this.camera.positionMode = mw.CameraPositionMode.PositionFollow;
		this.tempObj.worldTransform.position.add(this.tempObj.worldTransform.getForwardVector());
		ModifiedCameraSystem.cancelCameraFollowTarget();
		Camera.currentCamera.springArm.localTransform = GlobalData.cameraSystemRelativeTransform.clone();
		this.cameraRot = null;
	}


}

export class CameraModuleS extends ModuleS<CameraModuleC, null> {

}
