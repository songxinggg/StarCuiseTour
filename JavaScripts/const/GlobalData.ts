export type Class<T> = { new(...args): T; };

export function MyBoolean(bool: any): boolean {
    if (typeof bool === "boolean") {
        return bool
    }
    if (typeof bool === "string") {
        if (["1", "true", "True"].includes(bool.toString())) {
            return true
        } else {
            return false
        }
    }
    if (typeof bool === "number") {
        if (bool == 0) return false
        else return true
    }
    return false
}
export class GlobalData {
    /**出生点位置 */
    public static globalPos: mw.Vector = null;
    /**出生点旋转 */
    public static globalRot: mw.Rotation = null;
    /**是否本地背包 */
    public static isLocalBag: boolean = false;
    /**是否打开GM */
    public static isOpenGM: boolean = false;
    /**是否可操作快捷栏 */
    public static isChangeBar: boolean = true;

    public static canClickKaZhu:boolean = true;
    /**是否快捷栏CD */
    public static changeBarTime: number = 0;
    /** 快捷栏最大数量 */
    public static maxShortcutBar = 6;
    /**空插槽图片 */
    public static blankSlotBg = "192223";
    /**道具给予距离 */
    public static giveDis = 500;
    /**交互物父节点 */
    public static interactorParent: string = "1ABEAA53";
    /**技能内置CD */
    public static skillCD: number = 0
    /**默认内置CD */
    public static defaultCD: number = 0.5
    /**造物时动作 */
    public static creationAnim: string = "156436"

    /** 等级颜色，用于改变文字、图片颜色 */
    public static levelColor = ["#FFFFFF", "#FFDEDB", "#77FFAB", "#C1C5FF", "#FFA0EC", "#FFF44D"];
    /** 默认弹簧臂相对变换 */
    public static cameraSystemRelativeTransform: mw.Transform = new mw.Transform(new mw.Vector(0, 0, 20), new mw.Rotation(0, 0, 0), new mw.Vector(1, 1, 1));

    public static BG_LIST = ["183792", "183792", "183765", "183850", "183764", "183854"];

    public static inParty: boolean = false;













    /**躲猫猫------------------------------------- */
    /**范围检测触发器大小 */
    static readonly warnTriggerSize: mw.Vector = new mw.Vector(10, 10, 10);


    /**感知范围相对位置 */
    static readonly warnRangePos: mw.Vector = new mw.Vector(0, 0, -90);

    /**感知范围特效大小 */
    static readonly warnRangeSize: mw.Vector = new mw.Vector(7, 7, 7);


    /**躲藏方传送点 */
    static readonly hidePos: mw.Vector = new mw.Vector(-9374.84, 43.50, 5000);

    /**抓人方传送点 */
    static readonly seekPos: mw.Vector = new mw.Vector(-11705.97, -57.32, 3200);

    /**寻找阶段开始后抓人方位置 */
    static readonly catchPos: mw.Vector = new mw.Vector(-9374.84, 43.50, 5000)

    /**加速百分比 */
    static readonly speedUp: number = 2;


    /**拾取蛋糕后的加速百分比 */
    static readonly speedUpAfterPick: number = 2;

    /**加速蛋糕持续时长 */
    static readonly speedUpTime: number = 3;

    /**抓人动作速率 */
    static readonly catchAnimSpeed: number = 3;

    /**动作发起后几秒开始检查 */
    static readonly checkTime: number = 0.5;


    //=======================================游戏时间相关======================================

    /**报名阶段时间 */
    static readonly signTime: number = 10;


    /**躲藏准备时间 */
    static readonly hideReadyTime: number = 4;

    /**躲藏时间 */
    static readonly hideTime: number = 30;

    /**寻找者准备时间 */
    static readonly seekReadyTime: number = 4;

    /**寻找者时间 */
    static readonly seekTime: number = 180;


    /**抓捕者引导线持续时间 */
    static readonly guideTime: number = 3;

    /**抓捕者引导线CD */
    static readonly guideCd: number = 60;



}

export namespace Asset {
    /**抓人的特效 */
    export const catchEffect: string = "153617";

    /**检测到周围有躲藏者的特效 */
    export const warnEffect: string = "88831";

    /**感知范围特效 */
    export const warnRangeEffect: string = "88776";

    /**观战幽灵特效 */
    export const watchEffect: string = "177590";


    /**抓人的音效 */
    export const catchMusic: string = "136202";

    /**抓人动作 */
    export const catchAnim: string = "29747";


    /**加速蛋糕拾取特效 */
    export const speedUpEffect: string = "153617";


    /**加速蛋糕拖尾特效 */
    export const speedUpTrailEffect: string = "128520";

    /**拾取物品音效 */
    export const pickMusic: string = "117891";


    /**变身道具音效 */
    export const changeMusic: string = "137564";

    /**变身道具特效 */
    export const changeEffect: string = "144090";

}
