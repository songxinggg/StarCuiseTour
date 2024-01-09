﻿/**aits-ignore */


@UIBind('UI/skill/SkillUI.ui')
export default class SkillUI_generate extends UIScript {
    protected readonly _myUIName: string = "SkillUI";
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

    	private mSkill1_Internal: mw.Canvas
	public get mSkill1(): mw.Canvas {
		if(!this.mSkill1_Internal&&this.uiWidgetBase) {
			this.mSkill1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1') as mw.Canvas
		}
		return this.mSkill1_Internal
	}
	private mBtn1_Internal: mw.Button
	public get mBtn1(): mw.Button {
		if(!this.mBtn1_Internal&&this.uiWidgetBase) {
			this.mBtn1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mBtn1') as mw.Button
		}
		return this.mBtn1_Internal
	}
	private mMaskButton1_Internal: mw.MaskButton
	public get mMaskButton1(): mw.MaskButton {
		if(!this.mMaskButton1_Internal&&this.uiWidgetBase) {
			this.mMaskButton1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mMaskButton1') as mw.MaskButton
		}
		return this.mMaskButton1_Internal
	}
	private mFire1_Internal: mw.VirtualJoystickPanel
	public get mFire1(): mw.VirtualJoystickPanel {
		if(!this.mFire1_Internal&&this.uiWidgetBase) {
			this.mFire1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mFire1') as mw.VirtualJoystickPanel
		}
		return this.mFire1_Internal
	}
	private mCount1_Internal: mw.TextBlock
	public get mCount1(): mw.TextBlock {
		if(!this.mCount1_Internal&&this.uiWidgetBase) {
			this.mCount1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mCount1') as mw.TextBlock
		}
		return this.mCount1_Internal
	}
	private mCD1_Internal: mw.TextBlock
	public get mCD1(): mw.TextBlock {
		if(!this.mCD1_Internal&&this.uiWidgetBase) {
			this.mCD1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mCD1') as mw.TextBlock
		}
		return this.mCD1_Internal
	}
	private mDis1_Internal: mw.Image
	public get mDis1(): mw.Image {
		if(!this.mDis1_Internal&&this.uiWidgetBase) {
			this.mDis1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mDis1') as mw.Image
		}
		return this.mDis1_Internal
	}
	private mDes1_Internal: mw.TextBlock
	public get mDes1(): mw.TextBlock {
		if(!this.mDes1_Internal&&this.uiWidgetBase) {
			this.mDes1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill1/mDes1') as mw.TextBlock
		}
		return this.mDes1_Internal
	}
	private mSkill2_Internal: mw.Canvas
	public get mSkill2(): mw.Canvas {
		if(!this.mSkill2_Internal&&this.uiWidgetBase) {
			this.mSkill2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2') as mw.Canvas
		}
		return this.mSkill2_Internal
	}
	private mBtn2_Internal: mw.Button
	public get mBtn2(): mw.Button {
		if(!this.mBtn2_Internal&&this.uiWidgetBase) {
			this.mBtn2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mBtn2') as mw.Button
		}
		return this.mBtn2_Internal
	}
	private mMaskButton2_Internal: mw.MaskButton
	public get mMaskButton2(): mw.MaskButton {
		if(!this.mMaskButton2_Internal&&this.uiWidgetBase) {
			this.mMaskButton2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mMaskButton2') as mw.MaskButton
		}
		return this.mMaskButton2_Internal
	}
	private mFire2_Internal: mw.VirtualJoystickPanel
	public get mFire2(): mw.VirtualJoystickPanel {
		if(!this.mFire2_Internal&&this.uiWidgetBase) {
			this.mFire2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mFire2') as mw.VirtualJoystickPanel
		}
		return this.mFire2_Internal
	}
	private mCount2_Internal: mw.TextBlock
	public get mCount2(): mw.TextBlock {
		if(!this.mCount2_Internal&&this.uiWidgetBase) {
			this.mCount2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mCount2') as mw.TextBlock
		}
		return this.mCount2_Internal
	}
	private mCD2_Internal: mw.TextBlock
	public get mCD2(): mw.TextBlock {
		if(!this.mCD2_Internal&&this.uiWidgetBase) {
			this.mCD2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mCD2') as mw.TextBlock
		}
		return this.mCD2_Internal
	}
	private mDis2_Internal: mw.Image
	public get mDis2(): mw.Image {
		if(!this.mDis2_Internal&&this.uiWidgetBase) {
			this.mDis2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mDis2') as mw.Image
		}
		return this.mDis2_Internal
	}
	private mDes2_Internal: mw.TextBlock
	public get mDes2(): mw.TextBlock {
		if(!this.mDes2_Internal&&this.uiWidgetBase) {
			this.mDes2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill2/mDes2') as mw.TextBlock
		}
		return this.mDes2_Internal
	}
	private mSkill3_Internal: mw.Canvas
	public get mSkill3(): mw.Canvas {
		if(!this.mSkill3_Internal&&this.uiWidgetBase) {
			this.mSkill3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3') as mw.Canvas
		}
		return this.mSkill3_Internal
	}
	private mBtn3_Internal: mw.Button
	public get mBtn3(): mw.Button {
		if(!this.mBtn3_Internal&&this.uiWidgetBase) {
			this.mBtn3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mBtn3') as mw.Button
		}
		return this.mBtn3_Internal
	}
	private mMaskButton3_Internal: mw.MaskButton
	public get mMaskButton3(): mw.MaskButton {
		if(!this.mMaskButton3_Internal&&this.uiWidgetBase) {
			this.mMaskButton3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mMaskButton3') as mw.MaskButton
		}
		return this.mMaskButton3_Internal
	}
	private mFire3_Internal: mw.VirtualJoystickPanel
	public get mFire3(): mw.VirtualJoystickPanel {
		if(!this.mFire3_Internal&&this.uiWidgetBase) {
			this.mFire3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mFire3') as mw.VirtualJoystickPanel
		}
		return this.mFire3_Internal
	}
	private mCount3_Internal: mw.TextBlock
	public get mCount3(): mw.TextBlock {
		if(!this.mCount3_Internal&&this.uiWidgetBase) {
			this.mCount3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mCount3') as mw.TextBlock
		}
		return this.mCount3_Internal
	}
	private mCD3_Internal: mw.TextBlock
	public get mCD3(): mw.TextBlock {
		if(!this.mCD3_Internal&&this.uiWidgetBase) {
			this.mCD3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mCD3') as mw.TextBlock
		}
		return this.mCD3_Internal
	}
	private mDis3_Internal: mw.Image
	public get mDis3(): mw.Image {
		if(!this.mDis3_Internal&&this.uiWidgetBase) {
			this.mDis3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mDis3') as mw.Image
		}
		return this.mDis3_Internal
	}
	private mDes3_Internal: mw.TextBlock
	public get mDes3(): mw.TextBlock {
		if(!this.mDes3_Internal&&this.uiWidgetBase) {
			this.mDes3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill3/mDes3') as mw.TextBlock
		}
		return this.mDes3_Internal
	}
	private mSkill4_Internal: mw.Canvas
	public get mSkill4(): mw.Canvas {
		if(!this.mSkill4_Internal&&this.uiWidgetBase) {
			this.mSkill4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4') as mw.Canvas
		}
		return this.mSkill4_Internal
	}
	private mBtn4_Internal: mw.Button
	public get mBtn4(): mw.Button {
		if(!this.mBtn4_Internal&&this.uiWidgetBase) {
			this.mBtn4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mBtn4') as mw.Button
		}
		return this.mBtn4_Internal
	}
	private mMaskButton4_Internal: mw.MaskButton
	public get mMaskButton4(): mw.MaskButton {
		if(!this.mMaskButton4_Internal&&this.uiWidgetBase) {
			this.mMaskButton4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mMaskButton4') as mw.MaskButton
		}
		return this.mMaskButton4_Internal
	}
	private mFire4_Internal: mw.VirtualJoystickPanel
	public get mFire4(): mw.VirtualJoystickPanel {
		if(!this.mFire4_Internal&&this.uiWidgetBase) {
			this.mFire4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mFire4') as mw.VirtualJoystickPanel
		}
		return this.mFire4_Internal
	}
	private mCount4_Internal: mw.TextBlock
	public get mCount4(): mw.TextBlock {
		if(!this.mCount4_Internal&&this.uiWidgetBase) {
			this.mCount4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mCount4') as mw.TextBlock
		}
		return this.mCount4_Internal
	}
	private mCD4_Internal: mw.TextBlock
	public get mCD4(): mw.TextBlock {
		if(!this.mCD4_Internal&&this.uiWidgetBase) {
			this.mCD4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mCD4') as mw.TextBlock
		}
		return this.mCD4_Internal
	}
	private mDis4_Internal: mw.Image
	public get mDis4(): mw.Image {
		if(!this.mDis4_Internal&&this.uiWidgetBase) {
			this.mDis4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mDis4') as mw.Image
		}
		return this.mDis4_Internal
	}
	private mDes4_Internal: mw.TextBlock
	public get mDes4(): mw.TextBlock {
		if(!this.mDes4_Internal&&this.uiWidgetBase) {
			this.mDes4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mSkill4/mDes4') as mw.TextBlock
		}
		return this.mDes4_Internal
	}
	private mAim_Internal: mw.Canvas
	public get mAim(): mw.Canvas {
		if(!this.mAim_Internal&&this.uiWidgetBase) {
			this.mAim_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mAim') as mw.Canvas
		}
		return this.mAim_Internal
	}
	private mAimImage_Internal: mw.Image
	public get mAimImage(): mw.Image {
		if(!this.mAimImage_Internal&&this.uiWidgetBase) {
			this.mAimImage_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mAim/mAimImage') as mw.Image
		}
		return this.mAimImage_Internal
	}
	private point_Internal: mw.Image
	public get point(): mw.Image {
		if(!this.point_Internal&&this.uiWidgetBase) {
			this.point_Internal = this.uiWidgetBase.findChildByPath('MWCanvas/mAim/point') as mw.Image
		}
		return this.point_Internal
	}


    protected onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initButtons();
    }
    
    protected initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.mBtn1.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn1");
        })
        this.mBtn1.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn1");
        })
        this.mBtn1.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn1");
        })
        this.mBtn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn2.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn2");
        })
        this.mBtn2.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn2");
        })
        this.mBtn2.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn2");
        })
        this.mBtn2.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn3.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn3");
        })
        this.mBtn3.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn3");
        })
        this.mBtn3.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn3");
        })
        this.mBtn3.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        this.mBtn4.onClicked.add(()=>{
            Event.dispatchToLocal("PlayButtonClick", "mBtn4");
        })
        this.mBtn4.onPressed.add(() => {
            Event.dispatchToLocal("PlayButtonPressed", "mBtn4");
        })
        this.mBtn4.onReleased.add(() => {
            Event.dispatchToLocal("PlayButtonReleased", "mBtn4");
        })
        this.mBtn4.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
        // 初始化多语言
        this.initLanguage()
    }
    
    protected initLanguage(){
        //按钮多语言
        //文本多语言
        this.setLanguage(this.mCount1)
	
        this.setLanguage(this.mCD1)
	
        this.setLanguage(this.mDes1)
	
        this.setLanguage(this.mCount2)
	
        this.setLanguage(this.mCD2)
	
        this.setLanguage(this.mDes2)
	
        this.setLanguage(this.mCount3)
	
        this.setLanguage(this.mCD3)
	
        this.setLanguage(this.mDes3)
	
        this.setLanguage(this.mCount4)
	
        this.setLanguage(this.mCD4)
	
        this.setLanguage(this.mDes4)
	

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