import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../../config/GameConfig";
import { RunState } from "../../../const/GameEnum";
import { EffectManager, getMyCharacterGuid, SoundManager } from "../../../ExtensionType";
import { ResManager } from "../../../ResManager";
import Tips from "../../../ui/commonUI/Tips";
import GameUtils from "../../../utils/GameUtils";
import { CameraModuleC } from "../../camera/CameraModule";
import { GameModuleC } from "../../gameModule/GameModuleC";
import Game_HUDUI from "../../gameModule/ui/Game_HUDUI";
import PartyModuleC from "../../party/PartyModuleC";
import ObjectSkill from "../../skill/logic/ObjectSkill";
import SkillMgr from "../../skill/SkillMgr";
import { ModuleBaseC, ModuleBaseS } from "../base/ModuleBase";
import { registerModule } from "../managers/ModuleManager";
import PlayerManager from "../managers/PlayerManager";
import FacadMainUI from "../ui/cloth/FacadMainUI";
import FacadTipUI from "../ui/cloth/FacadTipUI";
export enum EmFacadPart {
    /**套装 */
    Suit = 0,
    /**上衣 */
    BodyUpper = 1,
    /**下衣 */
    BodyLower,
    /**前发 */
    HairFront,
    /**后发 */
    HairBack,
    /**手套 */
    Gloves,
    /**鞋子 */
    Shoe,
}
export enum ClothEvent {
    net_CreateStaticModel = "net_CreateStaticModel",
    net_ClearModel = "net_ClearModel",
    net_CreateEffect = "net_CreateEffect",
    net_ClearEffect = "net_ClearEffect",
    net_SaveFacadIDs = "net_SaveFacadIDs",
    net_BuyFacadByID = "net_BuyFacadByID",
    net_HenShinOther = "net_HenShinOther",
}

@registerModule(RunState.Client)
export class ClothModuleC extends ModuleBaseC {
    private _clothUI: FacadMainUI
    private _defaultEquipGuid: string[] = []
    private _lookHuman: mw.Character;
    private _effectIDs: Map<number, { effect: number, configID: number }> = new Map();
    private _models: Map<number, { model: mw.GameObject, configID: number }> = new Map();
    private _tempEquipData: number[] = []

    public isHenShin: boolean = false
    public onEnterScene(sceneType: number): void {
        GameObject.asyncFindGameObjectById("3E97EDEF").then((human) => {
            this._lookHuman = human as mw.Character
            this._lookHuman.displayName = ""
            mw.AccountService.downloadData(this._lookHuman);
        })

        setTimeout(() => {
            this.checkHeight()
            if (this._defaultEquipGuid && this._defaultEquipGuid.length < 1)
                this.configChangeCloth()
        }, 4000);
        this._clothUI = UIManager.getUI(FacadMainUI)
        let gameHud = UIManager.getUI(Game_HUDUI)
        gameHud.mBtnCloth.onClicked.add(() => {
            this.resetPlayerCloth()
        })
        gameHud.mBtnChange.onClicked.add(() => {
            this.showClothUI()
        });
        this.eventInit()
    }

    private eventInit() {
        Event.addServerListener(ClothEvent.net_HenShinOther, async (guid: string) => {
            await GameUtils.downAsset(guid)
            this.henShinSkill(guid, 10)
        })
    }

    public async configChangeCloth() {
        for (let i = 0; i < this.data.equipID.length; i++) {
            const id = this.data.equipID[i]
            const config = GameConfig.RoleAvatar.getElement(id);
            if (config && this._tempEquipData[config.type] != id) {
                await this.changeRoleAvatar(this.data.equipID[i])
            }
        }
        this.getDefalutEquipID()
        this.saveAvatarData()
    }

    public meshChangeCloth(meshArr: string[]) {
        const v2 = this.currentPlayer.character.getDescription()
        toolKey.forEach((value, key) => {
            const meshGuid = meshArr[key]
            const mesh = v2[value]
            mesh.setMesh(meshGuid)
        });
        this.currentPlayer.character.syncDescription()
    }

    public getDefalutEquipID(): string[] {
        const v2 = this.currentPlayer.character.getDescription()
        // toolKey.forEach((value, key) => {
        //     this._defaultEquipGuid[key] = v2[value].style
        // });
        return this._defaultEquipGuid
    }

    public setDefalutEquipID(meshArr: string[]) {
        this._defaultEquipGuid = meshArr
        this.meshChangeCloth(this._defaultEquipGuid)
    }

    public async resetPlayerCloth() {
        const iswatch = ModuleService.getModule(PartyModuleC).isWatch;
        if (iswatch) { 
            Tips.show(GameUtils.getTxt("Text_Text_986"))
            return;
        }
        this.isHenShin = false;
        let skill = SkillMgr.Inst.findSkill(9001, getMyCharacterGuid()) as ObjectSkill
        skill.henRemove();
        PlayerManager.instance.setPlayerTitleVis(this.currentPlayer,mw.PropertyStatus.On)
        this.currentPlayer.character.description.advance.base.characterSetting.somatotype
        mw.AccountService.downloadData(this.currentPlayer.character);
        mw.AccountService.downloadData(this._lookHuman);
        this._tempEquipData.length = 0
        this.saveAvatarData()
        setTimeout(() => { this.checkHeight() }, 2000);

        if (this._clothUI.visible) this._lookHuman.worldTransform.rotation = this._initRotation
    }

    private checkHeight() {
        let char = Player.localPlayer.character;
        let humanV2 = char.description.advance.base.characterSetting.somatotype
        if (humanV2 && char.description.advance.bodyFeatures.body.height > 1.05) {
            char.description.advance.bodyFeatures.body.height = 1.05, false;
            //char.capsuleCorrectionEnabled = true;
        }
    }

    private _initRotation: mw.Rotation = new mw.Rotation(0, 0, -20)
    public showClothUI() {
        const iswatch = ModuleService.getModule(PartyModuleC).isWatch;
        if (iswatch) { 
            Tips.show(GameUtils.getTxt("Text_Text_987"))
            return;
        }
        if (this.isHenShin) {
            Tips.show(GameUtils.getTxt("Text_Text_988"))
            return;
        }
        if (!this._clothUI.visible) {
            UIManager.showUI(this._clothUI)
            this._lookHuman.worldTransform.rotation = mw.Rotation.zero
            ModuleService.getModule(CameraModuleC).facadPlayerRotation(true, this._lookHuman, 160, -130, -20)
            this._lookHuman.worldTransform.rotation = this._initRotation
        }
    }

    public hideClothUI() {
        UIManager.hideUI(this._clothUI)
        ModuleService.getModule(CameraModuleC).facadPlayerRotation(false)
    }

    public addRoatation(dir: number) {
        if (this._lookHuman) {
            this._lookHuman.worldTransform.rotation = this._lookHuman.worldTransform.rotation.add(new mw.Rotation(0, 0, -20 * dir))
        }
    }

    public hasSuit(configID: number): boolean {
        return this.data.allSuit.includes(configID)
    }

    public hasSelect(configID: number): boolean {
        return this._tempEquipData.includes(configID)
    }

    /**
     * @description: 假人的换装
     * @param {number} id
     * @param {boolean} isSelect
     * @return {*}
     */
    public async changeRoleAvatar(id: number, isSelect: boolean = false) {
        if (!id || id == 0) return;
        const v2 = this._lookHuman.description
        const config = GameConfig.RoleAvatar.getElement(id);
        if (config) {
            //如果是套装，就全卸下换套装
            if (config.suit && config.suit.length > 0) {
                this._tempEquipData = []
            }
            //如果换的是已经装扮上的，就卸下
            if (this._tempEquipData[config.type] != id) {
                this._tempEquipData[config.type] = id
            } else {
                this._tempEquipData[config.type] = 0
            }

            if (config.mainType == 0) {
                const partList: { type: EmFacadPart, value: string }[] = []

                if (config.suit) {
                    partList.push({ type: EmFacadPart.Suit, value: config.suit })
                }
                if (config.upWear) {
                    partList.push({ type: EmFacadPart.BodyUpper, value: config.upWear })
                }
                if (config.underWear) {
                    partList.push({ type: EmFacadPart.BodyLower, value: config.underWear })
                }
                if (config.hairfront) {
                    partList.push({ type: EmFacadPart.HairFront, value: config.hairfront })
                }
                if (config.hairlate) {
                    partList.push({ type: EmFacadPart.HairBack, value: config.hairlate })
                }
                if (config.gloves) {
                    partList.push({ type: EmFacadPart.Gloves, value: config.gloves })
                }
                if (config.shoe) {
                    partList.push({ type: EmFacadPart.Shoe, value: config.shoe })
                }
                if (v2 && partList.length > 0) {
                    for (let i = 0; i < partList.length; i++) {
                        const type = partList[i].type;
                        let value = this._defaultEquipGuid[type]
                        if (this._tempEquipData[config.type] && this._tempEquipData[config.type] != 0) {
                            value = partList[i].value;
                        }
                        await GameUtils.downAsset(value)
                        if (value.length < 10) {
                            const mesh = v2[toolKey.get(type)]
                            if (value != "" && value != null) {
                                mesh.setMesh(value)
                            }
                        } else {
                            this._lookHuman.setDescription([value])
                        }
                    }
                }
            } else if (config.mainType == 1) {
                let model: mw.GameObject = null
                if (this._models.has(config.type) || this._tempEquipData[config.type] == 0) {
                    ResManager.instance.destoryObj(this._models.get(config.type).model)
                    this._models.delete(config.type)
                }
                if (this._tempEquipData[config.type] != 0) {
                    model = await ResManager.instance.spawnObjOnCharacter(this._lookHuman, config.modelIDs[0])
                    this._models.set(config.type, { model: model, configID: this._tempEquipData[config.type] })
                }
            } else if (config.mainType == 2) {
                let effectID: number = 0
                if (this._effectIDs.has(config.type) || this._tempEquipData[config.type] == 0) {
                    EffectService.stop(this._effectIDs.get(config.type).effect)
                    this._effectIDs.delete(config.type)
                }
                if (this._tempEquipData[config.type] != 0) {
                    effectID = ResManager.instance.playEffectOnPlayer(this._lookHuman, config.effectIDs[0])
                }
                this._effectIDs.set(config.type, { effect: effectID, configID: this._tempEquipData[config.type] })
            }
            if (config.changeEffect && isSelect) {
                SoundManager.stopSound("124713");
                SoundManager.playSound("124713");
                ResManager.instance.playEffectOnPlayer(this._lookHuman, config.changeEffect)
            }
        }
    }

    public buyCurSelect(configID: number, isForce: boolean = false, uiTip: boolean = true): boolean {
        if (this.hasSuit(configID)) return false;
        if (configID && configID > 0) {
            const config = GameConfig.RoleAvatar.getElement(configID)
            if (config) {
                if (!isForce) {
                    //Tips.show("该物品需要参与活动才能获得")
                    return false;
                }
                this.data.buySuit(configID)
                if (!this._clothUI.visible) UIManager.getUI(Game_HUDUI).mNewCloth.visibility = mw.SlateVisibility.SelfHitTestInvisible
                Event.dispatchToServer(ClothEvent.net_BuyFacadByID, configID)
                if (uiTip) UIManager.show(FacadTipUI, 2, configID)
                return true
            }
        }
        return false
    }

    public buySelectCart(): { result: boolean, notBuyArr: number[] } {
        let bool = false
        const notBuyArr: number[] = []
        for (let i = 0; i < this._tempEquipData.length; i++) {
            const equip = this._tempEquipData[i];
            if (equip && !this.hasSuit(equip)) {
                notBuyArr.push(equip)
                bool = true;
            }
        }
        return { result: bool, notBuyArr: notBuyArr };
    }


    /**
     * @description: 同步到服务器并真人换装
     * @return {*}
     */
    public async saveAvatarData() {
        this.data.saveEquips(this._tempEquipData)
        Event.dispatchToServer(ClothEvent.net_SaveFacadIDs, this._tempEquipData, this._defaultEquipGuid)
    }

    public henShinSkill(guid: string, henShinTime?: number) {
        this.isHenShin = true;
        this.currentPlayer.character.description.base.wholeBody = ("154704");     
        PlayerManagerExtesion.changeBaseStanceExtesion(this.currentPlayer.character,"154704")
        let tappearance = this.currentPlayer.character
        // tappearance.description.advance.base.characterSetting.somatotype = (mw.SomatotypeV1.HumanoidV1Eggy)
        // tappearance.description.base.wholeBody = (guid, true);
        if (henShinTime) {
            setTimeout(() => {
                this.isHenShin = false;
                this.resetPlayerCloth()
            }, henShinTime * 1000);
        }
    }

    public henShinOther(guid: string, player: mw.Player) {
        Event.dispatchToServer(ClothEvent.net_HenShinOther, guid, player.playerId)
    }


    public async henShinModel(modelId: number) {
        this.isHenShin = true;
        PlayerManager.instance.setPlayerVis(this.currentPlayer, mw.PropertyStatus.Off, false)
        setTimeout(async () => {
            await this.createStaticModel([modelId])
        }, 500);
        
    }

    /**创建静态模型 */
    public async createStaticModel(modelIDs: number[], isSny: boolean = true, isCloth: boolean = false) {
        for (let i = 0; i < modelIDs.length; i++) {
            await GameUtils.downAsset(GameConfig.Model.getElement(modelIDs[i]).ModelGuid)
        }
        if (isSny) Event.dispatchToServer(ClothEvent.net_CreateStaticModel, modelIDs, isCloth)
    }

    public clearModel(modelID: number) {
        Event.dispatchToServer(ClothEvent.net_ClearModel, modelID)
    }

    /**创建一个特效 */
    public async createEffect(effectIDs: number[], isSny: boolean = true, isCloth: boolean = false) {
        for (let i = 0; i < effectIDs.length; i++) {
            await GameUtils.downAsset(GameConfig.Effect.getElement(effectIDs[i]).EffectID)
        }
        if (isSny) Event.dispatchToServer(ClothEvent.net_CreateEffect, effectIDs, isCloth)
    }

    public clearEffect(effectID: number[], isSny: boolean = true) {
        if (isSny) Event.dispatchToServer(ClothEvent.net_ClearEffect, effectID)
    }
}

@registerModule(RunState.Server)
export class ClothModuleS extends ModuleBaseS {
    /**存储玩家对应的特效ID */
    private _savePlayerEffect: Map<number, { type: number, isCloth: boolean, effectID: number, effect: number }[]> = new Map();
    /**存储玩家对应的静态模型ID */
    private _savePlayerModel: Map<number, { type: number, isCloth: boolean, modelID: number, obj: mw.GameObject }[]> = new Map();
    private _tempEquipData: number[] = []
    private _defaultEquipGuid: string[] = []
    onStart() {
        this.eventInit()
    }

    private eventInit() {
        Event.addClientListener(ClothEvent.net_CreateStaticModel, (player: mw.Player, modelIDs: number[], isCloth: boolean) => {
            this.net_CreateStaticModel(player.playerId, modelIDs, isCloth)
        })

        Event.addClientListener(ClothEvent.net_ClearModel, (player: mw.Player, modelID: number) => {
            this.net_ClearModel(player.playerId, modelID)
        })

        Event.addClientListener(ClothEvent.net_CreateEffect, (player: mw.Player, effectIDs: number[], isCloth: boolean) => {
            this.net_CreateEffect(player.playerId, effectIDs, isCloth)
        })

        Event.addClientListener(ClothEvent.net_ClearEffect, (player: mw.Player, effectID: number[]) => {
            this.net_ClearEffect(player.playerId, effectID)
        })

        Event.addClientListener(ClothEvent.net_HenShinOther, (player: mw.Player, guid: string, playerID: number) => {
            Event.dispatchToClient(Player.getPlayer(playerID), ClothEvent.net_HenShinOther, guid)
        })

        Event.addClientListener(ClothEvent.net_SaveFacadIDs, (player: mw.Player, facadIDs: number[], equipGuid: string[]) => {
            try {
                const v2 = player.character.getDescription()
                this._defaultEquipGuid = equipGuid
                for (let i = 0; i < facadIDs.length; i++) {
                    if (facadIDs[i] != this._tempEquipData[i]) {
                        if (facadIDs[i] == 0) {
                            this.saveAvatarData(v2, this._tempEquipData[i], player)
                        } else {
                            this.saveAvatarData(v2, facadIDs[i], player)
                        }
                    }
                }
                player.character.syncDescription()
                this.getPlayerData(player)?.saveEquips(facadIDs)
            }
            catch (e) {
                console.error("服务器换装报错")
            }
        })

        Event.addClientListener(ClothEvent.net_BuyFacadByID, (player: mw.Player, facadID: number) => {
            try {
                this.getPlayerData(player)?.buySuit(facadID)
            }
            catch (e) {
                console.error("服务器买衣服报错")
            }
        })
    }

    public onPlayerEnterGame(player: mw.Player): void {
        this._savePlayerEffect.set(player.playerId, []);
        this._savePlayerModel.set(player.playerId, []);
    }

    public onPlayerLeft(player: mw.Player): void {
        let pid = player?.playerId
        this.net_ClearAllCloth(pid, false);
        this._savePlayerEffect.delete(pid);
        this._savePlayerModel.delete(pid);
    }

    /**
     * @description: 真人的换装
     * @param {boolean} isSny 是否同步到233服务器
     * @return {*}
     */
    private saveAvatarData(v2: any, id: number, player: mw.Player) {
        if (id == undefined) return;
        const config = GameConfig.RoleAvatar.getElement(id);
        const playerID = player.playerId
        if (config) {
            //如果是套装，就全卸下换套装
            if (config.suit && config.suit.length > 0) {
                this._tempEquipData = []
            }
            //如果换的是已经装扮上的，就卸下
            if (this._tempEquipData[config.type] != id) {
                this._tempEquipData[config.type] = id
            } else {
                this._tempEquipData[config.type] = 0
            }
            if (config.mainType == 0) {
                const partList: { type: EmFacadPart, value: string }[] = []

                if (config.suit) {
                    partList.push({ type: EmFacadPart.Suit, value: config.suit })
                }
                if (config.upWear) {
                    partList.push({ type: EmFacadPart.BodyUpper, value: config.upWear })
                }
                if (config.underWear) {
                    partList.push({ type: EmFacadPart.BodyLower, value: config.underWear })
                }
                if (config.hairfront) {
                    partList.push({ type: EmFacadPart.HairFront, value: config.hairfront })
                }
                if (config.hairlate) {
                    partList.push({ type: EmFacadPart.HairBack, value: config.hairlate })
                }
                if (config.gloves) {
                    partList.push({ type: EmFacadPart.Gloves, value: config.gloves })
                }
                if (config.shoe) {
                    partList.push({ type: EmFacadPart.Shoe, value: config.shoe })
                }
                if (v2 && partList.length > 0) {
                    for (let i = 0; i < partList.length; i++) {
                        const type = partList[i].type;
                        let value = this._defaultEquipGuid[type]
                        if (this._tempEquipData[config.type] && this._tempEquipData[config.type] != 0) {
                            value = partList[i].value
                        }
                        if (value.length < 10) {
                            const mesh = v2[toolKey.get(type)]
                            if (value != "" && value != null) {
                                mesh.setMesh(value)
                            }
                        } else {
                            v2.setDescription([value])
                        }
                    }
                }
            } else if (config.mainType == 1) {
                if (this._tempEquipData[config.type] == 0) {
                    for (const modelID of config.modelIDs) {
                        this.net_ClearModel(playerID, modelID)
                    }
                } else {
                    const modelArr = this._savePlayerModel.get(playerID);
                    for (const arr of modelArr) {
                        if (arr.type == config.type) {
                            this.net_ClearModel(playerID, arr.modelID)
                        }
                    }
                    this.net_CreateStaticModel(playerID, config.modelIDs, true, config.type)
                }
            } else if (config.mainType == 2) {
                if (this._tempEquipData[config.type] == 0) {
                    this.net_ClearEffect(playerID, config.effectIDs)
                } else {
                    const effectArr = this._savePlayerEffect.get(playerID);
                    for (const arr of effectArr) {
                        if (arr.type == config.type) {
                            this.net_ClearEffect(playerID, [arr.effectID])
                        }
                    }
                    this.net_CreateEffect(playerID, config.effectIDs, true, config.type)
                }
            }
        }
    }

    public async net_CreateStaticModel(playerID: number, modelIDs: number[], isCloth: boolean = true, type: number = 0) {
        let char = Player.getPlayer(playerID).character;
        for (let i = 0; i < modelIDs.length; i++) {
            const modelID = modelIDs[i];
            if (!this._savePlayerModel.has(playerID)) {
                this._savePlayerModel.set(playerID, []);
            }
            let modelArr = this._savePlayerModel.get(playerID);

            let modelObj = await ResManager.instance.spawnObjOnCharacter(char, modelID)
            if (modelObj) {
                modelArr.push({ type: type, isCloth: isCloth, modelID: modelID, obj: modelObj })
            }
        }
    }

    public net_CreateEffect(playerId: number, effectIDs: number[], isCloth: boolean = true, type: number = 0) {
        for (const effID of effectIDs) {
            let effectID = ResManager.instance.playEffectOnPlayer(Player.getPlayer(playerId), effID)
            if (!this._savePlayerEffect.has(playerId)) {
                this._savePlayerEffect.set(playerId, []);
            }

            let effArr = this._savePlayerEffect.get(playerId);
            if (effectID) {
                effArr.push({ type: type, isCloth: isCloth, effectID: effID, effect: effectID })
            }
        }
    }

    public net_ClearEffect(playerId: number, effectID: number[]) {
        if (this._savePlayerEffect.has(playerId)) {
            const effectArr = this._savePlayerEffect.get(playerId)
            for (const effID of effectID) {
                for (let i = 0; i < effectArr.length; i++) {
                    const effect = effectArr[i];
                    if (effID == effect.effectID) {
                        EffectService.stop(effect.effect);
                        effectArr.splice(i, 1)
                        break;
                    }
                }
            }
        }
    }

    public net_ClearModel(playerId: number, modelID: number) {
        if (this._savePlayerModel.has(playerId)) {
            const modelArr = this._savePlayerModel.get(playerId)
            for (let i = 0; i < modelArr.length; i++) {
                const model = modelArr[i];
                if (modelID == model.modelID && model.obj) {
                    ResManager.instance.destoryObj(model.obj)
                    modelArr.splice(i, 1)
                    return;
                }
            }
        }
    }

    /**
     * @description: 清除所有绑定
     * @param {number} playerId
     * @return {*}
     */
    public net_ClearAllCloth(playerId: number, isCloth: boolean = true) {
        if (this._savePlayerModel.has(playerId)) {
            const models = this._savePlayerModel.get(playerId)
            const effects = this._savePlayerEffect.get(playerId)
            if (isCloth) {
                for (let i = 0; i < models.length; i++) {
                    const element = models[i];
                    if (element.isCloth) {
                        ResManager.instance.destoryObj(element.obj)
                        models.splice(i, 1)
                        i--;
                    }
                }
                for (let i = 0; i < effects.length; i++) {
                    const element = effects[i];
                    if (element.isCloth) {
                        EffectService.stop(element.effect);
                        effects.splice(i, 1)
                        i--;
                    }
                }
            } else {
                models.forEach((model) => {
                    ResManager.instance.destoryObj(model.obj)
                })
                models.length = 0
                effects.forEach((effect) => {
                    EffectService.stop(effect.effect);
                })
                effects.length = 0
                this._savePlayerEffect.delete(playerId)
                this._savePlayerModel.delete(playerId)
            }
        }
    }
}
const toolKey: Map<EmFacadPart, string> = new Map([
    [EmFacadPart.BodyUpper, "upperCloth"],
    [EmFacadPart.BodyLower, "lowerCloth"],
    [EmFacadPart.HairFront, "frontHair"],
    [EmFacadPart.HairBack, "behindHair"],
    [EmFacadPart.Gloves, "gloves"],
    [EmFacadPart.Shoe, "shoe"],
]);