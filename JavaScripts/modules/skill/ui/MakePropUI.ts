
import { ICreateItemElement } from "../../../config/CreateItem";
import { GameConfig } from "../../../config/GameConfig";

import { InputManager } from "../../../InputManager";
import MakePropUI_Generate from "../../../ui-generate/skill/MakePropUI_generate";
import GameUtils from "../../../utils/GameUtils";
import { PropItem } from "./PropItem";

export default class MakePropUI extends MakePropUI_Generate {

    /**所有造物物品 */
    private _allCreation: ICreateItemElement[] = []
    /**物品对象池 */
    private _itemPool: PropItem[] = [];
    /**物品使用池 */
    private _usePool: PropItem[] = [];
    private _oriSize: mw.Vector2
    protected onStart(): void {
        this._oriSize = this.rootCanvas.size.clone()
        this._allCreation = GameConfig.CreateItem.getAllElement()
        this.guideButton.visibility = mw.SlateVisibility.Visible
    }

    protected onShow(pos: mw.Vector2, skillID: number, clickFun: (param: any) => {}): void {
        if (!pos)
            pos = this._oriSize;
        else
            pos.subtract(this._oriSize)
        this.rootCanvas.position = pos;
        this.mScroll.scrollToStart();
        this.clearItemPool();
        const skill = Math.floor(skillID / 100)
        if (skill == 3011) this.refreshMakeProp(skillID, clickFun);
        if (skill == 3051) this.refreshWeather(clickFun);
        if (skill == 3061) this.refreshMusic(clickFun);
        if (skill == 3081) this.refreshTeleport(clickFun)
        if (skill == 3101 || skill == 3102) this.refreshHenShin(clickFun)
        setTimeout(() => {
            InputManager.instance.onTouch.add(this.onTouched, this);
        }, 64);
    }

    protected onHide(): void {
        InputManager.instance.onTouch.remove(this.onTouched, this);
        this.clearItemPool();
        if (this._itemPool.length >= 10) {
            const items = this._itemPool.splice(10);
            for (const item of items) {
                item.destroy();
            }
        }
    }

    private onTouched = () => {
        UIManager.hideUI(this)
    }

    private refreshMakeProp(skillID: number, clickFun: (param: any) => {}) {
        /**造物物品 */
        const skillConfig = GameConfig.SkillLevel.getElement(skillID)
        const ids = skillConfig.Param1.split("|").map((id) => { return Number(id) })
        for (const id of ids) {
            const info = this._allCreation.find((info) => { return info.ID == id })
            if (info) {
                const config = GameConfig.Item.getElement(info.ItemID);
                this.createItem(config.Icon, config.Name, () => { clickFun(info) })
            }
        }
    }

    private refreshWeather(clickFun: (param: any) => {}) {
        /**天气物品 */
        const weathers = [
            { icon: "120360", name: GameUtils.getTxt("Text_Text_992"), effectID: 157 },
            { icon: "120364", name: GameUtils.getTxt("Text_Text_993"), effectID: 158 },
            { icon: "120358", name: GameUtils.getTxt("Text_Text_994"), effectID: 159 }]
        for (const weather of weathers) {
            this.createItem(weather.icon, weather.name, () => { clickFun(weather.effectID) })
        }
    }

    private refreshMusic(clickFun: (param: any) => {}) {
        /**音乐 */
        const musics = [
            { icon: "120360", name: GameUtils.getTxt("Text_Text_992"), effectID: 157 },
            { icon: "120364", name: GameUtils.getTxt("Text_Text_993"), effectID: 158 },
            { icon: "120358", name: GameUtils.getTxt("Text_Text_994"), effectID: 159 }]
        for (const music of musics) {
            this.createItem(music.icon, music.name, () => { clickFun(music.effectID) })
        }
    }

    private refreshTeleport(clickFun: (param: any) => {}) {
        /**传送点 */
        const teleports = [
            { icon: "132766", name: "舞蹈课教室", pos: new mw.Vector(-2616.88, -1510.13, 182.38), rot: new mw.Rotation(0, 0, 90), targetPos: new mw.Vector(-2668, -1510, 182), targetRot: new mw.Rotation(0, 0, 180) },
            { icon: "132766", name: "宿舍", pos: new mw.Vector(4999, -7824, -63), rot: new mw.Rotation(0, 0, 0), targetPos: new mw.Vector(4999, -7896, -63), targetRot: new mw.Rotation(0, 0, -90) },
            { icon: "132766", name: "楼顶", pos: new mw.Vector(-1039, 490, 4741), rot: new mw.Rotation(0, 0, 0), targetPos: new mw.Vector(-1046, 655, 4753), targetRot: new mw.Rotation(0, 0, 90) }]
        for (const teleport of teleports) {
            this.createItem(teleport.icon, teleport.name, () => { clickFun(teleport) })
        }
    }

    private refreshHenShin(clickFun: (param: any) => {}) {
        /**变身 */
        const henShins = [
            { icon: "107638", name: GameUtils.getTxt("Text_Text_995"), guid: "151186" },
            { icon: "95825", name: GameUtils.getTxt("Text_Text_996"), guid: "151159" },
            { icon: "132759", name: GameUtils.getTxt("Text_Text_997"), guid: "151887" }]
        for (const henShin of henShins) {
            this.createItem(henShin.icon, henShin.name, () => { clickFun(henShin.guid) })
        }
    }

    private createItem(icon: string, name: string, clickFun) {
        let item: PropItem;
        if (this._itemPool.length > 0) {
            item = this._itemPool.shift();
        } else {
            item = UIManager.create(PropItem);
            item.clickBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
            this.mItemContent.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
        }
        this._usePool.push(item);
        item.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        item.setData(icon, name);
        item.clickBtn.onClicked.add(() => {
            if (clickFun) clickFun()
            this.visible = false
        })
    }

    /** 
    * 清空对象池
    * @return 
    */
    public clearItemPool() {
        if (this._usePool.length === 0) {
            return;
        }
        for (const item of this._usePool) {
            this._itemPool.push(item);
            item.clickBtn.onClicked.clear();
            item.uiObject.visibility = mw.SlateVisibility.Collapsed;
        }
        this._usePool.length = 0;
    }
}
