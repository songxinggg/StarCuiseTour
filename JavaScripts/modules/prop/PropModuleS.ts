import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { GameConfig } from "../../config/GameConfig";
import { IPropActionElement } from "../../config/PropAction";
import { IPropFlyElement } from "../../config/PropFly";
import { IPropPlacementElement } from "../../config/PropPlacement";
import { EventsName } from "../../const/GameEnum";
import { SoundManager } from "../../ExtensionType";
import GameUtils from "../../utils/GameUtils";
import { PropBaseModuleS } from "../squareBase/PropBase/PropBaseModule";
import { PrefabObject } from "./PrefabObject";
import { PropModuleC } from "./PropModuleC";

export class PropModuleS extends PropBaseModuleS<PropModuleC, null>{
    private _effectMap: Map<number, number> = new Map();
    private _soundMap: Map<number, number> = new Map();
    private _prefabPoolMap: Map<string, PrefabObject[]> = new Map()
    private _callClientArr: any[] = []

    onStart(): void {
        super.onStart();

        Event.addClientListener(EventsName.LoadProp, (player: mw.Player, prop: number) => {
            if (!prop) {
                return
            }
            const playerId = player.playerId;
            this.equipProp(prop, playerId);
        })

        Event.addClientListener(EventsName.UnloadProp, (player: mw.Player, prop: number) => {
            if (!prop) {
                return
            }
            const playerId = player.playerId;
            this.unLoadProp(prop, playerId);
        })
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.unLoadProp(10001, player.playerId)
    }

    addModuleFun(playerId: any, otherId: any) {
        // throw new Error("Method not implemented.");
    }

    getActionPropData(ConfigID: number): IPropActionElement {
        return GameConfig.PropAction.getElement(ConfigID);;
    }
    getFlyPropData(ConfigID: number): IPropFlyElement {
        return GameConfig.PropFly.getElement(ConfigID);
    }
    getPlacementData(ConfigID: number): IPropPlacementElement {
        return GameConfig.PropPlacement.getElement(ConfigID);
    }

    equipOtherProp(propID: number, playerId: number): Object {
        // 开启相机
        return;
    }

    unLoadOtherProp(otherProp: any, playerId: number): void {

    }

    /** 
     * 生成物体对象
     * @param  guid
     * @param  player
     * @return 
     */
    public async net_SpawnPrefab(guid: string, time: number, loc: mw.Vector, isClient: boolean, player?: mw.Player) {
        if (!player) return;
        if (isClient) {
            const playerArr: mw.Player[] = Player.getAllPlayers();
            for (let i = 0; i < playerArr.length; i++) {
                const element = playerArr[i];
                if (element.playerId == player.playerId) continue;
                if (GameUtils.inDistance(loc, element.character.worldTransform.position, 3000)) {
                    this._callClientArr.push(() => { this.getClient(element).net_SpawnPrefab(guid, time, loc) })
                }
            }
        } else {
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
            await prefab.spawn(time, false, player.character.worldTransform.getForwardVector().multiply(-1).toRotation());
            prefab.obj.worldTransform.position = loc
            if (objPool.length >= 30) {
                console.error(guid + "造物超过了" + objPool.length)
            }
        }
    }

    /** 
     * 播放特效
     * @param  source
     * @param  slotType
     * @param  loop
     * @param  offset
     * @param  rotation
     * @param  scale
     * @param  player
     * @return 
     */
    net_PlayEffect(source: string, slotType: mw.HumanoidSlotType, loop?: number, offset?: mw.Vector, rotation?: mw.Rotation, scale?: mw.Vector, player?: mw.Player) {
        const playerId = player.playerId
        if (this._effectMap.has(playerId)) {
            const effect = this._effectMap.get(playerId)
            EffectService.stop(effect)
        }
        const effect = GeneralManager.rpcPlayEffectOnPlayer(source, player, slotType, loop, offset, rotation, scale)
        this._effectMap.set(playerId, effect);
    }

    /** 
     * 停止特效
     * @param  player
     * @return 
     */
    net_StopEffect() {
        const playerId = this.currentPlayer.playerId
        if (this._effectMap.has(playerId)) {
            const effect = this._effectMap.get(playerId)
            EffectService.stop(effect)
            this._effectMap.delete(playerId)
        }
    }

    /** 
     * 播放音效
     * @param  resId
     * @param  target
     * @param  loopNum
     * @param  volume
     * @param  playParam
     * @param  player
     * @return 
     */
    net_PlaySound(resId: string, target: string | mw.GameObject | mw.Vector, loopNum?: number, volume?: number, playParam?: string, player?: mw.Player) {
        const playerId = player.playerId
        if (this._soundMap.has(playerId)) {
            const sound = this._soundMap.get(playerId)
            mw.SoundService.stop3DSound(sound)
        }
        let info = playParam ? JSON.parse(playParam) : null;
        const sound = mw.SoundService.play3DSound(resId, target, loopNum, volume, info)
        this._soundMap.set(playerId, sound);
    }

    /** 
     * 停止音效
     * @param  player
     * @return 
     */
    net_StopSound(player?: mw.Player) {
        const playerId = this.currentPlayer.playerId
        if (this._soundMap.has(playerId)) {
            const sound = this._soundMap.get(playerId)
             mw.SoundService.stop3DSound(sound)
            this._soundMap.delete(playerId)
        }
    }

    protected onUpdate(dt: number): void {
        if (this._callClientArr.length > 0) {
            this._callClientArr.pop()();
        }
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