﻿/**aits-ignore */


@UIBind('UI/SettingUI.ui')
export default class SettingUI_generate extends UIScript {
    protected readonly _myUIName: string = "SettingUI";
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

    	private mask_Internal: mw.Image
	public get mask(): mw.Image {
		if(!this.mask_Internal&&this.uiWidgetBase) {
			this.mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mask') as mw.Image
		}
		return this.mask_Internal
	}
	private mLabelBtn2_Internal: mw.Button
	public get mLabelBtn2(): mw.Button {
		if(!this.mLabelBtn2_Internal&&this.uiWidgetBase) {
			this.mLabelBtn2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mLabelBtn2') as mw.Button
		}
		return this.mLabelBtn2_Internal
	}
	private mBtn_Exit_Internal: mw.Button
	public get mBtn_Exit(): mw.Button {
		if(!this.mBtn_Exit_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mBtn_Exit') as mw.Button
		}
		return this.mBtn_Exit_Internal
	}
	private mCanvasSound_Internal: mw.Canvas
	public get mCanvasSound(): mw.Canvas {
		if(!this.mCanvasSound_Internal&&this.uiWidgetBase) {
			this.mCanvasSound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound') as mw.Canvas
		}
		return this.mCanvasSound_Internal
	}
	private mBar_Music_Internal: mw.ProgressBar
	public get mBar_Music(): mw.ProgressBar {
		if(!this.mBar_Music_Internal&&this.uiWidgetBase) {
			this.mBar_Music_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_Music') as mw.ProgressBar
		}
		return this.mBar_Music_Internal
	}
	private mBar_Sound_Internal: mw.ProgressBar
	public get mBar_Sound(): mw.ProgressBar {
		if(!this.mBar_Sound_Internal&&this.uiWidgetBase) {
			this.mBar_Sound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_Sound') as mw.ProgressBar
		}
		return this.mBar_Sound_Internal
	}
	private qualitytext_Internal: mw.Image
	public get qualitytext(): mw.Image {
		if(!this.qualitytext_Internal&&this.uiWidgetBase) {
			this.qualitytext_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/qualitytext') as mw.Image
		}
		return this.qualitytext_Internal
	}
	private mBar_GraphicsLev_Internal: mw.ProgressBar
	public get mBar_GraphicsLev(): mw.ProgressBar {
		if(!this.mBar_GraphicsLev_Internal&&this.uiWidgetBase) {
			this.mBar_GraphicsLev_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_single/mCanvasSound/mBar_GraphicsLev') as mw.ProgressBar
		}
		return this.mBar_GraphicsLev_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.mLabelBtn2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mLabelBtn2");
        })
        this.mLabelBtn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mLabelBtn2");
        })
        this.mLabelBtn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mLabelBtn2");
        })
        this.mLabelBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn_Exit.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn_Exit");
        })
        this.mBtn_Exit.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_Exit");
        })
        this.mBtn_Exit.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_Exit");
        })
        this.mBtn_Exit.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mLabelBtn2/TextBlock_3") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock_1") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_single/mCanvasSound/TextBlock_7") as mw.TextBlock);
	

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