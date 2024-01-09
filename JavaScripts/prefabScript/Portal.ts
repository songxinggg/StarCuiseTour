import { ModifiedCameraSystem,CameraModifid, } from '../Modified027Editor/ModifiedCamera';
import GameUtils from "../utils/GameUtils"
@Component
export default class Portal extends mw.Script {
    private _effect: mw.Effect
    private _trriger: mw.Trigger
    public _targetLoc: mw.Vector
    public _targetRot: mw.Rotation
    public spawn() {
        if (!this._effect) this._effect = this.gameObject.getChildByName("特效") as mw.Effect
        if (!this._trriger) {
            this._trriger = this.gameObject.getChildByName("触发器") as mw.Trigger
            this._trriger.onEnter.add((obj: mw.GameObject) => {
                const player = Player.localPlayer
                const camera = Camera.currentCamera;
                if (GameUtils.isPlayerCharacter(obj)) {
                    if (this._targetLoc && this._targetLoc) {
                        player.character.worldTransform.rotation = this._targetRot
                        player.character.worldTransform.position = this._targetLoc
                        ModifiedCameraSystem.setOverrideCameraRotation(this._targetRot)
                        setTimeout(() => {
                            ModifiedCameraSystem.resetOverrideCameraRotation()
                        }, 100);
                    }
                }
            })
        }
        this._trriger.enabled = (true)
        this._effect.play()
    }

    public despawn() {
        this._effect.stop()
        this._trriger.enabled = (false)
    }

    public setTargetLocRot(loc: mw.Vector, rot: mw.Rotation) {
        this._targetLoc = loc
        this._targetRot = rot;
    }
}