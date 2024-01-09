﻿/**aits-ignore */


@UIBind('UI/facadModule/FacadMain.ui')
export default class FacadMain_generate extends UIScript {
    protected readonly _myUIName: string = "FacadMain";
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

    	private btn0_Internal: mw.StaleButton
	public get btn0(): mw.StaleButton {
		if(!this.btn0_Internal&&this.uiWidgetBase) {
			this.btn0_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn0') as mw.StaleButton
		}
		return this.btn0_Internal
	}
	private btn1_Internal: mw.StaleButton
	public get btn1(): mw.StaleButton {
		if(!this.btn1_Internal&&this.uiWidgetBase) {
			this.btn1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn1') as mw.StaleButton
		}
		return this.btn1_Internal
	}
	private btn2_Internal: mw.StaleButton
	public get btn2(): mw.StaleButton {
		if(!this.btn2_Internal&&this.uiWidgetBase) {
			this.btn2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn2') as mw.StaleButton
		}
		return this.btn2_Internal
	}
	private btn3_Internal: mw.StaleButton
	public get btn3(): mw.StaleButton {
		if(!this.btn3_Internal&&this.uiWidgetBase) {
			this.btn3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn3') as mw.StaleButton
		}
		return this.btn3_Internal
	}
	private btn4_Internal: mw.StaleButton
	public get btn4(): mw.StaleButton {
		if(!this.btn4_Internal&&this.uiWidgetBase) {
			this.btn4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn4') as mw.StaleButton
		}
		return this.btn4_Internal
	}
	private btn5_Internal: mw.StaleButton
	public get btn5(): mw.StaleButton {
		if(!this.btn5_Internal&&this.uiWidgetBase) {
			this.btn5_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn5') as mw.StaleButton
		}
		return this.btn5_Internal
	}
	private btn6_Internal: mw.StaleButton
	public get btn6(): mw.StaleButton {
		if(!this.btn6_Internal&&this.uiWidgetBase) {
			this.btn6_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn6') as mw.StaleButton
		}
		return this.btn6_Internal
	}
	private btn7_Internal: mw.StaleButton
	public get btn7(): mw.StaleButton {
		if(!this.btn7_Internal&&this.uiWidgetBase) {
			this.btn7_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/btn7') as mw.StaleButton
		}
		return this.btn7_Internal
	}
	private basepicture_Internal: mw.Image
	public get basepicture(): mw.Image {
		if(!this.basepicture_Internal&&this.uiWidgetBase) {
			this.basepicture_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/MWCanvas_1/basepicture') as mw.Image
		}
		return this.basepicture_Internal
	}
	private mCheckBoxImg_Internal: mw.Image
	public get mCheckBoxImg(): mw.Image {
		if(!this.mCheckBoxImg_Internal&&this.uiWidgetBase) {
			this.mCheckBoxImg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mCheckBoxImg') as mw.Image
		}
		return this.mCheckBoxImg_Internal
	}
	private mCheckBox_Internal: mw.Button
	public get mCheckBox(): mw.Button {
		if(!this.mCheckBox_Internal&&this.uiWidgetBase) {
			this.mCheckBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mCheckBox') as mw.Button
		}
		return this.mCheckBox_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/mScrollBox/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private mBtnSave_Internal: mw.StaleButton
	public get mBtnSave(): mw.StaleButton {
		if(!this.mBtnSave_Internal&&this.uiWidgetBase) {
			this.mBtnSave_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/mBtnSave') as mw.StaleButton
		}
		return this.mBtnSave_Internal
	}
	private mBtnClose_Internal: mw.StaleButton
	public get mBtnClose(): mw.StaleButton {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/mBtnClose') as mw.StaleButton
		}
		return this.mBtnClose_Internal
	}
	private mTouch_Internal: mw.Image
	public get mTouch(): mw.Image {
		if(!this.mTouch_Internal&&this.uiWidgetBase) {
			this.mTouch_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/mTouch') as mw.Image
		}
		return this.mTouch_Internal
	}
	private btnLeft_Internal: mw.StaleButton
	public get btnLeft(): mw.StaleButton {
		if(!this.btnLeft_Internal&&this.uiWidgetBase) {
			this.btnLeft_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/btnLeft') as mw.StaleButton
		}
		return this.btnLeft_Internal
	}
	private btnRight_Internal: mw.StaleButton
	public get btnRight(): mw.StaleButton {
		if(!this.btnRight_Internal&&this.uiWidgetBase) {
			this.btnRight_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/btnRight') as mw.StaleButton
		}
		return this.btnRight_Internal
	}
	private btnReset_Internal: mw.StaleButton
	public get btnReset(): mw.StaleButton {
		if(!this.btnReset_Internal&&this.uiWidgetBase) {
			this.btnReset_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/btnReset') as mw.StaleButton
		}
		return this.btnReset_Internal
	}
	private mBtnBuy_Internal: mw.StaleButton
	public get mBtnBuy(): mw.StaleButton {
		if(!this.mBtnBuy_Internal&&this.uiWidgetBase) {
			this.mBtnBuy_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/mBtnBuy') as mw.StaleButton
		}
		return this.mBtnBuy_Internal
	}
	private mBtnView_Internal: mw.StaleButton
	public get mBtnView(): mw.StaleButton {
		if(!this.mBtnView_Internal&&this.uiWidgetBase) {
			this.mBtnView_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/mBtnView') as mw.StaleButton
		}
		return this.mBtnView_Internal
	}
	private mPos_Internal: mw.Image
	public get mPos(): mw.Image {
		if(!this.mPos_Internal&&this.uiWidgetBase) {
			this.mPos_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/MWCanvas_3/mPos') as mw.Image
		}
		return this.mPos_Internal
	}
	private mGold_Internal: mw.TextBlock
	public get mGold(): mw.TextBlock {
		if(!this.mGold_Internal&&this.uiWidgetBase) {
			this.mGold_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/MWCanvas_5/mGold') as mw.TextBlock
		}
		return this.mGold_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.btn0.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn0");
        })
        this.btn0.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn0");
        })
        this.btn0.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn0");
        })
        this.btn0.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn1.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn1");
        })
        this.btn1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn1");
        })
        this.btn1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn1");
        })
        this.btn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn2");
        })
        this.btn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn2");
        })
        this.btn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn2");
        })
        this.btn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn3.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn3");
        })
        this.btn3.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn3");
        })
        this.btn3.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn3");
        })
        this.btn3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn4.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn4");
        })
        this.btn4.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn4");
        })
        this.btn4.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn4");
        })
        this.btn4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn5.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn5");
        })
        this.btn5.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn5");
        })
        this.btn5.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn5");
        })
        this.btn5.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn6.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn6");
        })
        this.btn6.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn6");
        })
        this.btn6.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn6");
        })
        this.btn6.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btn7.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btn7");
        })
        this.btn7.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btn7");
        })
        this.btn7.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btn7");
        })
        this.btn7.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnSave.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnSave");
        })
        this.mBtnSave.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnSave");
        })
        this.mBtnSave.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnSave");
        })
        this.mBtnSave.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnClose.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnClose");
        })
        this.mBtnClose.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnClose");
        })
        this.mBtnClose.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnClose");
        })
        this.mBtnClose.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btnLeft.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btnLeft");
        })
        this.btnLeft.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btnLeft");
        })
        this.btnLeft.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btnLeft");
        })
        this.btnLeft.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btnRight.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btnRight");
        })
        this.btnRight.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btnRight");
        })
        this.btnRight.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btnRight");
        })
        this.btnRight.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.btnReset.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "btnReset");
        })
        this.btnReset.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "btnReset");
        })
        this.btnReset.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "btnReset");
        })
        this.btnReset.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnBuy.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnBuy");
        })
        this.mBtnBuy.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnBuy");
        })
        this.mBtnBuy.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnBuy");
        })
        this.mBtnBuy.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnView.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnView");
        })
        this.mBtnView.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnView");
        })
        this.mBtnView.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnView");
        })
        this.mBtnView.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.mCheckBox.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mCheckBox");
        })
        this.mCheckBox.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mCheckBox");
        })
        this.mCheckBox.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mCheckBox");
        })
        this.mCheckBox.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.btn0);
	
        this.setLanguage(this.btn1);
	
        this.setLanguage(this.btn2);
	
        this.setLanguage(this.btn3);
	
        this.setLanguage(this.btn4);
	
        this.setLanguage(this.btn5);
	
        this.setLanguage(this.btn6);
	
        this.setLanguage(this.btn7);
	
        this.setLanguage(this.mBtnSave);
	
        this.setLanguage(this.mBtnClose);
	
        this.setLanguage(this.btnLeft);
	
        this.setLanguage(this.btnRight);
	
        this.setLanguage(this.btnReset);
	
        this.setLanguage(this.mBtnBuy);
	
        this.setLanguage(this.mBtnView);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWButton_1") as mw.StaleButton);
	
        //文本多语言
        this.setLanguage(this.mGold)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_4/MWCanvas_2/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWCanvas_4/MWCanvas_2147482460/TextBlock_1") as mw.TextBlock);
	

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