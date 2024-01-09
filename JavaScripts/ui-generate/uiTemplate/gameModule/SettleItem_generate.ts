﻿/**aits-ignore */


@UIBind('UI/uiTemplate/gameModule/SettleItem.ui')
export default class SettleItem_generate extends UIScript {
    protected readonly _myUIName: string = "SettleItem";
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

    	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private time_Internal: mw.TextBlock
	public get time(): mw.TextBlock {
		if(!this.time_Internal&&this.uiWidgetBase) {
			this.time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/time') as mw.TextBlock
		}
		return this.time_Internal
	}
	private value_Internal: mw.TextBlock
	public get value(): mw.TextBlock {
		if(!this.value_Internal&&this.uiWidgetBase) {
			this.value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_3/value') as mw.TextBlock
		}
		return this.value_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.name)
	
        this.setLanguage(this.time)
	
        this.setLanguage(this.value)
	

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