﻿/**aits-ignore */


@UIBind('UI/TestUI.ui')
export default class TestUI_generate extends UIScript {
    protected readonly _myUIName: string = "TestUI";
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

    	private pwdInput_Internal: mw.InputBox
	public get pwdInput(): mw.InputBox {
		if(!this.pwdInput_Internal&&this.uiWidgetBase) {
			this.pwdInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/pwdInput') as mw.InputBox
		}
		return this.pwdInput_Internal
	}
	private sureBtn_Internal: mw.StaleButton
	public get sureBtn(): mw.StaleButton {
		if(!this.sureBtn_Internal&&this.uiWidgetBase) {
			this.sureBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/sureBtn') as mw.StaleButton
		}
		return this.sureBtn_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.sureBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "sureBtn");
        })
        this.sureBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "sureBtn");
        })
        this.sureBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "sureBtn");
        })
        this.sureBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.sureBtn);
	
        //文本多语言

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