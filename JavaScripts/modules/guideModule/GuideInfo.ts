
import { GuideContent } from "./GuideContent";
import { GuideModuleView } from "./GuideModuleView";

/**
 * 引导信息
 */

enum GuideState {

    /**
     * 拉取任务
     * */
    Pull,

    /**
     * 等待完成UI
     */
    WaitUI,

    /**
     * 等待到达世界坐标
     */
    WaitToPos,

    /**
     * 等待完成自定义条件
     */
    ConditionRes,

    /**
     * 执行自定义函数
     */
    RunFunc,

    /**
     * 完成
     */
    Complate,

}

/**
 * 引导任务阶段
 */
export class GuideTaskStage {

    /**
     * 任务类型
     */
    public type: GuideState;

    /**
     * UI关联组件
     */
    public uiWidget: mw.Widget = null;

    /**
     * 默认刷新dt
     */
    public refrashDt: number = GuideContent.ConstRefrashUITime;

    /**
     * 当前刷新UI的dt
     */
    public curReFrashDt: number = 0;

    /**
     * 需要引导到达的位置
     */
    public toWorldPos: mw.Vector = null;

    /**
     * UI完成需要检测的条件
     */
    public uiCheckCondition: () => boolean = null;

    /**
     * 完成需要检测的条件
     */
    public checkCondition: Array<() => boolean> = [];

    /**
     * 引导UI时的提示语言
     */
    public tips: string = "";

    /**
     * 寻路线段渲染方式
     * 0 为line 1为point
     */
    public drawType: number = 0;

    /**
     * 需要执行的自定义函数
     */
    public runFuncs: Array<() => void> = [];

    public copy(): GuideTaskStage {
        let condition: mw.Widget | mw.Vector | Array<() => boolean> = null;
        switch (this.type) {
            case GuideState.WaitUI:
                condition = this.uiWidget;
                break;
            case GuideState.WaitToPos:
                condition = this.toWorldPos;
                break;
            case GuideState.ConditionRes:
                condition = this.checkCondition;
                break;
        }

        let res = GuideTaskStage.newGuideTaskStage(this.type, condition, this.runFuncs, this.uiCheckCondition)
        res.tips = this.tips;
        res.drawType = this.drawType;
        return res;
    }

    /**
     * 创建引导任务阶段
     * @param type 类型
     * @param condition 条件
     */
    public static newGuideTaskStage(type: GuideState,
        condition: mw.Widget | mw.Vector | Array<() => boolean>,
        runFuncs: Array<() => void> = [],
        uiConditionRes: () => boolean = null) {

        let guideTaskStage = new GuideTaskStage();
        guideTaskStage.type = type;
        switch (type) {
            case GuideState.WaitUI:
                if (condition instanceof mw.Widget) {
                    guideTaskStage.uiWidget = condition;
                }
                guideTaskStage.uiCheckCondition = uiConditionRes;
                break;
            case GuideState.WaitToPos:
                if (condition instanceof mw.Vector)
                    guideTaskStage.toWorldPos = condition;

                guideTaskStage.uiCheckCondition = uiConditionRes;
                break;
            case GuideState.ConditionRes:
                if (condition instanceof Array)
                    guideTaskStage.checkCondition = condition;
                break;
            case GuideState.RunFunc:
                guideTaskStage.runFuncs = runFuncs;
                break;
        }

        return guideTaskStage;

    }

}

/**
 * 引导信息
 */
export class GuideInfo {

    /**
     * 引导阶段
     */
    public guideStage: number = 0;

    /**
     * 引导列表
     */
    private taskStage: Array<GuideTaskStage> = [];

    /**
     * 源引导列表
     */
    private srcStage: Array<GuideTaskStage> = [];

    /**
     * 当前引导状态
     */
    private curState: GuideState = GuideState.Pull;

    /**
     * 引导完成后的通知
     */
    private complateNotify: mw.Action1<number> = null;

    /**
     * 每100毫秒刷新下UI
     */
    private refrashUITime: number = 0.1;

    constructor(complateNotify: mw.Action1<number>) {
        this.complateNotify = complateNotify;
    }


    /**
     * 关联引导UI - 过滤按钮 - 自定义通过条件
     * @param widget 
     * @param condition 
     * @returns 
     */
    public addBindUIByCondition(widget: mw.Widget, condition: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget, [], condition);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联引导UI - 过滤按钮 - 自定义通过条件 - 带提示
     * @param widget 
     * @param condition 
     * @returns 
     */
    public addBindUIAndTipsByCondition(widget: mw.Widget, tips: string, condition: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget, [], condition);
        stage.tips = tips;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联引导UI - 按顺序压入
     * @param widget 
     * @returns 
     */
    //TODO:这位置可以加一个callback 做埋点等
    public addBindUI(...widgets: mw.Widget[]): GuideInfo {
        widgets.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        })
        return this;
    }

    /**
     * 关联引导UI 可以带Tips
     * @param widget 
     * @param tips 
     * @returns 
     */
    public addBindUIAndTips(widget: mw.Widget, tips: string): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, widget);
        stage.tips = tips;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联引导UI - 按顺序压入 - 跟随UI刷新
     * @param widget 
     * @returns 
     */
    public addBindUIAlawaysRefrash(...widgets: mw.Widget[]): GuideInfo {
        widgets.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitUI, v);
            stage.refrashDt = 0;
            stage.curReFrashDt = 0;
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());

        })
        return this;
    }

    /**
     * 关联世界坐标 - 按顺序压入
     * @param poslist 
     * @returns 
     */
    public addBindWorldPos(...poslist: mw.Vector[]): GuideInfo {
        poslist.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, v);
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        })
        return this;
    }

    /**
     * 关联世界坐标 - 自定义通过条件 - 按顺序压入
     * @param poslist 
     * @param callback 
     * @returns 
     */
    public addBindWorldPosByCondition(poslist: mw.Vector, callback: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, poslist, [], callback);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 关联世界坐标 - 按顺序压入 - 寻路渲染方式
     * @param poslist 坐标列表
     * @returns 
     */
    public addBindWorldPos_Pointer(...poslist: mw.Vector[]): GuideInfo {
        poslist.forEach((v, i, arrs) => {
            let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, v);
            stage.drawType = 1;
            this.taskStage.push(stage);
            this.srcStage.push(stage.copy());
        })
        return this;
    }

    /**
     * 关联世界坐标 - 自定义通过条件 - 按顺序压入 - 寻路渲染方式
     * @param poslist 坐标
     * @param callback 自定义通过条件
     * @returns 
     */
    public addBindWorldPosByCondition_Pointer(poslist: mw.Vector, callback: () => boolean): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.WaitToPos, poslist, [], callback);
        stage.drawType = 1;
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 添加一个引导完成条件 - 按顺序压入
     * @param condition 
     * @returns 
     */
    public addCondition(...condition: (() => boolean)[]): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.ConditionRes, condition);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 添加一个自定义执行函数
     * @param func 
     */
    public addRunFunc(...funcs: (() => void)[]): GuideInfo {
        let stage = GuideTaskStage.newGuideTaskStage(GuideState.RunFunc, null, funcs);
        this.taskStage.push(stage);
        this.srcStage.push(stage.copy());
        return this;
    }

    /**
     * 重置所有引导阶段
     */
    public resetAllStage() {
        this.curState = GuideState.Pull;
        this.refrashUITime = 0.1;
        this.taskStage = [];
        for (let i = 0; i < this.srcStage.length; ++i) {
            this.taskStage.push(this.srcStage[i].copy());
        }
    }

    /**
     * 获取当前引导任务
     */
    public getCurTask(): GuideTaskStage {

        if (this.taskStage.length <= 0) return null;

        return this.taskStage[0];

    }

    /**
     * 执行处理
     */
    public handle(dt: number) {

        /**
         * 当前状态是拉取任务
         */
        if (this.curState == GuideState.Pull) {
            this.pullTask();
            return;
        }

        if (this.curState == GuideState.WaitUI) {
            this.taskStage[0].curReFrashDt -= dt;
            if (this.taskStage[0].curReFrashDt <= 0) {
                let first = this.taskStage[0].uiWidget;
                this.beginUITask(first);
                let stage = this.taskStage[0];
                if (stage.uiCheckCondition && stage.uiCheckCondition()) {
                    UIManager.getUI(GuideModuleView).hideAllItem();
                    this.onUITaskCallback();
                    return;
                }
            }
            return;
        }

        /** 
         * 验证是否到达目标点
         */
        if (this.curState == GuideState.WaitToPos) {
            UIManager.getUI(GuideModuleView).setGuideArrowTargetPos(this.taskStage[0].toWorldPos, null, 0, true);
            return;
        }

        /**
         * 验证是否完成自定义条件
         */
        if (this.curState == GuideState.ConditionRes) {
            if (this.checkCondition()) {
                this.curState = GuideState.Pull;
                this.taskStage.shift();
            }
            return;
        }

    }

    /**
     * 拉取任务
     */
    private pullTask() {

        let task: GuideTaskStage = null;

        //当前是否还有任务
        if (this.taskStage.length > 0) {



            //获取最前面的任务
            task = this.taskStage[0];

            //拉取UI任务
            if (task.type == GuideState.WaitUI) {
                let stage = this.taskStage[0];
                let first = this.taskStage[0].uiWidget;
                this.beginUITask(first);
                return;
            } else {
                UIManager.getUI(GuideModuleView).showMask(false);
            }

            //拉取目标点任务
            if (task.type == GuideState.WaitToPos) {
                let toPos = this.taskStage[0].toWorldPos;
                this.beginToWorldPosTask(toPos, this.taskStage[0].drawType);
                return;
            }

            //拉取自定义判断条件
            if (task.type == GuideState.ConditionRes) {
                this.curState = GuideState.ConditionRes;
                return;
            }

            //拉取自定义运行函数
            if (task.type == GuideState.RunFunc) {
                // oTrace("执行自定义函数")
                this.taskStage.shift();
                this.curState = GuideState.Pull;
                try {
                    task.runFuncs.forEach((v, i, arrs) => {
                        v();
                    })
                } catch (ex) {
                    console.error(ex.stack);
                }
                return;
            }

        }

        //拉取不到任务 - 完成引导
        this.curState = GuideState.Complate;
        UIManager.getUI(GuideModuleView).showMask(false);
        if (this.complateNotify) {
            this.complateNotify.call(this.guideStage);
        }

    }

    /**
     * 检测并且完成引导
     */
    public checkCondition(): boolean {
        let res = true;
        this.taskStage[0].checkCondition.forEach(v => {
            if (!v()) res = false;
        })
        return res;
    }

    /**
     * UI任务触发完成后的回调
     */
    private onUITaskCallback() {

        this.curState = GuideState.Pull;
        this.taskStage.shift();

    }

    /**
     * 引导到目标地点后的回调
     */
    private onWorldToPosTaskCallback(): boolean {

        //oTrace("回调到达目标点")

        let stage = this.taskStage[0];
        if (stage.uiCheckCondition != null) {
            let res = stage.uiCheckCondition();
            if (!res) {
                return false;
            }
        }

        this.curState = GuideState.Pull;
        this.taskStage.shift();

        return true;

    }

    /**
     * 开始UI引导
     * @param widget 要引导点击的目标UI对象或区域
     */
    private beginUITask(widget: mw.Widget) {

        this.taskStage[0].curReFrashDt = this.taskStage[0].refrashDt;
        this.curState = GuideState.WaitUI;
        UIManager.getUI(GuideModuleView).lockMWUIWidget(widget, this.onUITaskCallback.bind(this), this.taskStage[0].tips, this.taskStage[0].uiCheckCondition == null);

    }

    /**
     * 开始到目标点引导
     * @param toPos 目标点
     */
    private beginToWorldPosTask(toPos: mw.Vector, drawType: number) {
        this.curState = GuideState.WaitToPos;
        UIManager.getUI(GuideModuleView).showMask(false);
        UIManager.getUI(GuideModuleView).setGuideArrowTargetPos(toPos, this.onWorldToPosTaskCallback.bind(this), drawType, false);
    }

}