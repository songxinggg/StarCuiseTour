
import { IPropActionElement } from "../../../config/PropAction";
import { IPropFlyElement } from "../../../config/PropFly";
import { IPropPlacementElement } from "../../../config/PropPlacement";
import GameUtils from "../../../utils/GameUtils";
import { PropBase, PropBase_Action, PropBase_Fly, PropBase_Placement } from "./PropBase";
import { PropHUD_Action, PropHUD_Fly, PropHUD_Placement } from "./PropBaseHUD";
import { mathTools_firstPlaceNumber, mathTools_isEmpty, PropBasePool, PropBaseType } from "./PropTool";

export abstract class PropBaseModuleC<T extends PropBaseModuleS<any, any>, S extends Subdata> extends ModuleC<T, S> {

    protected ui_Placement: PropHUD_Placement = null;
    protected ui_action: PropHUD_Action = null;
    protected ui_fly: PropHUD_Fly = null;
    //当前道具ID
    protected cur_propId: number = null;
    onStart() {
        this.controlAllTypeProp();
        Event.addServerListener("propChangeMesh", async (obj: mw.GameObject, guid: string) => {
            await GameUtils.downAsset(guid);
            (obj as mw.Model).setMaterial(guid)
        });
    }

    /**
     * 道具点击结果
     * @param propId 道具ID
     */
    abstract propClickEnd(propId: number): void;

    /**
     * 控制UI显隐
     * @param propID 道具ID 
     * @param bo 开关
     * @param param1 自定义参数 (动作，放置 --> 按钮图片GUID) (飞行 --> 上升速度)
     * @param param2 自定义参数 (放置 --> CD时间)
     */
    net_ControlPropState(propID: number, bo: boolean, param1?: any, param2?: any): void {
        let curPropId = mathTools_firstPlaceNumber(propID);
        bo == true ? this.cur_propId = propID : this.cur_propId = null;
        switch (curPropId) {
            case PropBaseType.Action:
                bo == true ? this.ui_action.show() : this.ui_action.hide();
                if (mathTools_isEmpty(param1)) {
                    this.ui_action.mBtn.normalImageGuid = String(param1);
                };
                break;
            case PropBaseType.Fly:
                bo == true ? this.ui_fly.show() : this.ui_fly.hide();
                this.ui_fly.flyActive(bo);
                if (mathTools_isEmpty(param1)) {
                    this.ui_fly._goUpSpeed = Number(param1);
                };
                break;
            case PropBaseType.Placement:
                bo == true ? this.ui_Placement.show() : this.ui_Placement.hide();
                if (mathTools_isEmpty(param1)) {
                    this.ui_Placement.mBtn.normalImageGuid = String(param1);
                };
                if (mathTools_isEmpty(param2)) {
                    this.ui_Placement.setBtnCD(Number(param2));
                };
                break;
            default:
                //TODO 新加道具显隐
                break;
        }
    }
    /**
     * 道具总UI控制
     */
    private controlAllTypeProp(): void {
        this.controlActionUI();
        this.controlFlyUI();
        this.controlPlacement();
    }
    /**
     * 控制动作类UI
     */
    private controlActionUI(): void {
        this.ui_action = UIManager.getUI(PropHUD_Action);
        this.ui_action.action.add(() => {
            if (this.cur_propId) {
                this.propClickEnd(this.cur_propId)
            }
            this.server.net_ChangePropState(this.cur_propId);
        });
    }
    /**
     * 控制飞行类UI
     */
    private controlFlyUI(): void {
        this.ui_fly = UIManager.getUI(PropHUD_Fly);
        this.ui_fly.action.add(() => {
            let isActive = !this.ui_fly._isActive;
            this.ui_fly.flyActive(isActive);
            this.server.net_ChangePropState(this.cur_propId, 0, !isActive);
        })
        this.ui_fly.accelerateActionPressed.add(() => {
            this.server.net_ChangePropState(this.cur_propId, 1);
        })
        this.ui_fly.goUpActionPressed.add(() => {
            this.server.net_ChangePropState(this.cur_propId, 2, true);
        })
        this.ui_fly.goUpActionReleased.add(() => {
            this.server.net_ChangePropState(this.cur_propId, 2, false);
        })
    }
    /**
     * 控制放置类UI
     */
    private controlPlacement(): void {
        this.ui_Placement = UIManager.getUI(PropHUD_Placement);
        this.ui_Placement.action.add(() => {
            if (this.ui_Placement.bool_active) {
                this.server.net_ChangePropState(this.cur_propId);
            }
        })
    }
    /**
     * 道具按钮显隐藏
     * @param bo 开关
     */
    public showBtn(bo: boolean) {
        if (!mathTools_isEmpty(bo)) return;
        let curPropId = mathTools_firstPlaceNumber(this.cur_propId);
        switch (curPropId) {
            case PropBaseType.Action:
                bo == true ? this.ui_action.show() : this.ui_action.hide();
                break;
            case PropBaseType.Fly:
                bo == true ? this.ui_fly.show() : this.ui_action.hide();
                break;
            case PropBaseType.Placement:
                bo == true ? this.ui_Placement.show() : this.ui_action.hide();
                break;
        }
    }
}
export abstract class PropBaseModuleS<T extends PropBaseModuleC<any, any>, S extends Subdata> extends ModuleS<T, S>  {
    //广场道具Map
    private propMap: Map<number, PropBase> = new Map<number, PropBase>();
    //其他道具Map
    private otherPropMap: Map<number, any> = new Map<number, any>();

    onStart() {
        super.onStart();
    }
    /**
     * 装备道具
     * @param propId  道具ID
     * @param playerId 玩家ID
     */
    async equipProp(propId: number, playerId: number): Promise<boolean> {
        if (propId < 10000 || propId > 99999) {
            let otherProp = this.equipOtherProp(propId, playerId);
            this.otherPropMap.set(propId, otherProp);
            return true;
        } else {
            let curProp: PropBase = null;
            if (this.propMap.has(playerId)) {
                curProp = this.propMap.get(playerId);
                if (curProp && curProp._id === propId) {
                    return true;
                }
            }
            await this.unLoadProp(propId, playerId);
            let promiseProp = await this.equipPropSwitch(propId, playerId);
            if (!promiseProp) {
                console.error("equipProp,配置表中没有此ID: ", propId);
                return false;
            }
            this.propMap.set(playerId, promiseProp);
            return true;
        }
    }
    /**
     * 卸载道具
     * @param playerId 玩家ID
     */
    async unLoadProp(propId: number, playerId: number): Promise<boolean> {
        try {
            if (propId < 10000 || propId > 99999) {
                let otherProp = this.otherPropMap.get(playerId);
                this.unLoadOtherProp(playerId, otherProp);
                this.otherPropMap.delete(playerId);
                return true;
            } else {
                const curProp = this.propMap.get(playerId);
                if (!curProp) {
                    return
                }
                this.unLoadPropSwitch(curProp, playerId);
                PropBasePool.unSpanProp(curProp);
                this.propMap.set(playerId, null);
                return true;
            }
        }
        catch (e) {
            console.error("unLoadProp,卸载道具出错: ", e);
        }
    }

    /**
     * 客户端道具状态切换
     * @param propID  道具ID
     * @param param1  自定义参数 （飞行 --> 飞行状态）
     * @param param2  自定义参数 （飞行 --> 状态开关）
     * @param param3  自定义参数  (飞行 --)
     */
    async net_ChangePropState(propID: PropBaseType, param1?: number, param2?: boolean, param3?: any) {
        const curProp = this.propMap.get(this.currentPlayerId);
        if (!curProp) {
            return;
        }
        const curType = mathTools_firstPlaceNumber(propID);
        switch (curType) {
            case PropBaseType.Action:
                if (curProp.config.NextID && curProp.config.NextID != 0)
                    curProp.setData(this.getActionPropData(curProp.config.NextID));
                (curProp as PropBase_Action).propSwitchoverState();
                break;
            case PropBaseType.Fly:
                let flyProp = curProp as PropBase_Fly;
                if (curProp instanceof PropBase_Fly) {
                    switch (param1) {
                        case 0:
                            flyProp?.flyActiveEff(param2);
                            break;
                        case 1:
                            flyProp?.flyAccelerate(true);
                            break;
                        case 2:
                            flyProp?.flyUp(param2);
                            break;
                        case 3:
                            flyProp?.changeWalk(param2);
                            break;
                    }
                } else
                    console.error('net_changePropState', curProp._id, propID);
                break;
            case PropBaseType.Placement:
                (curProp as PropBase_Placement).usePlacementProp();
                break;
            default:
                //TODO 新加道具状态切换方法
                break;
        }
    }

    /**
     * 道具状态切换
     * @param propId 道具ID
     * @param playerId 玩家ID
     * @returns 当前道具
     */
    private async equipPropSwitch(propId: number, playerId: number): Promise<PropBase> {
        let curPlayer = Player.getPlayer(playerId);
        switch (mathTools_firstPlaceNumber(propId)) {
            case PropBaseType.Action:
                let actionData = this.getActionPropData(propId);
                let actionProp = await PropBasePool.spanProp(propId, actionData.ModelGuid);
                actionProp.setData(actionData);
                actionProp.equip(curPlayer);
                this.getClient(curPlayer)?.net_ControlPropState(propId, true, actionData.IconBtn);
                return actionProp;
            case PropBaseType.Fly:
                let flyData = this.getFlyPropData(propId);
                let flyProp = await PropBasePool.spanProp(propId, flyData.ModelGuid);
                flyProp.setData(flyData);
                flyProp.equip(curPlayer);
                (flyProp as PropBase_Fly).changeWalk(false);
                this.getClient(curPlayer)?.net_ControlPropState(propId, true, flyData.flyGoUpSpeed);
                return flyProp;
            case PropBaseType.Placement:
                let placementData = this.getPlacementData(propId);
                let placementProp = await PropBasePool.spanProp(propId, placementData.ModelGuid);
                placementProp.setData(placementData);
                placementProp.equip(curPlayer);
                this.getClient(curPlayer)?.net_ControlPropState(propId, true, placementData.IconPropGuid, placementData.ObjPlaceCD);
                return placementProp;
            default:
                break;
        };
    }
    /**
     * 道具卸载状态恢复
     * @param prop 道具类
     * @param playerId 玩家ID
     */
    private unLoadPropSwitch(prop: PropBase, playerId: number): void {
        let curPlayer = Player.getPlayer(playerId);
        switch (mathTools_firstPlaceNumber(prop._id)) {
            case PropBaseType.Action:
                prop.unLoad();
                this.getClient(curPlayer)?.net_ControlPropState(prop._id, false, "");
                break;
            case PropBaseType.Fly:
                prop.unLoad();
                this.getClient(curPlayer)?.net_ControlPropState(prop._id, false, 0);
                break;
            case PropBaseType.Placement:
                prop.unLoad();
                this.getClient(curPlayer)?.net_ControlPropState(prop._id, false);
                break;
            default:
                //TODO 新加道具卸载方法
                break;
        }
    }

    /**
     * 装备其他道具 (返回生成道具类)
     * @param propID 道具ID
     * @param playerId 玩家ID
     */
    abstract equipOtherProp(propID: number, playerId: number): Object;
    /**
     * 卸载道具
     * @param otherProp 道具类（需要强转）
     * @param playerId 玩家ID
     */
    abstract unLoadOtherProp(otherProp: any, playerId: number): void;
    /**
     * 获取动作道具配置数据
     * @param ConfigID 配置ID
     */
    abstract getActionPropData(ConfigID: number): IPropActionElement;
    /**
     * 获取飞行道具配置数据
     * @param ConfigID 配置ID
     */
    abstract getFlyPropData(ConfigID: number): IPropFlyElement;
    /**
     * 获取放置道具配置数据
     * @param ConfigID 配置ID
     */
    abstract getPlacementData(ConfigID: number): IPropPlacementElement;
}