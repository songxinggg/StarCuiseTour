export default class TSoundManager  {
    private static instance: TSoundManager;
    static getInstance(): TSoundManager {
        if (!TSoundManager.instance) {
            TSoundManager.instance = new TSoundManager();
        }
        return TSoundManager.instance;
    }

    playSound(resId: string,loop?:number, volume?: number): void { 
        mw.SoundService.playSound(resId, loop,volume)
    }

    stopSound(resId: string): void { 
        mw.SoundService.stopSound(resId)
    }


    playBGM(resId: string, volume?: number): void {
        mw.SoundService.playBGM(resId, volume)
    }


    stopBGM(): void {
        mw.SoundService.stopBGM()
    }


}