﻿/**aits-ignore */


@UIBind('UI/uiTemplate/gameModule/Game_HUD.ui')
export default class Game_HUD_generate extends UIScript {
    protected readonly _myUIName: string = "Game_HUD";
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

    	private mVirtualJoystick_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystick(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystick_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystick_Internal = this.uiWidgetBase.findChildByPath('Canvas/JoyStick/mVirtualJoystick') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystick_Internal
	}
	private mRightDownCon_Internal: mw.Canvas
	public get mRightDownCon(): mw.Canvas {
		if(!this.mRightDownCon_Internal&&this.uiWidgetBase) {
			this.mRightDownCon_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon') as mw.Canvas
		}
		return this.mRightDownCon_Internal
	}
	private mJump_btn_Internal: mw.StaleButton
	public get mJump_btn(): mw.StaleButton {
		if(!this.mJump_btn_Internal&&this.uiWidgetBase) {
			this.mJump_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mJump_btn') as mw.StaleButton
		}
		return this.mJump_btn_Internal
	}
	private mExitInteractive_btn_Internal: mw.StaleButton
	public get mExitInteractive_btn(): mw.StaleButton {
		if(!this.mExitInteractive_btn_Internal&&this.uiWidgetBase) {
			this.mExitInteractive_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mRightDownCon/mExitInteractive_btn') as mw.StaleButton
		}
		return this.mExitInteractive_btn_Internal
	}
	private mBottomCanvas_Internal: mw.Canvas
	public get mBottomCanvas(): mw.Canvas {
		if(!this.mBottomCanvas_Internal&&this.uiWidgetBase) {
			this.mBottomCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas') as mw.Canvas
		}
		return this.mBottomCanvas_Internal
	}
	private canvas_emoji_Internal: mw.Canvas
	public get canvas_emoji(): mw.Canvas {
		if(!this.canvas_emoji_Internal&&this.uiWidgetBase) {
			this.canvas_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_emoji') as mw.Canvas
		}
		return this.canvas_emoji_Internal
	}
	private scrollBox_emoji_Internal: mw.ScrollBox
	public get scrollBox_emoji(): mw.ScrollBox {
		if(!this.scrollBox_emoji_Internal&&this.uiWidgetBase) {
			this.scrollBox_emoji_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_emoji/scrollBox_emoji') as mw.ScrollBox
		}
		return this.scrollBox_emoji_Internal
	}
	private canvas_word_Internal: mw.Canvas
	public get canvas_word(): mw.Canvas {
		if(!this.canvas_word_Internal&&this.uiWidgetBase) {
			this.canvas_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_word') as mw.Canvas
		}
		return this.canvas_word_Internal
	}
	private scrollBox_word_Internal: mw.ScrollBox
	public get scrollBox_word(): mw.ScrollBox {
		if(!this.scrollBox_word_Internal&&this.uiWidgetBase) {
			this.scrollBox_word_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_word/scrollBox_word') as mw.ScrollBox
		}
		return this.scrollBox_word_Internal
	}
	private canvas_btn_Internal: mw.Canvas
	public get canvas_btn(): mw.Canvas {
		if(!this.canvas_btn_Internal&&this.uiWidgetBase) {
			this.canvas_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn') as mw.Canvas
		}
		return this.canvas_btn_Internal
	}
	private emojiBtn_Internal: mw.StaleButton
	public get emojiBtn(): mw.StaleButton {
		if(!this.emojiBtn_Internal&&this.uiWidgetBase) {
			this.emojiBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn/emojiBtn') as mw.StaleButton
		}
		return this.emojiBtn_Internal
	}
	private wordBtn_Internal: mw.StaleButton
	public get wordBtn(): mw.StaleButton {
		if(!this.wordBtn_Internal&&this.uiWidgetBase) {
			this.wordBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mBottomCanvas/canvas_btn/wordBtn') as mw.StaleButton
		}
		return this.wordBtn_Internal
	}
	private mTopEventCanvas_Internal: mw.Canvas
	public get mTopEventCanvas(): mw.Canvas {
		if(!this.mTopEventCanvas_Internal&&this.uiWidgetBase) {
			this.mTopEventCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas') as mw.Canvas
		}
		return this.mTopEventCanvas_Internal
	}
	private mCanvasAction_Internal: mw.Canvas
	public get mCanvasAction(): mw.Canvas {
		if(!this.mCanvasAction_Internal&&this.uiWidgetBase) {
			this.mCanvasAction_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction') as mw.Canvas
		}
		return this.mCanvasAction_Internal
	}
	private mAction_btn_Internal: mw.Button
	public get mAction_btn(): mw.Button {
		if(!this.mAction_btn_Internal&&this.uiWidgetBase) {
			this.mAction_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction/mAction_btn') as mw.Button
		}
		return this.mAction_btn_Internal
	}
	private textBtn_Internal: mw.TextBlock
	public get textBtn(): mw.TextBlock {
		if(!this.textBtn_Internal&&this.uiWidgetBase) {
			this.textBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasAction/mAction_btn/textBtn') as mw.TextBlock
		}
		return this.textBtn_Internal
	}
	private mCanvasshop_Internal: mw.Canvas
	public get mCanvasshop(): mw.Canvas {
		if(!this.mCanvasshop_Internal&&this.uiWidgetBase) {
			this.mCanvasshop_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasshop') as mw.Canvas
		}
		return this.mCanvasshop_Internal
	}
	private mBtnShop_Internal: mw.StaleButton
	public get mBtnShop(): mw.StaleButton {
		if(!this.mBtnShop_Internal&&this.uiWidgetBase) {
			this.mBtnShop_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasshop/mBtnShop') as mw.StaleButton
		}
		return this.mBtnShop_Internal
	}
	private mCanvasCloth_Internal: mw.Canvas
	public get mCanvasCloth(): mw.Canvas {
		if(!this.mCanvasCloth_Internal&&this.uiWidgetBase) {
			this.mCanvasCloth_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasCloth') as mw.Canvas
		}
		return this.mCanvasCloth_Internal
	}
	private mBtnChange_Internal: mw.StaleButton
	public get mBtnChange(): mw.StaleButton {
		if(!this.mBtnChange_Internal&&this.uiWidgetBase) {
			this.mBtnChange_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasCloth/mBtnChange') as mw.StaleButton
		}
		return this.mBtnChange_Internal
	}
	private mNewCloth_Internal: mw.TextBlock
	public get mNewCloth(): mw.TextBlock {
		if(!this.mNewCloth_Internal&&this.uiWidgetBase) {
			this.mNewCloth_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasCloth/mNewCloth') as mw.TextBlock
		}
		return this.mNewCloth_Internal
	}
	private mCanvasClothReset_Internal: mw.Canvas
	public get mCanvasClothReset(): mw.Canvas {
		if(!this.mCanvasClothReset_Internal&&this.uiWidgetBase) {
			this.mCanvasClothReset_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasClothReset') as mw.Canvas
		}
		return this.mCanvasClothReset_Internal
	}
	private mBtnCloth_Internal: mw.StaleButton
	public get mBtnCloth(): mw.StaleButton {
		if(!this.mBtnCloth_Internal&&this.uiWidgetBase) {
			this.mBtnCloth_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mCanvasClothReset/mBtnCloth') as mw.StaleButton
		}
		return this.mBtnCloth_Internal
	}
	private mBagBtn_Internal: mw.Button
	public get mBagBtn(): mw.Button {
		if(!this.mBagBtn_Internal&&this.uiWidgetBase) {
			this.mBagBtn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mBagBtn') as mw.Button
		}
		return this.mBagBtn_Internal
	}
	private mResetCanvas_Internal: mw.Canvas
	public get mResetCanvas(): mw.Canvas {
		if(!this.mResetCanvas_Internal&&this.uiWidgetBase) {
			this.mResetCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mResetCanvas') as mw.Canvas
		}
		return this.mResetCanvas_Internal
	}
	private mPulloff_btn_Internal: mw.Button
	public get mPulloff_btn(): mw.Button {
		if(!this.mPulloff_btn_Internal&&this.uiWidgetBase) {
			this.mPulloff_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mResetCanvas/mPulloff_btn') as mw.Button
		}
		return this.mPulloff_btn_Internal
	}
	private mJumpGame_Internal: mw.Canvas
	public get mJumpGame(): mw.Canvas {
		if(!this.mJumpGame_Internal&&this.uiWidgetBase) {
			this.mJumpGame_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mJumpGame') as mw.Canvas
		}
		return this.mJumpGame_Internal
	}
	private mimageJump_Internal: mw.Image
	public get mimageJump(): mw.Image {
		if(!this.mimageJump_Internal&&this.uiWidgetBase) {
			this.mimageJump_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mJumpGame/mimageJump') as mw.Image
		}
		return this.mimageJump_Internal
	}
	private mjumpGame_btn_Internal: mw.Button
	public get mjumpGame_btn(): mw.Button {
		if(!this.mjumpGame_btn_Internal&&this.uiWidgetBase) {
			this.mjumpGame_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mJumpGame/mjumpGame_btn') as mw.Button
		}
		return this.mjumpGame_btn_Internal
	}
	private backToSchool_Internal: mw.TextBlock
	public get backToSchool(): mw.TextBlock {
		if(!this.backToSchool_Internal&&this.uiWidgetBase) {
			this.backToSchool_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mJumpGame/backToSchool') as mw.TextBlock
		}
		return this.backToSchool_Internal
	}
	private mPlayerInfo_Internal: mw.Canvas
	public get mPlayerInfo(): mw.Canvas {
		if(!this.mPlayerInfo_Internal&&this.uiWidgetBase) {
			this.mPlayerInfo_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo') as mw.Canvas
		}
		return this.mPlayerInfo_Internal
	}
	private mIdCard_Internal: mw.Image
	public get mIdCard(): mw.Image {
		if(!this.mIdCard_Internal&&this.uiWidgetBase) {
			this.mIdCard_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo/mIdCard') as mw.Image
		}
		return this.mIdCard_Internal
	}
	private mIdCard_btn_Internal: mw.Button
	public get mIdCard_btn(): mw.Button {
		if(!this.mIdCard_btn_Internal&&this.uiWidgetBase) {
			this.mIdCard_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/mPlayerInfo/mIdCard_btn') as mw.Button
		}
		return this.mIdCard_btn_Internal
	}
	private cashCanvas_Internal: mw.Canvas
	public get cashCanvas(): mw.Canvas {
		if(!this.cashCanvas_Internal&&this.uiWidgetBase) {
			this.cashCanvas_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/cashCanvas') as mw.Canvas
		}
		return this.cashCanvas_Internal
	}
	private cashNum_Internal: mw.TextBlock
	public get cashNum(): mw.TextBlock {
		if(!this.cashNum_Internal&&this.uiWidgetBase) {
			this.cashNum_Internal = this.uiWidgetBase.findChildByPath('Canvas/mTopEventCanvas/cashCanvas/cashNum') as mw.TextBlock
		}
		return this.cashNum_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        this.mJump_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mJump_btn");
        })
        this.mJump_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mJump_btn");
        })
        this.mJump_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mJump_btn");
        })
        this.mJump_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mExitInteractive_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mExitInteractive_btn");
        })
        this.mExitInteractive_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mExitInteractive_btn");
        })
        this.mExitInteractive_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mExitInteractive_btn");
        })
        this.mExitInteractive_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.emojiBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "emojiBtn");
        })
        this.emojiBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "emojiBtn");
        })
        this.emojiBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "emojiBtn");
        })
        this.emojiBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.wordBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "wordBtn");
        })
        this.wordBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "wordBtn");
        })
        this.wordBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "wordBtn");
        })
        this.wordBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnShop.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnShop");
        })
        this.mBtnShop.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnShop");
        })
        this.mBtnShop.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnShop");
        })
        this.mBtnShop.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnChange.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnChange");
        })
        this.mBtnChange.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnChange");
        })
        this.mBtnChange.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnChange");
        })
        this.mBtnChange.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtnCloth.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtnCloth");
        })
        this.mBtnCloth.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtnCloth");
        })
        this.mBtnCloth.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtnCloth");
        })
        this.mBtnCloth.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        //按钮添加点击
        this.mAction_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mAction_btn");
        })
        this.mAction_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mAction_btn");
        })
        this.mAction_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mAction_btn");
        })
        this.mAction_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBagBtn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBagBtn");
        })
        this.mBagBtn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBagBtn");
        })
        this.mBagBtn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBagBtn");
        })
        this.mBagBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mPulloff_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mPulloff_btn");
        })
        this.mPulloff_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mPulloff_btn");
        })
        this.mPulloff_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mPulloff_btn");
        })
        this.mPulloff_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mjumpGame_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mjumpGame_btn");
        })
        this.mjumpGame_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mjumpGame_btn");
        })
        this.mjumpGame_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mjumpGame_btn");
        })
        this.mjumpGame_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mIdCard_btn.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mIdCard_btn");
        })
        this.mIdCard_btn.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mIdCard_btn");
        })
        this.mIdCard_btn.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mIdCard_btn");
        })
        this.mIdCard_btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        this.setLanguage(this.mJump_btn);
	
        this.setLanguage(this.mExitInteractive_btn);
	
        this.setLanguage(this.emojiBtn);
	
        this.setLanguage(this.wordBtn);
	
        this.setLanguage(this.mBtnShop);
	
        this.setLanguage(this.mBtnChange);
	
        this.setLanguage(this.mBtnCloth);
	
        //文本多语言
        this.setLanguage(this.textBtn)
	
        this.setLanguage(this.mNewCloth)
	
        this.setLanguage(this.backToSchool)
	
        this.setLanguage(this.cashNum)
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mCanvasshop/Text") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mCanvasCloth/Text") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mCanvasClothReset/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mBagBtn/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mResetCanvas/TextBlock") as mw.TextBlock);
	
        this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mTopEventCanvas/mPlayerInfo/TextBlock_1") as mw.TextBlock);
	

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