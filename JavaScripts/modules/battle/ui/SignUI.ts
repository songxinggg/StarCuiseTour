
import SignUI_generate from "../../../ui-generate/uiTemplate/gameModule/SignUI_generate";
import GameUtils from "../../../utils/GameUtils";
import PartyModuleC from "../../party/PartyModuleC";




export default class SignUI extends SignUI_generate {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mYesBtn.onClicked.add(() => {
            this.invateCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.joinCanvas.visibility = mw.SlateVisibility.Visible;
            ModuleService.getModule(PartyModuleC).partySign();
            this.mPlayerNum.text = StringUtil.format(GameUtils.getTxt("Text_Text_1006"),this.ownerNickName)

        })

        this.mNoBtn.onClicked.add(() => { 
            UIManager.hideUI(this)
        })

    }

    private ownerNickName: string = "";

    
    protected onShow(isSelf: boolean, nickName: string, time: number,playerNum:number,partySign:boolean): void {
        this.canUpdate = true;
        this.timer = time;
        if (nickName != null) {
            this.ownerNickName = nickName;
        }
       
        if (isSelf) {

            this.invateCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.joinCanvas.visibility = mw.SlateVisibility.Visible;
            this.mPlayerNum.text =StringUtil.format(GameUtils.getTxt("Text_Text_1004"),playerNum)
        } else {
            if (!partySign) {
                this.invateCanvas.visibility = mw.SlateVisibility.Visible;
                this.joinCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mName.text = StringUtil.format(GameUtils.getTxt("Text_Text_1005"), nickName)
            } else {
                this.invateCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.joinCanvas.visibility = mw.SlateVisibility.Visible;
                this.mName.text = StringUtil.format(GameUtils.getTxt("Text_Text_1005"), nickName)

            }
            
        }
    }


    private timer: number = 0;



    protected onHide(): void {

    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.timer >=0) {
            this.timer -= dt;
            this.mTime.text = Math.floor(this.timer).toString();
            if(this.timer<=0){
                UIManager.hideUI(this)
            }
        }
    }


}