﻿/**aits-ignore */


@UIBind('UI/facadModule/WearItem.ui')
export default class WearItem_generate extends UIScript {
    protected readonly _myUIName: string = "WearItem";
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

    	private mWearItem_Internal: mw.Canvas
	public get mWearItem(): mw.Canvas {
		if(!this.mWearItem_Internal&&this.uiWidgetBase) {
			this.mWearItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem') as mw.Canvas
		}
		return this.mWearItem_Internal
	}
	private mImgBG_Internal: mw.Image
	public get mImgBG(): mw.Image {
		if(!this.mImgBG_Internal&&this.uiWidgetBase) {
			this.mImgBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mImgBG') as mw.Image
		}
		return this.mImgBG_Internal
	}
	private mWearImg_Internal: mw.Image
	public get mWearImg(): mw.Image {
		if(!this.mWearImg_Internal&&this.uiWidgetBase) {
			this.mWearImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mWearImg') as mw.Image
		}
		return this.mWearImg_Internal
	}
	private mPrice_Internal: mw.TextBlock
	public get mPrice(): mw.TextBlock {
		if(!this.mPrice_Internal&&this.uiWidgetBase) {
			this.mPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mPrice') as mw.TextBlock
		}
		return this.mPrice_Internal
	}
	private mGoldImg_Internal: mw.Image
	public get mGoldImg(): mw.Image {
		if(!this.mGoldImg_Internal&&this.uiWidgetBase) {
			this.mGoldImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mGoldImg') as mw.Image
		}
		return this.mGoldImg_Internal
	}
	private mCloseBtn_Internal: mw.Button
	public get mCloseBtn(): mw.Button {
		if(!this.mCloseBtn_Internal&&this.uiWidgetBase) {
			this.mCloseBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mCloseBtn') as mw.Button
		}
		return this.mCloseBtn_Internal
	}
	private mGetTip_Internal: mw.TextBlock
	public get mGetTip(): mw.TextBlock {
		if(!this.mGetTip_Internal&&this.uiWidgetBase) {
			this.mGetTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWearItem/mGetTip') as mw.TextBlock
		}
		return this.mGetTip_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.mCloseBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mCloseBtn");
        })
        this.mCloseBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mCloseBtn");
        })
        this.mCloseBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mCloseBtn");
        })
        this.mCloseBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.mPrice)
	
        this.setLanguage(this.mGetTip)
	

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