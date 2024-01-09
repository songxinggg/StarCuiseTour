﻿/**aits-ignore */


@UIBind('UI/uiTemplate/gameModule/Settle.ui')
export default class Settle_generate extends UIScript {
    protected readonly _myUIName: string = "Settle";
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

    	private mConent_Internal: mw.Canvas
	public get mConent(): mw.Canvas {
		if(!this.mConent_Internal&&this.uiWidgetBase) {
			this.mConent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/mConent') as mw.Canvas
		}
		return this.mConent_Internal
	}
	private mConent2_Internal: mw.Canvas
	public get mConent2(): mw.Canvas {
		if(!this.mConent2_Internal&&this.uiWidgetBase) {
			this.mConent2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConent2') as mw.Canvas
		}
		return this.mConent2_Internal
	}
	private okBtn_Internal: mw.StaleButton
	public get okBtn(): mw.StaleButton {
		if(!this.okBtn_Internal&&this.uiWidgetBase) {
			this.okBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/okBtn') as mw.StaleButton
		}
		return this.okBtn_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.okBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "okBtn");
        })
        this.okBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "okBtn");
        })
        this.okBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "okBtn");
        })
        this.okBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.okBtn);
	
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1_1") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1_2") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_2") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1_3") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/TextBlock_1_3_1") as mw.TextBlock);
	

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