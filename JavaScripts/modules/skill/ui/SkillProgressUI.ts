import SkillProgress_Generate from "../../../ui-generate/skill/SkillProgress_generate";

export default class SkillProgressUI extends SkillProgress_Generate {
    private _isBigChange: boolean = false
    private _isLittleChange: boolean = false
    private _character: mw.Character
    private _originScale: mw.Vector
    protected onStart(): void {
        this._character = Player.localPlayer.character
        this._originScale = this._character.worldTransform.scale
        this.mProgress.sliderButtonReleaseDelegate.add(this.scaleValueChange)
    }

    protected onShow(skill: number): void {
        this._isBigChange = false
        this._isLittleChange = false
        if (skill == 3071) {
            this._isBigChange = true
        }
        if (skill == 3072) {
            this._isLittleChange = true
        }
        this.mProgress.currentValue = 0
        this.scaleValueChange(0)
    }

    private scaleValueChange = (value: number) => {
        if (this._isBigChange) {
            this._character.worldTransform.scale = this._originScale.clone().multiply((1.2 + value * 0.8))
        } else if (this._isLittleChange) {
            this._character.worldTransform.scale = this._originScale.clone().multiply((0.8 - value * 0.3))
        }
    }

    protected onHide(): void {
        this._character.worldTransform.scale = this._originScale
    }
}