﻿/**aits-ignore */


@UIBind('UI/bag/GoodsItem.ui')
export default class GoodsItem_generate extends UIScript {
    protected readonly _myUIName: string = "GoodsItem";
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

    	private mBg_Internal: mw.Image
	public get mBg(): mw.Image {
		if(!this.mBg_Internal&&this.uiWidgetBase) {
			this.mBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBg') as mw.Image
		}
		return this.mBg_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mSelect_Internal: mw.Image
	public get mSelect(): mw.Image {
		if(!this.mSelect_Internal&&this.uiWidgetBase) {
			this.mSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelect') as mw.Image
		}
		return this.mSelect_Internal
	}
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mClose_Internal: mw.StaleButton
	public get mClose(): mw.StaleButton {
		if(!this.mClose_Internal&&this.uiWidgetBase) {
			this.mClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClose') as mw.StaleButton
		}
		return this.mClose_Internal
	}
	private mInfoCon_Internal: mw.Canvas
	public get mInfoCon(): mw.Canvas {
		if(!this.mInfoCon_Internal&&this.uiWidgetBase) {
			this.mInfoCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInfoCon') as mw.Canvas
		}
		return this.mInfoCon_Internal
	}
	private mBottom_Internal: mw.Image
	public get mBottom(): mw.Image {
		if(!this.mBottom_Internal&&this.uiWidgetBase) {
			this.mBottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInfoCon/mBottom') as mw.Image
		}
		return this.mBottom_Internal
	}
	private mInfo_Internal: mw.TextBlock
	public get mInfo(): mw.TextBlock {
		if(!this.mInfo_Internal&&this.uiWidgetBase) {
			this.mInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInfoCon/mInfo') as mw.TextBlock
		}
		return this.mInfo_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
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
	
        this.mClose.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mClose");
        })
        this.mClose.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mClose");
        })
        this.mClose.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mClose");
        })
        this.mClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBtn);
	
        this.setLanguage(this.mClose);
	
        //文本多语言
        this.setLanguage(this.mInfo)
	

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