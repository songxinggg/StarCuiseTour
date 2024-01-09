

import { GameConfig } from "../../../../config/GameConfig";
import { IRoleAvatarElement } from "../../../../config/RoleAvatar";
import { HudGameUIState } from "../../../../const/GameEnum";
import FacadMain_Generate from "../../../../ui-generate/facadModule/FacadMain_generate";
import Tips from "../../../../ui/commonUI/Tips";
import { UIMultiScroller } from "../../../../utils/UIMultiScroller";
import Game_HUDUI from "../../../gameModule/ui/Game_HUDUI";
import ClothManager from "../../managers/ClothManager";
import FacadCartUI from "./FacadCartUI";
import FacadItemUI, { FacadSelectEvent } from "./FacadItemUI";
import FacadTipUI from "./FacadTipUI";
import { Enums, TouchScript } from "./TouchScript";

export default class FacadMainUI extends FacadMain_Generate {
    private _curConfigIds: IRoleAvatarElement[];
    private _scroll: UIMultiScroller;
    private _curType: number = -1;
    private _tabMap: Map<number, mw.StaleButton> = new Map()
    private _curSelect: number = -1;
    private _isCheck: boolean = false

    public set curSelect(configID: number) {
        this._curSelect = configID
        if (this._curSelect == -1) {
            this.mBtnBuy.visibility = mw.SlateVisibility.Collapsed
            this.mBtnView.visibility = mw.SlateVisibility.Collapsed
        } else {
            const config = GameConfig.RoleAvatar.getElement(this._curSelect)
            if (config.priceType == 1) {
                this.mBtnBuy.visibility = mw.SlateVisibility.Visible
                this.mBtnView.visibility = mw.SlateVisibility.Collapsed
            } else if (config.priceType == 2) {
                this.mBtnBuy.visibility = mw.SlateVisibility.Collapsed
                this.mBtnView.visibility = mw.SlateVisibility.Visible
            }
        }
    }

    protected onStart(): void {
        this.layer = mw.UILayerDialog;
        this.mGold.text = "0";
        let num_row = Math.floor(this.mContent.size.x / (270 + 30))
        let num_col = Math.ceil(this.mContent.size.y / (260 + 20)) + 1
        this._scroll = new UIMultiScroller(this.mScrollBox, this.mContent, FacadItemUI, num_row, 30, 0, 270, 260, num_col, 30, 20);
        this._scroll.ItemCallback.add(this.onRefeshItem);

        for (let i = 0; i <= 7; i++) {
            this["btn" + i].onClicked.add(() => {
                this.showItemsbyType(i)
            })
            this._tabMap.set(i, this["btn" + i])
        }

        this.btnLeft.onClicked.add(() => {
            ClothManager.instance.addRoatation(-1);
        })

        this.btnRight.onClicked.add(() => {
            ClothManager.instance.addRoatation(1);
        })

        this.btnReset.onClicked.add(async () => {
            await ClothManager.instance.resetPlayerCloth();
            Event.dispatchToLocal(FacadSelectEvent, this._curSelect)
        })

        this.mBtnClose.onClicked.add(() => {
            const notBuy = ClothManager.instance.buySelectCart()
            if (!notBuy.result) {
                ClothManager.instance.saveAvatarData()
                ClothManager.instance.hideClothUI()
            } else {
                UIManager.show(FacadTipUI, 4, notBuy.notBuyArr)
            }
        })

        this.mBtnSave.onClicked.add(() => {
            const notBuy = ClothManager.instance.buySelectCart()
            if (!notBuy.result) {
                ClothManager.instance.saveAvatarData()
                ClothManager.instance.hideClothUI()
            } else {
                UIManager.show(FacadCartUI, notBuy.notBuyArr)
            }
        })

        this.mBtnBuy.onClicked.add(() => {
            const config = GameConfig.RoleAvatar.getElement(this._curSelect)
            if (!config) {
                Tips.show("选取一个购买")
                console.info("选取购买" + this._curSelect);
                return;
            }
            if (config.price > 0) {
                Tips.show("金币不足")
            } else {
                UIManager.show(FacadTipUI, 1, this._curSelect)
            }
        })

        this.mBtnView.onClicked.add(() => {
            UIManager.show(FacadTipUI, 3, this._curSelect)
        })

        this.mCheckBox.onClicked.add(() => {
            this._isCheck = !this._isCheck
            this.mCheckBoxImg.visibility = this._isCheck ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed
            this.onlyShowIsHave(this._isCheck)
        })

        this._moveVec = [];
        mw.TimeUtil.delayExecute(() => {
            this._movePos = this.mTouch.position.multiply(1);
        }, 3)
    }

    private onRefeshItem = (index: number, renderItem: FacadItemUI) => {
        let cfg = this._curConfigIds[index];
        renderItem.setData(cfg);
    }

    public refreshScroll() {
        this._scroll.setData(this._curConfigIds);
    }

    protected onShow(...params: any[]): void {
        this.curSelect = -1
        UIManager.getUI(Game_HUDUI).mNewCloth.visibility = mw.SlateVisibility.Collapsed
        this.showItemsbyType(1)
        TouchScript.instance.addScreenListener(this.mTouch, this.onMoveTouchEvent, false);
        this.canUpdate = true
        UIManager.setUIstate(this, HudGameUIState.HideAll)
    }

    private showItemsbyType(i: number) {
        if (this._curType == i) {
            return
        }
        let tab: mw.StaleButton = null;
        if (this._tabMap.has(this._curType)) {
            tab = this._tabMap.get(this._curType)
            tab.setNormalImageColorByHex("#ffffffff")
            tab.zOrder = 0;
        }
        this._curType = i;
        if (this._tabMap.has(this._curType)) {
            tab = this._tabMap.get(this._curType)
            tab.setNormalImageColorByHex("#ffff05ff")
            tab.zOrder = 1;
        }
        this._curConfigIds = GameConfig.RoleAvatar.getAllElement().filter(config => config.type == this._curType)
        this.onlyShowIsHave(this._isCheck)
    }

    private onlyShowIsHave(bool: boolean) {
        if (bool) {
            this._curConfigIds = this._curConfigIds.filter(config => {
                return ClothManager.instance.hasSuit(config.ID)
            })
        } else {
            this._curConfigIds = GameConfig.RoleAvatar.getAllElement().filter(config => config.type == this._curType)
        }
        this.refreshScroll()
    }

    private _moveId: number = -1;
    private _moveVec: number[];
    private _dir: number = 0;
    private _movePos: mw.Vector2;
    private onMoveTouchEvent = (widget: mw.Widget, event: Enums.TouchEvent, x: number, y: number, inPointerEvent: mw.PointerEvent) => {
        if (this._movePos) {
            if (event == Enums.TouchEvent.DOWN) {
                if (this._moveId < 0) {
                    this._moveId = inPointerEvent.pointerIndex;
                    this._moveVec[0] = x;
                    this._moveVec[1] = y;

                }
            } else if (event == Enums.TouchEvent.MOVE) {
                if (this._moveId >= 0) {
                    let xoffset = x - this._moveVec[0];
                    let yoffset = y - this._moveVec[1];
                    this._dir = 0;
                    if (Math.abs(xoffset) > Math.abs(yoffset)) {
                        this._dir = Math.floor(xoffset);
                    }
                    this._moveVec[0] = x;
                    this._moveVec[1] = y;
                }
            } else if (event == Enums.TouchEvent.UP) {
                if (this._moveId >= 0) {
                    this._moveId = -1;
                    this._dir = 0;
                }
            }
        }
    }

    protected onHide(): void {
        if (this._tabMap.has(this._curType)) this._tabMap.get(this._curType).setNormalImageColorByHex("#ffffffff")
        this._curType = -1;
        TouchScript.instance.removeScreenListener(this.mTouch);
        this.canUpdate = false
        UIManager.setUIstate(this, HudGameUIState.Show)
    }

    onTouchStarted(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
        return TouchScript.instance.onTouchStarted(inGemory, inPointerEvent);
    }

    onTouchMoved(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
        return TouchScript.instance.onTouchMoved(inGemory, inPointerEvent);
    }

    onTouchEnded(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
        return TouchScript.instance.onTouchEnded(inGemory, inPointerEvent);
    }

    protected onUpdate(dt: number): void {
        if (this._dir != 0) {
            ClothManager.instance.addRoatation(this._dir * dt);
            this._dir = 0;
        }
    }

}