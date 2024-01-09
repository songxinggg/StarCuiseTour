﻿/**aits-ignore */


@UIBind('UI/facadModule/FacadCart.ui')
export default class FacadCart_generate extends UIScript {
    protected readonly _myUIName: string = "FacadCart";
    public get visible() {
        if (this.uiObject) {
            return this.uiObject.visible && this.rootCanvas.visible;
        }
        return false;
    }
    public set visible(inVisible: boolean) {
        if (this.uiObject) {
            if (inVisible) {
                this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            } else {
                UIManager.hideUI(this)
                this.uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
        }
    }

    	private mGetTxt_Internal: mw.TextBlock
	public get mGetTxt(): mw.TextBlock {
		if(!this.mGetTxt_Internal&&this.uiWidgetBase) {
			this.mGetTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGetTxt') as mw.TextBlock
		}
		return this.mGetTxt_Internal
	}
	private mPriceView_Internal: mw.Canvas
	public get mPriceView(): mw.Canvas {
		if(!this.mPriceView_Internal&&this.uiWidgetBase) {
			this.mPriceView_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPriceView') as mw.Canvas
		}
		return this.mPriceView_Internal
	}
	private mGoldIcon_Internal: mw.Image
	public get mGoldIcon(): mw.Image {
		if(!this.mGoldIcon_Internal&&this.uiWidgetBase) {
			this.mGoldIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPriceView/mGoldIcon') as mw.Image
		}
		return this.mGoldIcon_Internal
	}
	private mTotalPrice_Internal: mw.TextBlock
	public get mTotalPrice(): mw.TextBlock {
		if(!this.mTotalPrice_Internal&&this.uiWidgetBase) {
			this.mTotalPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPriceView/mTotalPrice') as mw.TextBlock
		}
		return this.mTotalPrice_Internal
	}
	private mScroll_Internal: mw.ScrollBox
	public get mScroll(): mw.ScrollBox {
		if(!this.mScroll_Internal&&this.uiWidgetBase) {
			this.mScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScroll') as mw.ScrollBox
		}
		return this.mScroll_Internal
	}
	private mWearCanvas_Internal: mw.Canvas
	public get mWearCanvas(): mw.Canvas {
		if(!this.mWearCanvas_Internal&&this.uiWidgetBase) {
			this.mWearCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScroll/mWearCanvas') as mw.Canvas
		}
		return this.mWearCanvas_Internal
	}
	private mBuyBtn_Internal: mw.StaleButton
	public get mBuyBtn(): mw.StaleButton {
		if(!this.mBuyBtn_Internal&&this.uiWidgetBase) {
			this.mBuyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyBtn') as mw.StaleButton
		}
		return this.mBuyBtn_Internal
	}
	private mCloseBtn_Internal: mw.StaleButton
	public get mCloseBtn(): mw.StaleButton {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseBtn') as mw.StaleButton
		}
		return this.mCloseBtn_Internal
	}
	private dividingline_up_Internal: mw.Image
	public get dividingline_up(): mw.Image {
		if(!this.dividingline_up_Internal&&this.uiWidgetBase) {
			this.dividingline_up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/dividingline_up') as mw.Image
		}
		return this.dividingline_up_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mBuyBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBuyBtn");
        })
        this.mBuyBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBuyBtn");
        })
        this.mBuyBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBuyBtn");
        })
        this.mBuyBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mCloseBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
        })
        this.mCloseBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mCloseBtn");
        })
        this.mCloseBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mCloseBtn");
        })
        this.mCloseBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBuyBtn);
	
        this.setLanguage(this.mCloseBtn);
	
        //文本多语言
        this.setLanguage(this.mGetTxt)
	
        this.setLanguage(this.mTotalPrice)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mPriceView/TextBlock_2") as mw.TextBlock);
	

    }
    
    private setLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    
    protected onStart(): void{};
    protected onShow(...params: any[]): void {};
    protected onHide():void{};
    protected onUpdate(dt: number): void {}
    protected onPause(): void {}
    protected onResume(): void {}
    /**
    * 设置ui的父节点
    * @param parent 父节点
    */
    setParent(parent: mw.Canvas){
        parent.addChild(this.uiObject)
        this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size)
    }
}