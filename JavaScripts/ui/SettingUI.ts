
import { SoundManager } from "../ExtensionType";
import { GameConfig } from "../config/GameConfig";
import { HudGameUIState } from "../const/GameEnum";
import SettingUI_Generate from "../ui-generate/SettingUI_generate";


export class SettingUI extends SettingUI_Generate {
    protected onStart(): void {
        this.mBtn_Exit.onClicked.add(() => {
            UIManager.hideUI(this);
        })
        Event.addLocalListener("PlayButtonClick", () => {
            this.playSound(31);
        });

        this.soundLogic();
    }

    /**
     * 音效画质设置界面
     */
    private soundLogic() {
        this.mBar_Music.currentValue = mw.SoundService.BGMVolumeScale;
        this.mBar_Music.onSliderValueChanged.add((val: number) => {
            try {
                mw.SoundService.volumeScale = val;
            } catch (error) { }
        });

        this.mBar_Sound.currentValue = mw.SoundService.volumeScale;
        this.mBar_Sound.onSliderValueChanged.add((val: number) => {
            mw.SoundService.BGMVolumeScale = val;
        });
        let defaultCpu = GraphicsSettings.getDefaultCPULevel();
        this.mBar_GraphicsLev.currentValue = defaultCpu
        this.mBar_GraphicsLev.sliderButtonReleaseDelegate.add((val: number) => {
            GraphicsSettings.setGraphicsCPULevel(val);
            GraphicsSettings.setGraphicsGPULevel(val);
        });
    }

    protected onShow(): void {
        UIManager.setUIstate(this, HudGameUIState.HideAll);
        this.setUIVisible(this.mCanvasSound, true);
    }

    protected onHide(): void {
        UIManager.setUIstate(this, HudGameUIState.Show);
    }

    private setUIVisible(ui: mw.Canvas, visible: boolean) {
        let result = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Hidden;
        if (ui.visibility != result) {
            ui.visibility = result;
        }
    }

    private async playSound(id: number) {
        let config = GameConfig.Music.getElement(id);
        if (!AssetUtil.assetLoaded(config.MusicGUID)) {
            await AssetUtil.asyncDownloadAsset(config.MusicGUID);
        }
        return SoundManager.playSound(config.MusicGUID, 1, config.Music);
    }
}
