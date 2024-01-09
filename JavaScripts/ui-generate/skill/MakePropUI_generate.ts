﻿/**aits-ignore */


@UIBind('UI/skill/MakePropUI.ui')
export default class MakePropUI_generate extends UIScript {
    protected readonly _myUIName: string = "MakePropUI";
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

    	private mScroll_Internal: mw.ScrollBox
	public get mScroll(): mw.ScrollBox {
		if(!this.mScroll_Internal&&this.uiWidgetBase) {
			this.mScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScroll') as mw.ScrollBox
		}
		return this.mScroll_Internal
	}
	private mItemContent_Internal: mw.Canvas
	public get mItemContent(): mw.Canvas {
		if(!this.mItemContent_Internal&&this.uiWidgetBase) {
			this.mItemContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mScroll/mItemContent') as mw.Canvas
		}
		return this.mItemContent_Internal
	}
	private guideButton_Internal: mw.Button
	public get guideButton(): mw.Button {
		if(!this.guideButton_Internal&&this.uiWidgetBase) {
			this.guideButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/guideButton') as mw.Button
		}
		return this.guideButton_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.guideButton.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "guideButton");
        })
        this.guideButton.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "guideButton");
        })
        this.guideButton.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "guideButton");
        })
        this.guideButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
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