﻿/**aits-ignore */


@UIBind('UI/bag/ItemTips.ui')
export default class ItemTips_generate extends UIScript {
    protected readonly _myUIName: string = "ItemTips";
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

    	private mClose_Internal: mw.Button
	public get mClose(): mw.Button {
		if(!this.mClose_Internal&&this.uiWidgetBase) {
			this.mClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mClose') as mw.Button
		}
		return this.mClose_Internal
	}
	private mDetail_Internal: mw.Canvas
	public get mDetail(): mw.Canvas {
		if(!this.mDetail_Internal&&this.uiWidgetBase) {
			this.mDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail') as mw.Canvas
		}
		return this.mDetail_Internal
	}
	private detailBG_Internal: mw.Image
	public get detailBG(): mw.Image {
		if(!this.detailBG_Internal&&this.uiWidgetBase) {
			this.detailBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/detailBG') as mw.Image
		}
		return this.detailBG_Internal
	}
	private mDetailText_Internal: mw.TextBlock
	public get mDetailText(): mw.TextBlock {
		if(!this.mDetailText_Internal&&this.uiWidgetBase) {
			this.mDetailText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailText') as mw.TextBlock
		}
		return this.mDetailText_Internal
	}
	private mBG_Internal: mw.Image
	public get mBG(): mw.Image {
		if(!this.mBG_Internal&&this.uiWidgetBase) {
			this.mBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mBG') as mw.Image
		}
		return this.mBG_Internal
	}
	private mDetailIcon_Internal: mw.Image
	public get mDetailIcon(): mw.Image {
		if(!this.mDetailIcon_Internal&&this.uiWidgetBase) {
			this.mDetailIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailIcon') as mw.Image
		}
		return this.mDetailIcon_Internal
	}
	private mDetailClose_Internal: mw.Button
	public get mDetailClose(): mw.Button {
		if(!this.mDetailClose_Internal&&this.uiWidgetBase) {
			this.mDetailClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailClose') as mw.Button
		}
		return this.mDetailClose_Internal
	}
	private mDetailName_Internal: mw.TextBlock
	public get mDetailName(): mw.TextBlock {
		if(!this.mDetailName_Internal&&this.uiWidgetBase) {
			this.mDetailName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailName') as mw.TextBlock
		}
		return this.mDetailName_Internal
	}
	private mDetailStar_Internal: mw.Canvas
	public get mDetailStar(): mw.Canvas {
		if(!this.mDetailStar_Internal&&this.uiWidgetBase) {
			this.mDetailStar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDetail/mDetailStar') as mw.Canvas
		}
		return this.mDetailStar_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
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
	
        this.mDetailClose.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mDetailClose");
        })
        this.mDetailClose.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mDetailClose");
        })
        this.mDetailClose.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mDetailClose");
        })
        this.mDetailClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.mDetailText)
	
        this.setLanguage(this.mDetailName)
	

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