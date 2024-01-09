﻿/**aits-ignore */


@UIBind('UI/guideModule/GuideModuleUI.ui')
export default class GuideModuleUI_generate extends UIScript {
    protected readonly _myUIName: string = "GuideModuleUI";
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

    	private mLeftMask_Internal: mw.StaleButton
	public get mLeftMask(): mw.StaleButton {
		if(!this.mLeftMask_Internal&&this.uiWidgetBase) {
			this.mLeftMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mLeftMask') as mw.StaleButton
		}
		return this.mLeftMask_Internal
	}
	private mTopMask_Internal: mw.StaleButton
	public get mTopMask(): mw.StaleButton {
		if(!this.mTopMask_Internal&&this.uiWidgetBase) {
			this.mTopMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTopMask') as mw.StaleButton
		}
		return this.mTopMask_Internal
	}
	private mButtomMask_Internal: mw.StaleButton
	public get mButtomMask(): mw.StaleButton {
		if(!this.mButtomMask_Internal&&this.uiWidgetBase) {
			this.mButtomMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mButtomMask') as mw.StaleButton
		}
		return this.mButtomMask_Internal
	}
	private mRightMask_Internal: mw.StaleButton
	public get mRightMask(): mw.StaleButton {
		if(!this.mRightMask_Internal&&this.uiWidgetBase) {
			this.mRightMask_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mRightMask') as mw.StaleButton
		}
		return this.mRightMask_Internal
	}
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mBtnHand_Internal: mw.Image
	public get mBtnHand(): mw.Image {
		if(!this.mBtnHand_Internal&&this.uiWidgetBase) {
			this.mBtnHand_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnHand') as mw.Image
		}
		return this.mBtnHand_Internal
	}
	private mTextHand_Internal: mw.TextBlock
	public get mTextHand(): mw.TextBlock {
		if(!this.mTextHand_Internal&&this.uiWidgetBase) {
			this.mTextHand_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTextHand') as mw.TextBlock
		}
		return this.mTextHand_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mLeftMask.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
        })
        this.mLeftMask.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mLeftMask");
        })
        this.mLeftMask.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mLeftMask");
        })
        this.mLeftMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mTopMask.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTopMask");
        })
        this.mTopMask.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTopMask");
        })
        this.mTopMask.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTopMask");
        })
        this.mTopMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mButtomMask.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
        })
        this.mButtomMask.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mButtomMask");
        })
        this.mButtomMask.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mButtomMask");
        })
        this.mButtomMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mRightMask.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mRightMask");
        })
        this.mRightMask.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mRightMask");
        })
        this.mRightMask.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mRightMask");
        })
        this.mRightMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn");
        })
        this.mBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn");
        })
        this.mBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn");
        })
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mLeftMask);
	
        this.setLanguage(this.mTopMask);
	
        this.setLanguage(this.mButtomMask);
	
        this.setLanguage(this.mRightMask);
	
        this.setLanguage(this.mBtn);
	
        //文本多语言
        this.setLanguage(this.mTextHand)
	

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