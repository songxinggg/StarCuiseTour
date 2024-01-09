﻿/**aits-ignore */


@UIBind('UI/bag/BagItem.ui')
export default class BagItem_generate extends UIScript {
    protected readonly _myUIName: string = "BagItem";
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
	private mBtn_Internal: mw.StaleButton
	public get mBtn(): mw.StaleButton {
		if(!this.mBtn_Internal&&this.uiWidgetBase) {
			this.mBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn') as mw.StaleButton
		}
		return this.mBtn_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mTips_Internal: mw.Button
	public get mTips(): mw.Button {
		if(!this.mTips_Internal&&this.uiWidgetBase) {
			this.mTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTips') as mw.Button
		}
		return this.mTips_Internal
	}
	private mSelect_Internal: mw.Image
	public get mSelect(): mw.Image {
		if(!this.mSelect_Internal&&this.uiWidgetBase) {
			this.mSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelect') as mw.Image
		}
		return this.mSelect_Internal
	}
	private mRemove_Internal: mw.Button
	public get mRemove(): mw.Button {
		if(!this.mRemove_Internal&&this.uiWidgetBase) {
			this.mRemove_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRemove') as mw.Button
		}
		return this.mRemove_Internal
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
	private mItemInfo_Internal: mw.TextBlock
	public get mItemInfo(): mw.TextBlock {
		if(!this.mItemInfo_Internal&&this.uiWidgetBase) {
			this.mItemInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInfoCon/mItemInfo') as mw.TextBlock
		}
		return this.mItemInfo_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mCanvasStar_Internal: mw.Canvas
	public get mCanvasStar(): mw.Canvas {
		if(!this.mCanvasStar_Internal&&this.uiWidgetBase) {
			this.mCanvasStar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasStar') as mw.Canvas
		}
		return this.mCanvasStar_Internal
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
	
        //按钮添加点击
        this.mTips.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mTips");
        })
        this.mTips.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mTips");
        })
        this.mTips.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mTips");
        })
        this.mTips.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mRemove.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mRemove");
        })
        this.mRemove.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mRemove");
        })
        this.mRemove.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mRemove");
        })
        this.mRemove.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBtn);
	
        //文本多语言
        this.setLanguage(this.mItemInfo)
	
        this.setLanguage(this.mName)
	

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