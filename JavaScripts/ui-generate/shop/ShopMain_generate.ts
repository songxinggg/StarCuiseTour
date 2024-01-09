﻿/**aits-ignore */


@UIBind('UI/shop/ShopMain.ui')
export default class ShopMain_generate extends UIScript {
    protected readonly _myUIName: string = "ShopMain";
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

    	private mTabGroup_Internal: mw.Canvas
	public get mTabGroup(): mw.Canvas {
		if(!this.mTabGroup_Internal&&this.uiWidgetBase) {
			this.mTabGroup_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTabGroup') as mw.Canvas
		}
		return this.mTabGroup_Internal
	}
	private mGoodsType1_Internal: mw.StaleButton
	public get mGoodsType1(): mw.StaleButton {
		if(!this.mGoodsType1_Internal&&this.uiWidgetBase) {
			this.mGoodsType1_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTabGroup/mGoodsType1') as mw.StaleButton
		}
		return this.mGoodsType1_Internal
	}
	private mGoodsType2_Internal: mw.StaleButton
	public get mGoodsType2(): mw.StaleButton {
		if(!this.mGoodsType2_Internal&&this.uiWidgetBase) {
			this.mGoodsType2_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTabGroup/mGoodsType2') as mw.StaleButton
		}
		return this.mGoodsType2_Internal
	}
	private mGoodsType3_Internal: mw.StaleButton
	public get mGoodsType3(): mw.StaleButton {
		if(!this.mGoodsType3_Internal&&this.uiWidgetBase) {
			this.mGoodsType3_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTabGroup/mGoodsType3') as mw.StaleButton
		}
		return this.mGoodsType3_Internal
	}
	private mGoodsType4_Internal: mw.StaleButton
	public get mGoodsType4(): mw.StaleButton {
		if(!this.mGoodsType4_Internal&&this.uiWidgetBase) {
			this.mGoodsType4_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mTabGroup/mGoodsType4') as mw.StaleButton
		}
		return this.mGoodsType4_Internal
	}
	private mScrollView_Internal: mw.ScrollBox
	public get mScrollView(): mw.ScrollBox {
		if(!this.mScrollView_Internal&&this.uiWidgetBase) {
			this.mScrollView_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mScrollView') as mw.ScrollBox
		}
		return this.mScrollView_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mScrollView/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mMoney_Internal: mw.Canvas
	public get mMoney(): mw.Canvas {
		if(!this.mMoney_Internal&&this.uiWidgetBase) {
			this.mMoney_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney') as mw.Canvas
		}
		return this.mMoney_Internal
	}
	private moonIcon_Internal: mw.Image
	public get moonIcon(): mw.Image {
		if(!this.moonIcon_Internal&&this.uiWidgetBase) {
			this.moonIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney/moonIcon') as mw.Image
		}
		return this.moonIcon_Internal
	}
	private moonNum_Internal: mw.TextBlock
	public get moonNum(): mw.TextBlock {
		if(!this.moonNum_Internal&&this.uiWidgetBase) {
			this.moonNum_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney/moonNum') as mw.TextBlock
		}
		return this.moonNum_Internal
	}
	private goldIcon_Internal: mw.Image
	public get goldIcon(): mw.Image {
		if(!this.goldIcon_Internal&&this.uiWidgetBase) {
			this.goldIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney/goldIcon') as mw.Image
		}
		return this.goldIcon_Internal
	}
	private goldNum_Internal: mw.TextBlock
	public get goldNum(): mw.TextBlock {
		if(!this.goldNum_Internal&&this.uiWidgetBase) {
			this.goldNum_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney/goldNum') as mw.TextBlock
		}
		return this.goldNum_Internal
	}
	private silverIcon_Internal: mw.Image
	public get silverIcon(): mw.Image {
		if(!this.silverIcon_Internal&&this.uiWidgetBase) {
			this.silverIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney/silverIcon') as mw.Image
		}
		return this.silverIcon_Internal
	}
	private silverNum_Internal: mw.TextBlock
	public get silverNum(): mw.TextBlock {
		if(!this.silverNum_Internal&&this.uiWidgetBase) {
			this.silverNum_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mMoney/silverNum') as mw.TextBlock
		}
		return this.silverNum_Internal
	}
	private mClose_btn_Internal: mw.StaleButton
	public get mClose_btn(): mw.StaleButton {
		if(!this.mClose_btn_Internal&&this.uiWidgetBase) {
			this.mClose_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/MainView/mClose_btn') as mw.StaleButton
		}
		return this.mClose_btn_Internal
	}
	private mTips_Internal: mw.Canvas
	public get mTips(): mw.Canvas {
		if(!this.mTips_Internal&&this.uiWidgetBase) {
			this.mTips_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips') as mw.Canvas
		}
		return this.mTips_Internal
	}
	private mTipsClose_Internal: mw.StaleButton
	public get mTipsClose(): mw.StaleButton {
		if(!this.mTipsClose_Internal&&this.uiWidgetBase) {
			this.mTipsClose_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsClose') as mw.StaleButton
		}
		return this.mTipsClose_Internal
	}
	private mTipsItemName_Internal: mw.TextBlock
	public get mTipsItemName(): mw.TextBlock {
		if(!this.mTipsItemName_Internal&&this.uiWidgetBase) {
			this.mTipsItemName_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsItemName') as mw.TextBlock
		}
		return this.mTipsItemName_Internal
	}
	private mTipsItemBg_Internal: mw.Image
	public get mTipsItemBg(): mw.Image {
		if(!this.mTipsItemBg_Internal&&this.uiWidgetBase) {
			this.mTipsItemBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsItemBg') as mw.Image
		}
		return this.mTipsItemBg_Internal
	}
	private mTipsItemIcon_Internal: mw.Image
	public get mTipsItemIcon(): mw.Image {
		if(!this.mTipsItemIcon_Internal&&this.uiWidgetBase) {
			this.mTipsItemIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsItemIcon') as mw.Image
		}
		return this.mTipsItemIcon_Internal
	}
	private mTipsItemStar_Internal: mw.Canvas
	public get mTipsItemStar(): mw.Canvas {
		if(!this.mTipsItemStar_Internal&&this.uiWidgetBase) {
			this.mTipsItemStar_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsItemStar') as mw.Canvas
		}
		return this.mTipsItemStar_Internal
	}
	private mTipsItemState_Internal: mw.TextBlock
	public get mTipsItemState(): mw.TextBlock {
		if(!this.mTipsItemState_Internal&&this.uiWidgetBase) {
			this.mTipsItemState_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsItemState') as mw.TextBlock
		}
		return this.mTipsItemState_Internal
	}
	private mTipsDescBG_Internal: mw.Image
	public get mTipsDescBG(): mw.Image {
		if(!this.mTipsDescBG_Internal&&this.uiWidgetBase) {
			this.mTipsDescBG_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsDescBG') as mw.Image
		}
		return this.mTipsDescBG_Internal
	}
	private mTipsDesc_Internal: mw.TextBlock
	public get mTipsDesc(): mw.TextBlock {
		if(!this.mTipsDesc_Internal&&this.uiWidgetBase) {
			this.mTipsDesc_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsDesc') as mw.TextBlock
		}
		return this.mTipsDesc_Internal
	}
	private mTipsInput_Internal: mw.InputBox
	public get mTipsInput(): mw.InputBox {
		if(!this.mTipsInput_Internal&&this.uiWidgetBase) {
			this.mTipsInput_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsInput') as mw.InputBox
		}
		return this.mTipsInput_Internal
	}
	private mTipsAdd_Internal: mw.Button
	public get mTipsAdd(): mw.Button {
		if(!this.mTipsAdd_Internal&&this.uiWidgetBase) {
			this.mTipsAdd_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsAdd') as mw.Button
		}
		return this.mTipsAdd_Internal
	}
	private mTipsSub_Internal: mw.Button
	public get mTipsSub(): mw.Button {
		if(!this.mTipsSub_Internal&&this.uiWidgetBase) {
			this.mTipsSub_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsSub') as mw.Button
		}
		return this.mTipsSub_Internal
	}
	private mTipsBuy_Internal: mw.StaleButton
	public get mTipsBuy(): mw.StaleButton {
		if(!this.mTipsBuy_Internal&&this.uiWidgetBase) {
			this.mTipsBuy_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsBuy') as mw.StaleButton
		}
		return this.mTipsBuy_Internal
	}
	private mTipsMoneyIcon_Internal: mw.Image
	public get mTipsMoneyIcon(): mw.Image {
		if(!this.mTipsMoneyIcon_Internal&&this.uiWidgetBase) {
			this.mTipsMoneyIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsMoneyIcon') as mw.Image
		}
		return this.mTipsMoneyIcon_Internal
	}
	private mTipsPrice_Internal: mw.TextBlock
	public get mTipsPrice(): mw.TextBlock {
		if(!this.mTipsPrice_Internal&&this.uiWidgetBase) {
			this.mTipsPrice_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsPrice') as mw.TextBlock
		}
		return this.mTipsPrice_Internal
	}
	private mTipsBuyText_Internal: mw.TextBlock
	public get mTipsBuyText(): mw.TextBlock {
		if(!this.mTipsBuyText_Internal&&this.uiWidgetBase) {
			this.mTipsBuyText_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTips/mTipsBuyText') as mw.TextBlock
		}
		return this.mTipsBuyText_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mGoodsType1.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mGoodsType1");
        })
        this.mGoodsType1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mGoodsType1");
        })
        this.mGoodsType1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mGoodsType1");
        })
        this.mGoodsType1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mGoodsType2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mGoodsType2");
        })
        this.mGoodsType2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mGoodsType2");
        })
        this.mGoodsType2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mGoodsType2");
        })
        this.mGoodsType2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mGoodsType3.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mGoodsType3");
        })
        this.mGoodsType3.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mGoodsType3");
        })
        this.mGoodsType3.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mGoodsType3");
        })
        this.mGoodsType3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mGoodsType4.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mGoodsType4");
        })
        this.mGoodsType4.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mGoodsType4");
        })
        this.mGoodsType4.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mGoodsType4");
        })
        this.mGoodsType4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mClose_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mClose_btn");
        })
        this.mClose_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mClose_btn");
        })
        this.mClose_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mClose_btn");
        })
        this.mClose_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mTipsClose.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTipsClose");
        })
        this.mTipsClose.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTipsClose");
        })
        this.mTipsClose.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTipsClose");
        })
        this.mTipsClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mTipsBuy.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTipsBuy");
        })
        this.mTipsBuy.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTipsBuy");
        })
        this.mTipsBuy.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTipsBuy");
        })
        this.mTipsBuy.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.mTipsAdd.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTipsAdd");
        })
        this.mTipsAdd.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTipsAdd");
        })
        this.mTipsAdd.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTipsAdd");
        })
        this.mTipsAdd.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mTipsSub.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTipsSub");
        })
        this.mTipsSub.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTipsSub");
        })
        this.mTipsSub.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTipsSub");
        })
        this.mTipsSub.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mGoodsType1);
	
        this.setLanguage(this.mGoodsType2);
	
        this.setLanguage(this.mGoodsType3);
	
        this.setLanguage(this.mGoodsType4);
	
        this.setLanguage(this.mClose_btn);
	
        this.setLanguage(this.mTipsClose);
	
        this.setLanguage(this.mTipsBuy);
	
        //文本多语言
        this.setLanguage(this.moonNum)
	
        this.setLanguage(this.goldNum)
	
        this.setLanguage(this.silverNum)
	
        this.setLanguage(this.mTipsItemName)
	
        this.setLanguage(this.mTipsItemState)
	
        this.setLanguage(this.mTipsDesc)
	
        this.setLanguage(this.mTipsPrice)
	
        this.setLanguage(this.mTipsBuyText)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTips/TextBlock") as mw.TextBlock);
	

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