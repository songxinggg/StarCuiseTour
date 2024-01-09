
import InteractObject, { InteractiveHelper } from "./interactLogic/InteractObject";
import InteractMgr from "./InteractMgr";
import { InteractModuleServer } from "./InteractModuleServer";
import { InteractUtilUI } from "./InteractUtilUI";
export class InteractModuleClient extends ModuleC<InteractModuleServer, null>  {
    private _updateIndex: number = 0;
    private _playerLocation: mw.Vector
    onStart(): void {
        InteractMgr.instance.activeHandle = this.activeHandle
        InteractMgr.instance.activeNextHandle = this.activeNextHandle
    }

    protected onEnterScene(sceneType: number): void {
        this.server.net_EnterScene();
        InteractMgr.instance.initInteract()
    }

    public net_UnActiveInteract() {
        // CreditEventsC.endTimekeeper(CreditEvent.RP.Interact, 1);
        let interacts = InteractMgr.instance.findInteract(this.localPlayerId)
        if (interacts.length > 0) {
            for (const interact of interacts) {
                interact.logic.onPlayerAction(this.localPlayerId, false)
            }
        }
    }

    public activeHandle = async (interact: InteractObject, flag: boolean, param?: any) => {
        if (!interact) return
        let err = null
        if (interact.isClient == -1) {
            err = await this.server.net_ActiveHandle(interact.guid, flag, param,this.localPlayer)
        }
        if (flag) {
            if (err != null) {
                console.log("交互失败 error=" + err)
            } else {
                //UIManager.show(InteractUtilUI, interact.gameObject)
                this.playerAction(interact, this.localPlayerId, flag, param)
                if (!StringUtil.isEmpty(interact.gameObject.tag)) {
                    InteractiveHelper.onPandoraAnalytics(interact.gameObject.gameObjectId, interact.gameObject.tag, true, interact.own);
                }
            }
        } else {
            if (err != null) {
                console.log("退出交互失败 error=" + err)
            } else {
                this.playerAction(interact, this.localPlayerId, flag, param)
                if (!StringUtil.isEmpty(interact.gameObject.tag)) {
                    InteractiveHelper.onPandoraAnalytics(interact.gameObject.gameObjectId, interact.gameObject.tag, false, true);
                }
            }
        }
    }

    public activeNextHandle = (interact: InteractObject, flag: boolean, param?: any) => {
        if (interact.nextInteractGuid != "") {
            this.activeHandle(InteractMgr.instance.getInteract(interact.nextInteractGuid), flag, param)
        }
    }

    public playerAction(interact: InteractObject, playerId: number, active: boolean, param?: any) {
        interact.logic.onPlayerAction(playerId, active, param)
        if (interact.nextInteractGuid != "" && !interact.blockInteractNext) {
            this.playerAction(InteractMgr.instance.getInteract(interact.nextInteractGuid), playerId, active, param)
        }
    }

    onUpdate(dt: number): void {
        if (++this._updateIndex % 5 != 0) {
            this._playerLocation = this.localPlayer.character.worldTransform.position;
        }
        InteractMgr.instance.update(this._playerLocation)
    }

}