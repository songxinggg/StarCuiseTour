import SettleItem_generate from "../../../ui-generate/uiTemplate/gameModule/SettleItem_generate"
import GameUtils from "../../../utils/GameUtils"



export default class SettleItem extends SettleItem_generate {

    public setData(name: string, time: number, isCatched: boolean|number) {

        this.name.text = name
        if (time != null) {
            this.time.text = time.toFixed() + "s"
        } else {
            this.time.text=""
        }

        if(typeof isCatched === "boolean") {
            this.value.text = isCatched ? GameUtils.getTxt("Change_14") : GameUtils.getTxt("Change_15")
        } else {
            this.value.text = isCatched.toString()
        }
        
    }
}