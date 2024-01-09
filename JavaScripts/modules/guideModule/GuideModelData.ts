

/** 新手引导 数据 操作类 */
export class GuideDataHelper extends Subdata {

    public onGuideChangeAction: mw.Action = new mw.Action();

    @Decorator.persistence()
    public complateGuide: number[] = null;

    /**
     * 已经完成的引导
     */
    @Decorator.persistence()
    public complateGuideList: number[] = null;

    /**
     * 当前引导
     */
    @Decorator.persistence()
    public curGuide: number = 0;

    public get dataName(): string {
        return "GuideDataHelper4";
    }

    protected onDataInit(): void {
        this.complateGuideList = this.complateGuideList || [];
        if (this.complateGuide && this.complateGuide.length > 0) {
            this.complateGuideList.push(...this.complateGuide);
            this.complateGuide = [];
        }
    }

    /**
     * 初始化引导
     */
    protected initDefaultData(): void {
        if (this.complateGuideList == null)
            this.complateGuideList = [];
    }

    /**
     * 重置所有引导存档
     */
    public resetAllGuide() {
        this.complateGuideList = [];
        this.curGuide = 0;
        this.save(true);
    }

    /**
     * 重置引导存档
     * @param guideId 
     */
    public resetGuideById(guideId: number): boolean {

        let newList = [];
        let has = false;
        this.complateGuideList.forEach(e => {
            if (e == guideId) {
                has = true;
                return;
            }
            newList.push(e);
        })
        if (!has) return true;
        this.complateGuideList = newList;
        if (this.curGuide == guideId) {
            this.curGuide = 0;
        }
        this.save(true);
        return true;

    }

    /**
     * 完成引导
     * @param guideId 引导id
     */
    public complateGuideHandle(guideId: number) {
        this.complateGuideList.push(guideId);
        this.onGuideChangeAction.call();
        this.save(true);

    }

    /**
     * 引导是否完成
     * @param guideId 引导id
     * @returns 
     */
    public guideIsComplate(guideId: number): boolean {
        let guide = this.complateGuideList.findIndex(e => { return e == guideId; })
        if (guide >= 0) {
            return true;
        }
    }

    /**
     * 获取当前引导
     */
    public getCurGuide(): number {
        return this.curGuide;
    }

    /**
     * 设置当前引导阶段
     * @param val 
     */
    public setCurGuide(val: number) {
        this.curGuide = val;
        this.save(true);
    }

}