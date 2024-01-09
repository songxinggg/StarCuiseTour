
import { MyAction } from "../../ExtensionType";
import Chat_generate from "../../ui-generate/uiTemplate/Guide/Chat_generate";

export class ChatUI extends Chat_generate {
    private msg: string[];
    private msgIndex: number;
    public msgShowEnd: MyAction = new MyAction();

    private timer: number = 0;
    onStart() {
		this.layer = mw.UILayerDialog;
        this.mBtn_Next.onClicked.add(() => {
            if (Date.now() - this.timer >= 500) {
                this.timer = Date.now()
                this.msgIndex++;
                if (this.msgIndex == this.msg.length) {
                    this.msgShowEnd?.call();
                    return;
                }
                this.mTxt_Talk.text = (this.msg[this.msgIndex]);
            } 
        })
    }

    private timer2
    protected onShow(...params: any[]): void {
        this.timer2 = setTimeout(() => {
            this.msgShowEnd.call();
        },10000)
    }

    public setMSG(msg: string[]) {
        this.msg = msg;
        this.msgIndex = 0;
        this.mTxt_Talk.text = (this.msg[this.msgIndex]);
    }

    protected onHide(): void {
        clearTimeout(this.timer2);
    }
}