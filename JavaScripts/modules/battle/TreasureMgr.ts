import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager,SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import {  SoundManager } from "../../ExtensionType";
import { GameConfig } from "../../config/GameConfig";
import { EventsName } from "../../const/GameEnum";
import { Asset } from "../../const/GlobalData";
import GameUtils from "../../utils/GameUtils";
import { BagModuleC } from "../bag/BagModuleC";
import PartyModuleC from "../party/PartyModuleC";

enum TreasureEnum {
    Gold = 1,
    Cake = 2,
}

@Component
export default class TreasureMgr extends mw.Script {

    private _treasureMap: Map<TreasureEnum, Map<number, mw.GameObject>> = new Map([[TreasureEnum.Cake, new Map()], [TreasureEnum.Gold, new Map()]]);

    private _treasurePosMap: Map<TreasureEnum, Map<number, string>> = new Map([[TreasureEnum.Cake, new Map()], [TreasureEnum.Gold, new Map()]]);

    private _treasurePool: Map<string, mw.GameObject[]> = new Map();


    private _loseListMap: Map<TreasureEnum, number[]> = new Map([[TreasureEnum.Cake, []], [TreasureEnum.Gold, []]]);


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        setTimeout(() => {
            if (SystemUtil.isServer()) {
                this.spwanPool(TreasureEnum.Cake)
                this.spwanPool(TreasureEnum.Gold)
            }

            this.init();
        }, 5000);


    }

    private async spwanPool(treasure: TreasureEnum) {
        let configs
        let guid
        switch (treasure) {
            case TreasureEnum.Cake:
                configs = GameConfig.CakePos
                guid = cakeGuid
                break;
            case TreasureEnum.Gold:
                configs = GameConfig.GoldPos
                guid = goldGuid
                break;

            default:
                break;
        }
        const maxCount = configs.getElement(1).maxcount

        for (let i = 0; i < maxCount; i++) {
            if (!this._treasurePool.has(guid)) {
                this._treasurePool.set(guid, [])
            }
            let arr = this._treasurePool.get(guid)
            const prefab = await SpawnManager.asyncSpawn({ guid: guid })
            prefab.worldTransform.position = new mw.Vector(0, 0, 0)
            arr.push(prefab);
        }

    }



    private async init() {
        if (SystemUtil.isClient()) {
            //this.spwanTrigger()
            await this.spwanTrigger();
        } else {
            Event.addClientListener(EventsName.EatTreasure, (player: mw.Player, guid: string, type: TreasureEnum) => {
                this.onEatTreasure(guid, type);
            })
            setTimeout(() => {
                this.spwanRandomPosIndex(TreasureEnum.Cake)
                this.spwanRandomPosIndex(TreasureEnum.Gold)
            }, 1000)

        }
    }

    //======================================client======================================+

    private trigger: mw.Trigger;
    private async spwanTrigger() {
        if (!this.trigger) {
            this.trigger = await SpawnManager.asyncSpawn({ guid: "Trigger" }) as mw.Trigger;
            this.trigger.onEnter.add((go: mw.GameObject) => {
                if (go && !StringUtil.isEmpty(go.tag)) {
                    let type: TreasureEnum
                    let has = false;
                    if (go.tag == "Cake") {
                        type = TreasureEnum.Cake
                        has = true;
                        ModuleService.getModule(PartyModuleC).onEatCake()
                    } else if (go.tag == "Gold") {
                        type = TreasureEnum.Gold
                        has = true;
                        ModuleService.getModule(BagModuleC).addItem(90006)
                    }
                    if (has) {
                        GeneralManager.rpcPlayEffectAtLocation(Asset.speedUpEffect, go.worldTransform.position)
                        SoundManager.playSound(Asset.pickMusic)
                        Event.dispatchToServer(EventsName.EatTreasure, go.parent?.gameObjectId, type)
                    }
                }
            })
            this.trigger.parent = (await Player.asyncGetLocalPlayer()).character;
            this.trigger.localTransform.position = (mw.Vector.zero);
            this.trigger.worldTransform.scale = new mw.Vector(1, 1, 1.5);
        }

    }





    //======================================server======================================

    /**开局随机生成蛋糕位置 */
    private async spwanRandomPosIndex(type: TreasureEnum) {

        let configs
        let guid
        switch (type) {
            case TreasureEnum.Cake:
                configs = GameConfig.CakePos
                guid = cakeGuid
                break;
            case TreasureEnum.Gold:
                configs = GameConfig.GoldPos
                guid = goldGuid
                break;

            default:
                break;
        }


        let arr: number[] = []
        configs.getAllElement().forEach(item => {
            arr.push(item.ID)
        })

        let _currentTreasureList: number[] = []
        GameUtils.shuffleCards(arr);

        for (let i = 0; i < configs.getElement(1).maxcount; i++) {
            _currentTreasureList.push(arr.shift())
            let prefab
            if (this._treasurePool.get(guid).length > 0) {
                prefab = this._treasurePool.get(guid).pop();
            } else {
                prefab = await SpawnManager.asyncSpawn({ guid: guid, replicates: true })
            }
            this._treasureMap.get(type).set(_currentTreasureList[i], prefab)
            this._treasurePosMap.get(type).set(_currentTreasureList[i], guid);
            prefab.worldTransform.position = (configs.getElement(_currentTreasureList[i]).pos.clone())

        }
        this._loseListMap.set(type, arr);

    }

    /**拾取宝物 */
    async onEatTreasure(treasureguid: string, type: TreasureEnum) {
        let treasure: mw.GameObject;

        let keys: number
        this._treasureMap.get(type).forEach((value, key) => {
            if (value.gameObjectId == treasureguid) {
                keys = key;
                treasure = value;
            }
        })
        if (keys && treasure) {
            //====================================上一个道具归还==================================
            this._treasureMap.get(type).delete(keys);
            const guid = this._treasurePosMap.get(type).get(keys)
            this._treasurePool.get(guid).push(treasure); //归还对象池
            treasure.worldTransform.position = new mw.Vector(0, 0, 0)


            //==============================下一个道具的位置和种类===========================
            const nextIndex = MathUtil.randomInt(0, this._loseListMap.get(type).length)
            const nextId = this._loseListMap.get(type)[nextIndex]   //下一个位置ID

            let prefab
            if (this._treasurePool.get(guid).length > 0) {
                prefab = this._treasurePool.get(guid).pop();
            } else {
                prefab = await SpawnManager.asyncSpawn({ guid: guid, replicates: true });
            }
            let configs
            switch (type) {
                case TreasureEnum.Cake:
                    configs = GameConfig.CakePos
                    break;
                case TreasureEnum.Gold:
                    configs = GameConfig.GoldPos
                    break;

                default:
                    break;
            }
            prefab.worldTransform.position = (configs.getElement(nextId).pos.clone())

            this._loseListMap.get(type)[nextIndex] = keys;  //更新没有的列表
            this._treasureMap.get(type).set(nextId, prefab);
            this._treasurePosMap.get(type).set(nextId, guid);
        }

    }


}

const cakeGuid = "72EC29044480BD9ECA4FD7AD9D20CB23"
const goldGuid = "6D43371A4474B6AC02D031AE11D5B2AB"
