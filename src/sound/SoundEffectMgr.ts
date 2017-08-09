/**
 *
 * @author 
 *
 */
class SoundEffectMgr {

    public static playSound(name: string): void {
        SoundEffectMgr.soundEffectInstance.playsound(name);
    }

    public static setSoundEffectOn(on: boolean): void {
        SoundEffectMgr.soundEffectInstance.soundOn = on;
    }

/*
 * 
 * 
 * 
 */ 

    private static soundEffectInstance: SoundEffectMgr = new SoundEffectMgr();

    private soundOn: boolean = true;
    private soundArray: Array<any> = [];
    private playsound(name: string) {
        if(this.soundOn) {
            var thesound: egret.Sound = this.soundArray[name];
            if(null == thesound) {
                thesound = RES.getRes(name);
                this.soundArray[name] = thesound;
            }

            if(null != thesound) {
                thesound.play(0,1);
            }
        }
    }
}
