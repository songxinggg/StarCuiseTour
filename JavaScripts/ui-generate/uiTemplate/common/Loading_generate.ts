﻿/**aits-ignore */


@UIBind('UI/uiTemplate/common/Loading.ui')
export default class Loading_generate extends UIScript {
    protected readonly _myUIName: string = "Loading";
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

    	private mProgressBar_Internal: mw.ProgressBar
	public get mProgressBar(): mw.ProgressBar {
		if(!this.mProgressBar_Internal&&this.uiWidgetBase) {
			this.mProgressBar_Internal = this.uiWidgetBase.findChildByPath('Canvas/mLoading/mProgressBar') as mw.ProgressBar
		}
		return this.mProgressBar_Internal
	}
	private mMsg_txt_Internal: mw.TextBlock
	public get mMsg_txt(): mw.TextBlock {
		if(!this.mMsg_txt_Internal&&this.uiWidgetBase) {
			this.mMsg_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/mLoading/mMsg_txt') as mw.TextBlock
		}
		return this.mMsg_txt_Internal
	}
	private mLoading_Internal: mw.Canvas
	public get mLoading(): mw.Canvas {
		if(!this.mLoading_Internal&&this.uiWidgetBase) {
			this.mLoading_Internal = this.uiWidgetBase.findChildByPath('Canvas/mLoading') as mw.Canvas
		}
		return this.mLoading_Internal
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
        this.setLanguage(this.mMsg_txt)
	

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