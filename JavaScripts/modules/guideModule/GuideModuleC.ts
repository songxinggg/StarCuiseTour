
import { GuideContent } from "./GuideContent";
import { GuideInfo } from "./GuideInfo";
import { GuideDataHelper } from "./GuideModelData";
import { GuideModuleS } from "./GuideModuleS";
import { GuideModuleView } from "./GuideModuleView";

/**
 * 新手引导客户端模块
 */
export class GuideModuleC extends ModuleC<GuideModuleS, GuideDataHelper> {
    /**
     * 预设引导信息列表
     */
    private guideInfoList: Array<GuideInfo> = [];

    /**
     * 是否初始化
     */
    private isInit: boolean = false;

    /**
     * 当前引导Id
     */
    private curGuideIdVal: number = 0;

    /**
     * 当前正在运行的引导
     */
    private runningGuide: GuideInfo = null;

    /**
     * 阶段完成广播
     */
    public guideComplateAction: mw.Action1<number> = new mw.Action1<number>();

    /**
     * 覆盖角色GameObject
     */
    private _reSetCharGo: mw.GameObject;

    /**
     * 覆盖到达目标点距离判断 默认50 小于50则到达
     */
    private _reSetToTargetPosDistance: number = 50;

    /**
     * 引导起始点z偏移
     */
    private _arrowStartPosOffsetZ: number = 0;

    /**
     * 引导线起始方向偏移
     */
    private _guideArrowDirOffse: number = 0;

    /**
     * 引导线Y缩放
     */
    private _guideArrowScaleY: number = 1;

    /**
     * 引导线间隔
     */
    private _guideArrowIntervalDis: number = 300;

    /**
     * 引导线地标信息
     */
    private _guideArrowPointerGuid: string = "29391";

    /**
     * 引导线地标缩放信息
     */
    private _guideArrowPointerScale: Vector = Vector.negOne.multiply(-1);

    private _guideArrowPointerIsEffect: boolean = false;

    private _guideArrowPointerShowCount: number = 0;

    private _guideArrowPointerUpdateInterval: number = 1000 / 30;

    /**
     * 进入场景
     * @param sceneType 
     */
    override onEnterScene(sceneType: number): void {
        //初始化引导
        if (this.isInit == false) {
            this.initGuide();
        }
    }

    /**
     * 获取引导线地标模式刷新频率
     * @returns 
     */
    public getGuideArrowPointerUpdateInterval(): number {
        return this._guideArrowPointerUpdateInterval;
    }

    /**
     * 引导线地标模式刷新频率
     * @param updateInterval 更新间隔(毫秒)
     */
    public setGuideArrowPointerUpdateInterval(updateInterval: number) {
        this._guideArrowPointerUpdateInterval = updateInterval;
    }

    /**
     * 获取引导线地标是否粒子效果
     * @returns 
     */
    public getGuideArrowPointerIsEffect(): boolean {
        return this._guideArrowPointerIsEffect;
    }

    /**
     * 获取引导线地标guid
     * @returns 
     */
    public getGuideArrowPointerGuid(): string {
        return this._guideArrowPointerGuid;
    }

    /**
     * 获取引导线地标缩放信息
     * @returns 
     */
    public getGuideArrowPointerScale(): Vector {
        return this._guideArrowPointerScale;
    }

    /**
     * 获取引导线最多显示的地标数量
     * @returns 
     */
    public getGuideArrorShowMaxPointer(): number {
        return this._guideArrowPointerShowCount;
    }

    /**
     * 设置引导线地标信息
     * @param guid 引导线地标对象Guid
     * @param scale 缩放
     * @param isEffect 是否特效
     * @param showPointerCount 最大显示地标数量
     */
    public setGuideArrowPointerInfo(guid: string, scale: Vector, isEffect: boolean, showPointerCount: number) {
        this._guideArrowPointerGuid = guid;
        this._guideArrowPointerScale = scale;
        this._guideArrowPointerIsEffect = isEffect;
        this._guideArrowPointerShowCount = showPointerCount;
    }

    /**
     * 获取引导线地标生成间隔距离
     * @returns 
     */
    public getGuideArrowIntervalDis(): number {
        return this._guideArrowIntervalDis;
    }

    /**
     * 设置引导线地标生成间隔距离
     * @param intervalDis 间隔距离
     */
    public setGuideArrowIntervalDis(intervalDis: number) {
        this._guideArrowIntervalDis = intervalDis;
    }

    /**
     * 设置引导线Y缩放
     * @param scaleY 引导线Y缩放
     */
    public setGuideArrowScaleY(scaleY: number) {
        this._guideArrowScaleY = scaleY;
    }

    /**
     * 获取引导线Y缩放
     * @returns 
     */
    public getGuideArrowScaleY(): number {
        return this._guideArrowScaleY;
    }

    /**
     * 设置引导线起始方向 偏移
     * @param distance 偏移距离
     */
    public setGuideArrowDirOffset(distance: number) {
        this._guideArrowDirOffse = distance;
    }

    /**
     * 获取引导线起始方向 偏移
     */
    public getGuideArrowDirOffsetDis(): number {
        return this._guideArrowDirOffse;
    }

    /**
     * 设置引导线起始坐标 z偏移
     * @param offsetZ z偏移
     */
    public setGuideArrowStartPosOffsetZ(offsetZ: number) {
        this._arrowStartPosOffsetZ = offsetZ;
    }

    /**
     * 获取引导线起始坐标 z偏移
     * @returns 
     */
    public getGuideArrowStartPosOffsetZ(): number {
        return this._arrowStartPosOffsetZ;
    }

    /**
     * 设置引导线 & 目标点特效guid
     * @param arrowGuid 引导线guid "0"则关闭
     * @param arrowMartialGuid 引导线材质guid "0"则关闭
     * @param targetPointEff 目标点guid "0"则关闭
     */
    public async setGuideArrowGuid(arrowGuid: string, arrowMartialGuid: string, targetPointEff: string) {
        if (arrowGuid == "0") GuideContent.GuideArrowGuid = "";
        else if (arrowGuid != "") GuideContent.GuideArrowGuid = arrowGuid;
        if (arrowMartialGuid == "0") GuideContent.GuideArrowMartialGuid = "";
        else if (arrowMartialGuid != "") GuideContent.GuideArrowMartialGuid = arrowMartialGuid;
        if (targetPointEff == "0") GuideContent.GuideWorldTargetEffectGuid = "";
        else if (targetPointEff != "") GuideContent.GuideWorldTargetEffectGuid = targetPointEff;

    }

    /**
     * 重置引导存档
     */
    public async resetAllGuideDB() {
        await this.server.net_ResetAllGuide();
        this.curGuideIdVal = 0;
        this.guideInfoList.forEach(e => {
            e.resetAllStage();
        })
        this.runningGuide = null;

        UIManager.getUI(GuideModuleView).hideAllItem();
    }

    /**
     * 重置指定的引导
     * @param guideId 引导id
     * @returns 
     */
    public async resetGuideById(guideId: number): Promise<boolean> {

        let res = await this.server.net_ResetGuideAtGuideId(guideId);

        this.guideInfoList.forEach(e => {
            if (e.guideStage == guideId) {
                e.resetAllStage();
            }
        })

        if (this.curGuideIdVal == guideId) {
            this.curGuideIdVal = 0;
        }

        if (this.runningGuide && this.runningGuide.guideStage == guideId) {
            this.runningGuide = null;
            UIManager.getUI(GuideModuleView).hideAllItem();
        }

        return res;

    }

    /**
     * 强制完成一个引导
     * @param guideId 引导id
     * @returns 
     */
    public async forceComplateGuide(guideId: number): Promise<boolean> {
        await this.server.net_ComplateGuide(guideId);
        return true;
    }

    /**
     * 获取最后一次执行引导时的id
     */
    public getLastGuideId(): number {
        return this.data.getCurGuide();
    }

    /**
     * 获取当前引导id
     * @deprecated 获取当前引导Id - 最新使用 getCurGuideId
     * @returns 返回引导id
     */
    public getCurStageVal(): number {
        return this.curGuideIdVal;
    }

    /**
     * 获取当前引导id
     * @returns 返回引导id
     */
    public getCurGuideId(): number {
        return this.curGuideIdVal;
    }

    /**
     * 到达目标点距离判断 默认50 小于50则到达
     * @param dis 目标点判定距离
     */
    public reSetToTargetPosDistance(dis: number) {
        this._reSetToTargetPosDistance = dis;
    }

    /**
     * 获取到达目标点距离判断 默认50 小于50则到达
     * @returns 
     */
    public getToTargetPosDistance(): number {

        return this._reSetToTargetPosDistance;
    }

    /**
     * 设置引导主角对象
     * @param go 主角GameObject对象
     */
    public reSetCharGo(go: mw.GameObject) {
        this._reSetCharGo = go;
    }

    /**
     * 获取引导主角对象
     * @returns 
     */
    public async getCharGo(): Promise<mw.GameObject> {

        if (this._reSetCharGo == null) {
            let player = await Player.asyncGetLocalPlayer();
            return player.character;
        }

        return this._reSetCharGo;
    }

    /**
     * 初始化引导模块
     */
    private initGuide() {

        if (this.isInit == false) this.isInit = true;

        //初始化当前阶段
        this.curGuideIdVal = this.data.getCurGuide();

        //清理掉通过的引导阶段
        // let newList = [];
        // this.guideInfoList.forEach((v) => {
        //     if (v.guideStage >= this.curGuideIdVal) {
        //         newList.push(v);
        //     }
        // })
        // this.guideInfoList = newList;

        //排序引导
        this.guideInfoList = this.guideInfoList.sort((a, b) => {
            return a.guideStage - b.guideStage;
        })

        //触发当前引导
        //TODO:考虑后这里不触发了，还是又外部去触发
        // let guideInfo = this.guideInfoList.find(e => { return e.guideStage == this.curStageVal })

        //监听引导完成
        this.guideComplateAction.add((guideId: number) => {
            console.error("GuideModuleC : 监听引导完成" + guideId);
            this.server.net_ComplateGuide(guideId);
        }, this);
    }

    /**
     * 移除引导
     * @param guideId
     */
    public removeGuideId(guideId: number) {
        let index = this.guideInfoList.findIndex(v => { return v.guideStage == guideId; });
        if (index != -1) {
            this.guideInfoList.splice(index, 1);
        }
    }

    /**
     * 添加引导
     * @param guideId 引导id - 不要重复
     * @return 引导信息
     */
    public addGuideStageHandle(guideId: number): GuideInfo {

        // 检测引导Id是否可用

        let canUseGuideId = true;
        this.guideInfoList.forEach(e => {
            if (e.guideStage == guideId) canUseGuideId = false;
        })
        if (!canUseGuideId) {
            console.error("repeat stage val : " + guideId);
            return null;
        }

        // 创建引导

        let guideInfo = new GuideInfo(this.guideComplateAction);
        guideInfo.guideStage = guideId;
        this.guideInfoList.push(guideInfo);
        return guideInfo;
    }

    /**
     * 触发引导
     * @param guideId 阶段id 
     */
    public triggerGuide(guideId: number): boolean {
        console.log("triggerGuide : " + guideId);
        // 查询引导
        let guide = this.guideInfoList.find(e => e.guideStage == guideId)

        if (guide == null) {
            console.error("[GuideModuleC] : find guide info error -> stage = " + guideId + " " + this.guideInfoList.length);
            return false;
        }

        // 判断引导是否完成
        if (this.data.guideIsComplate(guideId)) return false;


        // 执行引导

        this.runningGuide = guide;

        // 设置当前引导

        this.server.net_SetCurrentRunGuide(guideId);

        this.curGuideIdVal = guideId

        UIManager.show(GuideModuleView);

        return true;

    }

    /**
     * Tick
     * @param dt 
     */
    onUpdate(dt: number): void {
        // 更新当前引导
        if (this.runningGuide) this.runningGuide.handle(dt);
    }
}