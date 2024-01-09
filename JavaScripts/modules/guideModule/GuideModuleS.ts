
import { GuideDataHelper } from "./GuideModelData";
import { GuideModuleC } from "./GuideModuleC";

/**
 * 新手引导服务器模块
 */
export class GuideModuleS extends ModuleS<GuideModuleC, GuideDataHelper> {
    /**
     * 设置当前执行的引导
     * @param guideId 
     */
    public net_SetCurrentRunGuide(guideId: number) {
        this.currentData?.setCurGuide(guideId);
    }

    /**
     * 重置所有引导
     */
    public net_ResetAllGuide() {
        this.currentData?.resetAllGuide();
    }

    /**
     * 重置指定引导
     * @param guideId 
     * @returns 
     */
    public net_ResetGuideAtGuideId(guideId: number): boolean {
        return this.currentData?.resetGuideById(guideId);
    }

    /**
     * 完成引导
     * @param guideId 
     */
    public net_ComplateGuide(guideId: number) {
        // 引导是否完成

        if (this.currentData?.guideIsComplate(guideId)) {
            return
        }

        // 完成引导
        this.currentData?.complateGuideHandle(guideId);
    }

    /**
     * 引导是否完成
     * @param guideId 
     */
    public guideIsComplate(guideId: number, playerId: number): boolean {
        return DataCenterS.getData(playerId, GuideDataHelper).guideIsComplate(guideId);
    }
}