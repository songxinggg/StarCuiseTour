﻿/**aits-ignore */


@UIBind('UI/uiTemplate/Guide/Chat.ui')
export default class Chat_generate extends UIScript {
    protected readonly _myUIName: string = "Chat";
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

    	private mImg_Role_Internal: mw.Image
	public get mImg_Role(): mw.Image {
		if(!this.mImg_Role_Internal&&this.uiWidgetBase) {
			this.mImg_Role_Internal = this.uiWidgetBase.findChildByPath('Canvas/mImg_Role') as mw.Image
		}
		return this.mImg_Role_Internal
	}
	private mCanvas_Dialogue_Internal: mw.Canvas
	public get mCanvas_Dialogue(): mw.Canvas {
		if(!this.mCanvas_Dialogue_Internal&&this.uiWidgetBase) {
			this.mCanvas_Dialogue_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Dialogue') as mw.Canvas
		}
		return this.mCanvas_Dialogue_Internal
	}
	private mImg_Dialogue_BG_Internal: mw.Image
	public get mImg_Dialogue_BG(): mw.Image {
		if(!this.mImg_Dialogue_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Dialogue_BG_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Dialogue/mImg_Dialogue_BG') as mw.Image
		}
		return this.mImg_Dialogue_BG_Internal
	}
	private mTxt_Name_Internal: mw.TextBlock
	public get mTxt_Name(): mw.TextBlock {
		if(!this.mTxt_Name_Internal&&this.uiWidgetBase) {
			this.mTxt_Name_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Dialogue/mTxt_Name') as mw.TextBlock
		}
		return this.mTxt_Name_Internal
	}
	private mTxt_Talk_Internal: mw.TextBlock
	public get mTxt_Talk(): mw.TextBlock {
		if(!this.mTxt_Talk_Internal&&this.uiWidgetBase) {
			this.mTxt_Talk_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Dialogue/mTxt_Talk') as mw.TextBlock
		}
		return this.mTxt_Talk_Internal
	}
	private mTxt_Name_1_Internal: mw.TextBlock
	public get mTxt_Name_1(): mw.TextBlock {
		if(!this.mTxt_Name_1_Internal&&this.uiWidgetBase) {
			this.mTxt_Name_1_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Dialogue/mTxt_Name_1') as mw.TextBlock
		}
		return this.mTxt_Name_1_Internal
	}
	private mCanvas_Choose_Internal: mw.Canvas
	public get mCanvas_Choose(): mw.Canvas {
		if(!this.mCanvas_Choose_Internal&&this.uiWidgetBase) {
			this.mCanvas_Choose_Internal = this.uiWidgetBase.findChildByPath('Canvas/mCanvas_Choose') as mw.Canvas
		}
		return this.mCanvas_Choose_Internal
	}
	private mBtn_Next_Internal: mw.Button
	public get mBtn_Next(): mw.Button {
		if(!this.mBtn_Next_Internal&&this.uiWidgetBase) {
			this.mBtn_Next_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_Next') as mw.Button
		}
		return this.mBtn_Next_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.mBtn_Next.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn_Next");
        })
        this.mBtn_Next.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_Next");
        })
        this.mBtn_Next.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_Next");
        })
        this.mBtn_Next.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mCanvas_Dialogue/Btn_Next") as mw.StaleButton);
	
        //文本多语言
        this.setLanguage(this.mTxt_Name)
	
        this.setLanguage(this.mTxt_Talk)
	
        this.setLanguage(this.mTxt_Name_1)
	

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