﻿/**aits-ignore */


@UIBind('UI/uiTemplate/gameModule/HideSeekHud.ui')
export default class HideSeekHud_generate extends UIScript {
    protected readonly _myUIName: string = "HideSeekHud";
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

    	private blockTime_Internal: mw.TextBlock
	public get blockTime(): mw.TextBlock {
		if(!this.blockTime_Internal&&this.uiWidgetBase) {
			this.blockTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/blockTime') as mw.TextBlock
		}
		return this.blockTime_Internal
	}
	private time_Internal: mw.TextBlock
	public get time(): mw.TextBlock {
		if(!this.time_Internal&&this.uiWidgetBase) {
			this.time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/time') as mw.TextBlock
		}
		return this.time_Internal
	}
	private stateTxt_Internal: mw.TextBlock
	public get stateTxt(): mw.TextBlock {
		if(!this.stateTxt_Internal&&this.uiWidgetBase) {
			this.stateTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/stateTxt') as mw.TextBlock
		}
		return this.stateTxt_Internal
	}
	private contrallCanvas_Internal: mw.Canvas
	public get contrallCanvas(): mw.Canvas {
		if(!this.contrallCanvas_Internal&&this.uiWidgetBase) {
			this.contrallCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/contrallCanvas') as mw.Canvas
		}
		return this.contrallCanvas_Internal
	}
	private crouchBtn_Internal: mw.Button
	public get crouchBtn(): mw.Button {
		if(!this.crouchBtn_Internal&&this.uiWidgetBase) {
			this.crouchBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/contrallCanvas/crouchBtn') as mw.Button
		}
		return this.crouchBtn_Internal
	}
	private catchCanvas_Internal: mw.Canvas
	public get catchCanvas(): mw.Canvas {
		if(!this.catchCanvas_Internal&&this.uiWidgetBase) {
			this.catchCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/contrallCanvas/catchCanvas') as mw.Canvas
		}
		return this.catchCanvas_Internal
	}
	private cathchImg_Internal: mw.Image
	public get cathchImg(): mw.Image {
		if(!this.cathchImg_Internal&&this.uiWidgetBase) {
			this.cathchImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/contrallCanvas/catchCanvas/cathchImg') as mw.Image
		}
		return this.cathchImg_Internal
	}
	private catchBtn_Internal: mw.Button
	public get catchBtn(): mw.Button {
		if(!this.catchBtn_Internal&&this.uiWidgetBase) {
			this.catchBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/contrallCanvas/catchCanvas/catchBtn') as mw.Button
		}
		return this.catchBtn_Internal
	}
	private guideBtn_Internal: mw.MaskButton
	public get guideBtn(): mw.MaskButton {
		if(!this.guideBtn_Internal&&this.uiWidgetBase) {
			this.guideBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/contrallCanvas/catchCanvas/guideBtn') as mw.MaskButton
		}
		return this.guideBtn_Internal
	}
	private watchTxt_Internal: mw.TextBlock
	public get watchTxt(): mw.TextBlock {
		if(!this.watchTxt_Internal&&this.uiWidgetBase) {
			this.watchTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/watchTxt') as mw.TextBlock
		}
		return this.watchTxt_Internal
	}
	private battleInfoCanvas_Internal: mw.Canvas
	public get battleInfoCanvas(): mw.Canvas {
		if(!this.battleInfoCanvas_Internal&&this.uiWidgetBase) {
			this.battleInfoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/battleInfoCanvas') as mw.Canvas
		}
		return this.battleInfoCanvas_Internal
	}
	private loseNum_Internal: mw.TextBlock
	public get loseNum(): mw.TextBlock {
		if(!this.loseNum_Internal&&this.uiWidgetBase) {
			this.loseNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/battleInfoCanvas/loseNum') as mw.TextBlock
		}
		return this.loseNum_Internal
	}
	private catchNum_Internal: mw.TextBlock
	public get catchNum(): mw.TextBlock {
		if(!this.catchNum_Internal&&this.uiWidgetBase) {
			this.catchNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/battleInfoCanvas/catchNum') as mw.TextBlock
		}
		return this.catchNum_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.crouchBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "crouchBtn");
        })
        this.crouchBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "crouchBtn");
        })
        this.crouchBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "crouchBtn");
        })
        this.crouchBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.catchBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "catchBtn");
        })
        this.catchBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "catchBtn");
        })
        this.catchBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "catchBtn");
        })
        this.catchBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.blockTime)
	
        this.setLanguage(this.time)
	
        this.setLanguage(this.stateTxt)
	
        this.setLanguage(this.watchTxt)
	
        this.setLanguage(this.loseNum)
	
        this.setLanguage(this.catchNum)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/contrallCanvas/catchCanvas/TextBlock") as mw.TextBlock);
	

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