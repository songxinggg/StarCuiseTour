
import { Camp, FSMStateType } from "../../../const/GameEnum";
import { GlobalData } from "../../../const/GlobalData";
import HideSeekHud_generate from "../../../ui-generate/uiTemplate/gameModule/HideSeekHud_generate";
import Tips from "../../../ui/commonUI/Tips";
import GameUtils from "../../../utils/GameUtils";


export default class HideSeekUI extends HideSeekHud_generate {

    public attackAction: mw.Action = new mw.Action()

    public guideAction: mw.Action = new mw.Action()

    private currentTime: number = 0;

    private character: mw.Character;

    private isCrouth: boolean = false;

    private _timer: number = 0;

    private currentState: FSMStateType = FSMStateType.HideWait;


    private guideCd: number = 0;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.blockTime.visibility = mw.SlateVisibility.Collapsed
        this.watchTxt.visibility = mw.SlateVisibility.Collapsed
        this.battleInfoCanvas.visibility = mw.SlateVisibility.Collapsed

        Player.asyncGetLocalPlayer().then((player) => {
            this.character = player.character;
        });
        this.crouchBtn.onPressed.add(() => {
            if (!this.isCrouth) {
                this.isCrouth = true;
                this.character.crouch(true);
            } else {
                this.isCrouth = false;
                this.character.crouch(false);
            }

        })

        this.catchBtn.onClicked.add(() => {
            if (Date.now() - this._timer < 1000) return;
            this._timer = Date.now();
            this.attackAction.call();
        })

        this.guideBtn.clickedDelegate.add(() => { 
            if (this.guideCd > 0) return;
            if (this.currentState != FSMStateType.Seek) {
                Tips.show(GameUtils.getTxt("Text_Text_969"))
                return
            }
            this.guideAction.call();
            this.guideCd = GlobalData.guideCd;
        })


        this.canUpdate = true;

    }




    protected onShow(state: FSMStateType, time: number, hideNum: number, catchNum: number): void {
        this.currentState = state;
        if (state == FSMStateType.HideWait || state == FSMStateType.SeekWait) {
            this.blockTime.visibility = mw.SlateVisibility.HitTestInvisible
            this.time.visibility = mw.SlateVisibility.Collapsed
            this.stateTxt.visibility = mw.SlateVisibility.Collapsed
        } else if (state == FSMStateType.Hide || state == FSMStateType.Seek || state == FSMStateType.Paper) {
            this.blockTime.visibility = mw.SlateVisibility.Collapsed
            this.time.visibility = mw.SlateVisibility.HitTestInvisible
            this.stateTxt.visibility = mw.SlateVisibility.HitTestInvisible
        }
        if (state == FSMStateType.Hide) {
            this.stateTxt.text = GameUtils.getTxt("Text_Text_970")
        } else if (state == FSMStateType.Seek) {
            this.stateTxt.text = GameUtils.getTxt("Text_Text_971")
        }
        if (hideNum > 0) {
            this.onLoseNum(hideNum, catchNum);
        }
        this.currentTime = time;

    }


    public setCamp(camp: Camp) {
        if (camp == Camp.Hide) {
            this.catchCanvas.visibility = mw.SlateVisibility.Collapsed
        }   
        else if (camp == Camp.Seek) {
            this.guideBtn.fanShapedValue = 1;
            this.guideCd = 0;
            this.catchCanvas.visibility = mw.SlateVisibility.Visible
        }

    }



    public onCatch() {
        this.watchTxt.visibility = mw.SlateVisibility.HitTestInvisible
    }

    public onGameOver() {
        this.watchTxt.visibility = mw.SlateVisibility.Collapsed
    }

    public onLoseNum(losenum: number, catchnum: number) {
        this.battleInfoCanvas.visibility = mw.SlateVisibility.HitTestInvisible;
        this.loseNum.text =StringUtil.format(GameUtils.getTxt("Text_Text_972"),losenum.toString());
        this.catchNum.text = StringUtil.format(GameUtils.getTxt("Text_Text_973"),catchnum.toString());

    }



    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.currentTime > dt) {
            this.currentTime -= dt;
            this.blockTime.text = Math.floor(this.currentTime).toString();
            this.time.text = GameUtils.getTimeStringMS(this.currentTime);
        }

        if (this.guideCd > 0) {
            console.log("cd",this.guideCd);
            this.guideCd -= dt;
            this.guideBtn.fanShapedValue = (GlobalData.guideCd - this.guideCd) / GlobalData.guideCd;
            if (this.guideCd <= 0) {
                this.guideBtn.fanShapedValue = 1;
            }
        }
    }


}