﻿/**aits-ignore */


@UIBind('UI/fly/FlyIcon.ui')
export default class FlyIcon_generate extends UIScript {
    protected readonly _myUIName: string = "FlyIcon";
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

    	private canvasIcon_Internal: mw.Canvas
	public get canvasIcon(): mw.Canvas {
		if(!this.canvasIcon_Internal&&this.uiWidgetBase) {
			this.canvasIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIcon') as mw.Canvas
		}
		return this.canvasIcon_Internal
	}
	private imgBg_Internal: mw.Image
	public get imgBg(): mw.Image {
		if(!this.imgBg_Internal&&this.uiWidgetBase) {
			this.imgBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIcon/imgBg') as mw.Image
		}
		return this.imgBg_Internal
	}
	private textFont_Internal: mw.TextBlock
	public get textFont(): mw.TextBlock {
		if(!this.textFont_Internal&&this.uiWidgetBase) {
			this.textFont_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasIcon/textFont') as mw.TextBlock
		}
		return this.textFont_Internal
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
        this.setLanguage(this.textFont)
	

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