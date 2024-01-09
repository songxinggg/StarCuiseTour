﻿/**aits-ignore */


@UIBind('UI/facadModule/FacadTip.ui')
export default class FacadTip_generate extends UIScript {
    protected readonly _myUIName: string = "FacadTip";
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

    	private mExitTip_Internal: mw.Canvas
	public get mExitTip(): mw.Canvas {
		if(!this.mExitTip_Internal&&this.uiWidgetBase) {
			this.mExitTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExitTip') as mw.Canvas
		}
		return this.mExitTip_Internal
	}
	private mExitYes_Internal: mw.StaleButton
	public get mExitYes(): mw.StaleButton {
		if(!this.mExitYes_Internal&&this.uiWidgetBase) {
			this.mExitYes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExitTip/mExitYes') as mw.StaleButton
		}
		return this.mExitYes_Internal
	}
	private mExitNo_Internal: mw.StaleButton
	public get mExitNo(): mw.StaleButton {
		if(!this.mExitNo_Internal&&this.uiWidgetBase) {
			this.mExitNo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExitTip/mExitNo') as mw.StaleButton
		}
		return this.mExitNo_Internal
	}
	private mConfirmTip_Internal: mw.Canvas
	public get mConfirmTip(): mw.Canvas {
		if(!this.mConfirmTip_Internal&&this.uiWidgetBase) {
			this.mConfirmTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConfirmTip') as mw.Canvas
		}
		return this.mConfirmTip_Internal
	}
	private mConfirmYes_Internal: mw.StaleButton
	public get mConfirmYes(): mw.StaleButton {
		if(!this.mConfirmYes_Internal&&this.uiWidgetBase) {
			this.mConfirmYes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConfirmTip/mConfirmYes') as mw.StaleButton
		}
		return this.mConfirmYes_Internal
	}
	private mConfirmNo_Internal: mw.StaleButton
	public get mConfirmNo(): mw.StaleButton {
		if(!this.mConfirmNo_Internal&&this.uiWidgetBase) {
			this.mConfirmNo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConfirmTip/mConfirmNo') as mw.StaleButton
		}
		return this.mConfirmNo_Internal
	}
	private mBuyTip_Internal: mw.Canvas
	public get mBuyTip(): mw.Canvas {
		if(!this.mBuyTip_Internal&&this.uiWidgetBase) {
			this.mBuyTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyTip') as mw.Canvas
		}
		return this.mBuyTip_Internal
	}
	private mBuyImage_Internal: mw.Image
	public get mBuyImage(): mw.Image {
		if(!this.mBuyImage_Internal&&this.uiWidgetBase) {
			this.mBuyImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyTip/mBuyImage') as mw.Image
		}
		return this.mBuyImage_Internal
	}
	private mBuyBtn_Internal: mw.StaleButton
	public get mBuyBtn(): mw.StaleButton {
		if(!this.mBuyBtn_Internal&&this.uiWidgetBase) {
			this.mBuyBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyTip/mBuyBtn') as mw.StaleButton
		}
		return this.mBuyBtn_Internal
	}
	private left_Internal: mw.Image
	public get left(): mw.Image {
		if(!this.left_Internal&&this.uiWidgetBase) {
			this.left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyTip/left') as mw.Image
		}
		return this.left_Internal
	}
	private right_Internal: mw.Image
	public get right(): mw.Image {
		if(!this.right_Internal&&this.uiWidgetBase) {
			this.right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyTip/right') as mw.Image
		}
		return this.right_Internal
	}
	private mGetTip_Internal: mw.Canvas
	public get mGetTip(): mw.Canvas {
		if(!this.mGetTip_Internal&&this.uiWidgetBase) {
			this.mGetTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGetTip') as mw.Canvas
		}
		return this.mGetTip_Internal
	}
	private mGetImage_Internal: mw.Image
	public get mGetImage(): mw.Image {
		if(!this.mGetImage_Internal&&this.uiWidgetBase) {
			this.mGetImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGetTip/mGetImage') as mw.Image
		}
		return this.mGetImage_Internal
	}
	private mGetBtn_Internal: mw.StaleButton
	public get mGetBtn(): mw.StaleButton {
		if(!this.mGetBtn_Internal&&this.uiWidgetBase) {
			this.mGetBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGetTip/mGetBtn') as mw.StaleButton
		}
		return this.mGetBtn_Internal
	}
	private mGetTxt_Internal: mw.TextBlock
	public get mGetTxt(): mw.TextBlock {
		if(!this.mGetTxt_Internal&&this.uiWidgetBase) {
			this.mGetTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGetTip/mGetTxt') as mw.TextBlock
		}
		return this.mGetTxt_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mExitYes.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mExitYes");
        })
        this.mExitYes.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mExitYes");
        })
        this.mExitYes.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mExitYes");
        })
        this.mExitYes.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mExitNo.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mExitNo");
        })
        this.mExitNo.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mExitNo");
        })
        this.mExitNo.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mExitNo");
        })
        this.mExitNo.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mConfirmYes.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mConfirmYes");
        })
        this.mConfirmYes.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mConfirmYes");
        })
        this.mConfirmYes.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mConfirmYes");
        })
        this.mConfirmYes.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mConfirmNo.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mConfirmNo");
        })
        this.mConfirmNo.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mConfirmNo");
        })
        this.mConfirmNo.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mConfirmNo");
        })
        this.mConfirmNo.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
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
	
        this.mGetBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mGetBtn");
        })
        this.mGetBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mGetBtn");
        })
        this.mGetBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mGetBtn");
        })
        this.mGetBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mExitYes);
	
        this.setLanguage(this.mExitNo);
	
        this.setLanguage(this.mConfirmYes);
	
        this.setLanguage(this.mConfirmNo);
	
        this.setLanguage(this.mBuyBtn);
	
        this.setLanguage(this.mGetBtn);
	
        //文本多语言
        this.setLanguage(this.mGetTxt)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mExitTip/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mConfirmTip/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBuyTip/TextBlock_2") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mGetTip/TextBlock_1") as mw.TextBlock);
	

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