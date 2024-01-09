﻿/**aits-ignore */


@UIBind('UI/bag/BagInteraction.ui')
export default class BagInteraction_generate extends UIScript {
    protected readonly _myUIName: string = "BagInteraction";
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

    	private mBtnInvite_Internal: mw.Button
	public get mBtnInvite(): mw.Button {
		if(!this.mBtnInvite_Internal&&this.uiWidgetBase) {
			this.mBtnInvite_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtnInvite') as mw.Button
		}
		return this.mBtnInvite_Internal
	}
	private acceptCon_Internal: mw.Canvas
	public get acceptCon(): mw.Canvas {
		if(!this.acceptCon_Internal&&this.uiWidgetBase) {
			this.acceptCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/acceptCon') as mw.Canvas
		}
		return this.acceptCon_Internal
	}
	private headImg_Internal: mw.Image
	public get headImg(): mw.Image {
		if(!this.headImg_Internal&&this.uiWidgetBase) {
			this.headImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/acceptCon/headImg') as mw.Image
		}
		return this.headImg_Internal
	}
	private nameText_Internal: mw.TextBlock
	public get nameText(): mw.TextBlock {
		if(!this.nameText_Internal&&this.uiWidgetBase) {
			this.nameText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/acceptCon/nameText') as mw.TextBlock
		}
		return this.nameText_Internal
	}
	private descText_Internal: mw.TextBlock
	public get descText(): mw.TextBlock {
		if(!this.descText_Internal&&this.uiWidgetBase) {
			this.descText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/acceptCon/descText') as mw.TextBlock
		}
		return this.descText_Internal
	}
	private yesBtn_Internal: mw.StaleButton
	public get yesBtn(): mw.StaleButton {
		if(!this.yesBtn_Internal&&this.uiWidgetBase) {
			this.yesBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/acceptCon/yesBtn') as mw.StaleButton
		}
		return this.yesBtn_Internal
	}
	private noBtn_Internal: mw.StaleButton
	public get noBtn(): mw.StaleButton {
		if(!this.noBtn_Internal&&this.uiWidgetBase) {
			this.noBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/acceptCon/noBtn') as mw.StaleButton
		}
		return this.noBtn_Internal
	}
	private mConInvite_Internal: mw.Canvas
	public get mConInvite(): mw.Canvas {
		if(!this.mConInvite_Internal&&this.uiWidgetBase) {
			this.mConInvite_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite') as mw.Canvas
		}
		return this.mConInvite_Internal
	}
	private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private listCon_Internal: mw.Canvas
	public get listCon(): mw.Canvas {
		if(!this.listCon_Internal&&this.uiWidgetBase) {
			this.listCon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/listCon') as mw.Canvas
		}
		return this.listCon_Internal
	}
	private mScroll_Internal: mw.ScrollBox
	public get mScroll(): mw.ScrollBox {
		if(!this.mScroll_Internal&&this.uiWidgetBase) {
			this.mScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/listCon/mScroll') as mw.ScrollBox
		}
		return this.mScroll_Internal
	}
	private content_Internal: mw.Canvas
	public get content(): mw.Canvas {
		if(!this.content_Internal&&this.uiWidgetBase) {
			this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/listCon/mScroll/content') as mw.Canvas
		}
		return this.content_Internal
	}
	private mTitle_Internal: mw.TextBlock
	public get mTitle(): mw.TextBlock {
		if(!this.mTitle_Internal&&this.uiWidgetBase) {
			this.mTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/mTitle') as mw.TextBlock
		}
		return this.mTitle_Internal
	}
	private mNoneText_Internal: mw.TextBlock
	public get mNoneText(): mw.TextBlock {
		if(!this.mNoneText_Internal&&this.uiWidgetBase) {
			this.mNoneText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/mNoneText') as mw.TextBlock
		}
		return this.mNoneText_Internal
	}
	private star_Internal: mw.Image
	public get star(): mw.Image {
		if(!this.star_Internal&&this.uiWidgetBase) {
			this.star_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mConInvite/star') as mw.Image
		}
		return this.star_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.yesBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "yesBtn");
        })
        this.yesBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "yesBtn");
        })
        this.yesBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "yesBtn");
        })
        this.yesBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.noBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "noBtn");
        })
        this.noBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "noBtn");
        })
        this.noBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "noBtn");
        })
        this.noBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.mBtnInvite.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnInvite");
        })
        this.mBtnInvite.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnInvite");
        })
        this.mBtnInvite.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnInvite");
        })
        this.mBtnInvite.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.closeBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "closeBtn");
        })
        this.closeBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "closeBtn");
        })
        this.closeBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "closeBtn");
        })
        this.closeBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.yesBtn);
	
        this.setLanguage(this.noBtn);
	
        //文本多语言
        this.setLanguage(this.nameText)
	
        this.setLanguage(this.descText)
	
        this.setLanguage(this.mTitle)
	
        this.setLanguage(this.mNoneText)
	

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