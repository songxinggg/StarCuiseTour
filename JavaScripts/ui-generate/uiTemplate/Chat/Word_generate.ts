﻿/**aits-ignore */


@UIBind('UI/uiTemplate/Chat/Word.ui')
export default class Word_generate extends UIScript {
    protected readonly _myUIName: string = "Word";
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

    	private mBtn_word_Internal: mw.StaleButton
	public get mBtn_word(): mw.StaleButton {
		if(!this.mBtn_word_Internal&&this.uiWidgetBase) {
			this.mBtn_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBtn_word') as mw.StaleButton
		}
		return this.mBtn_word_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mBtn_word.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn_word");
        })
        this.mBtn_word.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn_word");
        })
        this.mBtn_word.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn_word");
        })
        this.mBtn_word.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mBtn_word);
	
        //文本多语言

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