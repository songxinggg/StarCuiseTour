import PropItem_Generate from "../../../ui-generate/skill/PropItem_generate";
export class PropItem extends PropItem_Generate {
    get clickBtn() {
        return this.mBtn;
    }

    public setData(icon: string, name: string) {
        this.mIcon.imageGuid = icon
        this.mName.text = name
    }
}