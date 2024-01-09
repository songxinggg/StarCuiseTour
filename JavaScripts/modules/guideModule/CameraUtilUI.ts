import CameraUtil_Generate from "../../ui-generate/CameraUtil_generate";
import { GuideHelper } from "./GuideHelper";

export default class CameraUtilUI extends CameraUtil_Generate {
    protected onStart(): void {
        this.mBtn.onClicked.add(() => {
            const loc = this.mLocInput.text.split(",").map(v => Number(v));
            const rot = this.mRotInput.text.split(",").map(v => Number(v));
            GuideHelper.getInstance.changeCamera(new mw.Vector(loc[0], loc[1], loc[2]), 300, new mw.Vector(rot[0], rot[1], rot[2]));
        })
    }
}