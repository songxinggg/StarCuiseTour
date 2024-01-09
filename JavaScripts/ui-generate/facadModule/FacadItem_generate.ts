﻿/**aits-ignore */


@UIBind('UI/facadModule/FacadItem.ui')
export default class FacadItem_generate extends UIScript {
    protected readonly _myUIName: string = "FacadItem";
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

    	private mBtnSelect_Internal: mw.StaleButton
	public get mBtnSelect(): mw.StaleButton {
		if(!this.mBtnSelect_Internal&&this.uiWidgetBase) {
			this.mBtnSelect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnSelect') as mw.StaleButton
		}
		return this.mBtnSelect_Internal
	}
	private mImgBG_Internal: mw.Image
	public get mImgBG(): mw.Image {
		if(!this.mImgBG_Internal&&this.uiWidgetBase) {
			this.mImgBG_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mImgBG') as mw.Image
		}
		return this.mImgBG_Internal
	}
	private mIconStroke_Internal: mw.Image
	public get mIconStroke(): mw.Image {
		if(!this.mIconStroke_Internal&&this.uiWidgetBase) {
			this.mIconStroke_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mIconStroke') as mw.Image
		}
		return this.mIconStroke_Internal
	}
	private mQuality_Internal: mw.Image
	public get mQuality(): mw.Image {
		if(!this.mQuality_Internal&&this.uiWidgetBase) {
			this.mQuality_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mQuality') as mw.Image
		}
		return this.mQuality_Internal
	}
	private mImgIcon_Internal: mw.Image
	public get mImgIcon(): mw.Image {
		if(!this.mImgIcon_Internal&&this.uiWidgetBase) {
			this.mImgIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mImgIcon') as mw.Image
		}
		return this.mImgIcon_Internal
	}
	private mItemName_Internal: mw.TextBlock
	public get mItemName(): mw.TextBlock {
		if(!this.mItemName_Internal&&this.uiWidgetBase) {
			this.mItemName_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mItemName') as mw.TextBlock
		}
		return this.mItemName_Internal
	}
	private mTextDesc_Internal: mw.TextBlock
	public get mTextDesc(): mw.TextBlock {
		if(!this.mTextDesc_Internal&&this.uiWidgetBase) {
			this.mTextDesc_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mTextDesc') as mw.TextBlock
		}
		return this.mTextDesc_Internal
	}
	private mSelect_Internal: mw.Image
	public get mSelect(): mw.Image {
		if(!this.mSelect_Internal&&this.uiWidgetBase) {
			this.mSelect_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mSelect') as mw.Image
		}
		return this.mSelect_Internal
	}
	private mBuyCon_Internal: mw.Canvas
	public get mBuyCon(): mw.Canvas {
		if(!this.mBuyCon_Internal&&this.uiWidgetBase) {
			this.mBuyCon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBuyCon') as mw.Canvas
		}
		return this.mBuyCon_Internal
	}
	private mbtnUse_Internal: mw.StaleButton
	public get mbtnUse(): mw.StaleButton {
		if(!this.mbtnUse_Internal&&this.uiWidgetBase) {
			this.mbtnUse_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBuyCon/mbtnUse') as mw.StaleButton
		}
		return this.mbtnUse_Internal
	}
	private mPrice_Internal: mw.TextBlock
	public get mPrice(): mw.TextBlock {
		if(!this.mPrice_Internal&&this.uiWidgetBase) {
			this.mPrice_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBuyCon/mPrice') as mw.TextBlock
		}
		return this.mPrice_Internal
	}
	private mImgGold_Internal: mw.Image
	public get mImgGold(): mw.Image {
		if(!this.mImgGold_Internal&&this.uiWidgetBase) {
			this.mImgGold_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBuyCon/mImgGold') as mw.Image
		}
		return this.mImgGold_Internal
	}
	private mYHDtxt_Internal: mw.TextBlock
	public get mYHDtxt(): mw.TextBlock {
		if(!this.mYHDtxt_Internal&&this.uiWidgetBase) {
			this.mYHDtxt_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBuyCon/mYHDtxt') as mw.TextBlock
		}
		return this.mYHDtxt_Internal
	}
	private mHDHDtxt_Internal: mw.TextBlock
	public get mHDHDtxt(): mw.TextBlock {
		if(!this.mHDHDtxt_Internal&&this.uiWidgetBase) {
			this.mHDHDtxt_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBuyCon/mHDHDtxt') as mw.TextBlock
		}
		return this.mHDHDtxt_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mBtnSelect.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnSelect");
        })
        this.mBtnSelect.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnSelect");
        })
        this.mBtnSelect.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnSelect");
        })
        this.mBtnSelect.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mbtnUse.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mbtnUse");
        })
        this.mbtnUse.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mbtnUse");
        })
        this.mbtnUse.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mbtnUse");
        })
        this.mbtnUse.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBtnSelect);
	
        this.setLanguage(this.mbtnUse);
	
        //文本多语言
        this.setLanguage(this.mItemName)
	
        this.setLanguage(this.mTextDesc)
	
        this.setLanguage(this.mPrice)
	
        this.setLanguage(this.mYHDtxt)
	
        this.setLanguage(this.mHDHDtxt)
	

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