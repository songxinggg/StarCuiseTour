﻿/**aits-ignore */


@UIBind('UI/uiTemplate/gameModule/SignUI.ui')
export default class SignUI_generate extends UIScript {
    protected readonly _myUIName: string = "SignUI";
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

    	private mTime_Internal: mw.TextBlock
	public get mTime(): mw.TextBlock {
		if(!this.mTime_Internal&&this.uiWidgetBase) {
			this.mTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTime') as mw.TextBlock
		}
		return this.mTime_Internal
	}
	private invateCanvas_Internal: mw.Canvas
	public get invateCanvas(): mw.Canvas {
		if(!this.invateCanvas_Internal&&this.uiWidgetBase) {
			this.invateCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/invateCanvas') as mw.Canvas
		}
		return this.invateCanvas_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/invateCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mNoBtn_Internal: mw.StaleButton
	public get mNoBtn(): mw.StaleButton {
		if(!this.mNoBtn_Internal&&this.uiWidgetBase) {
			this.mNoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/invateCanvas/mNoBtn') as mw.StaleButton
		}
		return this.mNoBtn_Internal
	}
	private mYesBtn_Internal: mw.StaleButton
	public get mYesBtn(): mw.StaleButton {
		if(!this.mYesBtn_Internal&&this.uiWidgetBase) {
			this.mYesBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/invateCanvas/mYesBtn') as mw.StaleButton
		}
		return this.mYesBtn_Internal
	}
	private joinCanvas_Internal: mw.Canvas
	public get joinCanvas(): mw.Canvas {
		if(!this.joinCanvas_Internal&&this.uiWidgetBase) {
			this.joinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/joinCanvas') as mw.Canvas
		}
		return this.joinCanvas_Internal
	}
	private mPlayerNum_Internal: mw.TextBlock
	public get mPlayerNum(): mw.TextBlock {
		if(!this.mPlayerNum_Internal&&this.uiWidgetBase) {
			this.mPlayerNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/joinCanvas/mPlayerNum') as mw.TextBlock
		}
		return this.mPlayerNum_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mNoBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mNoBtn");
        })
        this.mNoBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mNoBtn");
        })
        this.mNoBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mNoBtn");
        })
        this.mNoBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mYesBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mYesBtn");
        })
        this.mYesBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mYesBtn");
        })
        this.mYesBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mYesBtn");
        })
        this.mYesBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mNoBtn);
	
        this.setLanguage(this.mYesBtn);
	
        //文本多语言
        this.setLanguage(this.mTime)
	
        this.setLanguage(this.mName)
	
        this.setLanguage(this.mPlayerNum)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/invateCanvas/TextBlock_3") as mw.TextBlock);
	

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