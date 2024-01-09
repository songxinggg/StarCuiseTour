﻿/**aits-ignore */


@UIBind('UI/uiTemplate/GM/GMItem.ui')
export default class GMItem_generate extends UIScript {
    protected readonly _myUIName: string = "GMItem";
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

    	private button_Internal: mw.StaleButton
	public get button(): mw.StaleButton {
		if(!this.button_Internal&&this.uiWidgetBase) {
			this.button_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/button') as mw.StaleButton
		}
		return this.button_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.button.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "button");
        })
        this.button.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "button");
        })
        this.button.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "button");
        })
        this.button.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.button);
	
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