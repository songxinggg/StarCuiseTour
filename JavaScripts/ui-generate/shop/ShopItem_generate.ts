﻿/**aits-ignore */


@UIBind('UI/shop/ShopItem.ui')
export default class ShopItem_generate extends UIScript {
    protected readonly _myUIName: string = "ShopItem";
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

    	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('Canvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mBg_Internal: mw.Image
	public get mBg(): mw.Image {
		if(!this.mBg_Internal&&this.uiWidgetBase) {
			this.mBg_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBg') as mw.Image
		}
		return this.mBg_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mNew_Internal: mw.TextBlock
	public get mNew(): mw.TextBlock {
		if(!this.mNew_Internal&&this.uiWidgetBase) {
			this.mNew_Internal = this.uiWidgetBase.findChildByPath('Canvas/mNew') as mw.TextBlock
		}
		return this.mNew_Internal
	}
	private mHalo_Internal: mw.Image
	public get mHalo(): mw.Image {
		if(!this.mHalo_Internal&&this.uiWidgetBase) {
			this.mHalo_Internal = this.uiWidgetBase.findChildByPath('Canvas/mHalo') as mw.Image
		}
		return this.mHalo_Internal
	}
	private mClickBtn_Internal: mw.StaleButton
	public get mClickBtn(): mw.StaleButton {
		if(!this.mClickBtn_Internal&&this.uiWidgetBase) {
			this.mClickBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mClickBtn') as mw.StaleButton
		}
		return this.mClickBtn_Internal
	}
	private mState_Internal: mw.TextBlock
	public get mState(): mw.TextBlock {
		if(!this.mState_Internal&&this.uiWidgetBase) {
			this.mState_Internal = this.uiWidgetBase.findChildByPath('Canvas/mState') as mw.TextBlock
		}
		return this.mState_Internal
	}
	private mMoney_Internal: mw.Image
	public get mMoney(): mw.Image {
		if(!this.mMoney_Internal&&this.uiWidgetBase) {
			this.mMoney_Internal = this.uiWidgetBase.findChildByPath('Canvas/mMoney') as mw.Image
		}
		return this.mMoney_Internal
	}
	private mPrice_Internal: mw.TextBlock
	public get mPrice(): mw.TextBlock {
		if(!this.mPrice_Internal&&this.uiWidgetBase) {
			this.mPrice_Internal = this.uiWidgetBase.findChildByPath('Canvas/mPrice') as mw.TextBlock
		}
		return this.mPrice_Internal
	}
	private mCount_Internal: mw.TextBlock
	public get mCount(): mw.TextBlock {
		if(!this.mCount_Internal&&this.uiWidgetBase) {
			this.mCount_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCount') as mw.TextBlock
		}
		return this.mCount_Internal
	}
	private mCanvasStar_Internal: mw.Canvas
	public get mCanvasStar(): mw.Canvas {
		if(!this.mCanvasStar_Internal&&this.uiWidgetBase) {
			this.mCanvasStar_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvasStar') as mw.Canvas
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
        this.mClickBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mClickBtn");
        })
        this.mClickBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mClickBtn");
        })
        this.mClickBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mClickBtn");
        })
        this.mClickBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mClickBtn);
	
        //文本多语言
        this.setLanguage(this.mName)
	
        this.setLanguage(this.mNew)
	
        this.setLanguage(this.mState)
	
        this.setLanguage(this.mPrice)
	
        this.setLanguage(this.mCount)
	

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