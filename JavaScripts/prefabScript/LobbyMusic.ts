
import { SoundManager } from "../ExtensionType";
import { GameModuleC } from "../modules/gameModule/GameModuleC";
import { Interval } from "../modules/interactModule/interactLogic/InteractObject";
import GameUtils from "../utils/GameUtils";

@Component
export default class LobbyMusic extends mw.Script {

    @mw.Property({ displayName: "播放地点" })
    private playPos: mw.Vector = new mw.Vector(-5583, 908, 3603);
    
    @mw.Property({ displayName: "播放半径" })
    private playRadius: number = 1900;

    @mw.Property({ displayName: "衰减距离" })
    private playDistance: number = 500;

    @mw.Property({ displayName: "音乐列表" })
    private musicList: string[] = ["118698","118699"];
    private curMusic: string = "";


    public interval: Interval = new Interval()

    private character: mw.Character;
    
    private isPlayBgm: boolean = true;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        this.playMusic();
        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            this.character = player.character;
        })
        this.useUpdate = true;
        

    }


    private async playMusic() { 
        let music = this.getNextMusic();
        if (music == "") return;
        this.curMusic = music;

        let playID = mw.SoundService.play3DSound(music, this.playPos, 1, 1, { radius: this.playRadius, falloffDistance: 500 })

        mw.SoundService.get3DSoundById(playID).then((gameObject: mw.Sound) => {
            if (!gameObject) return;
            gameObject.onFinish.clear();
            gameObject.onFinish.add(() => {
                this.playMusic()
            })
            
         })
         
    }


    private getNextMusic() {
        const index = this.musicList.indexOf(this.curMusic)
        if (index == -1) return this.musicList[0]
        if (index == this.musicList.length - 1) return this.musicList[0]
        return this.musicList[index + 1]
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if(!this.character) return;
        if (--this.interval.updateInterval <= 0) {
            if (mw.Vector.squaredDistance(this.playPos, this.character.worldTransform.position) <= Math.pow(this.playRadius, 2)) {
                if (this.isPlayBgm) {
                    SoundManager.stopBGM();
                    this.isPlayBgm = false;
                }
            } else {
                if (!this.isPlayBgm) {
                    ModuleService.getModule(GameModuleC).playBGM();
                    this.isPlayBgm = true;
                }
            }

            this.interval.updateInterval = 30;
        }

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}