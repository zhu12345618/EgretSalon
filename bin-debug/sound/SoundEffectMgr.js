var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SoundEffectMgr = (function () {
    function SoundEffectMgr() {
        this.soundOn = true;
        this.soundArray = [];
    }
    SoundEffectMgr.playSound = function (name) {
        SoundEffectMgr.soundEffectInstance.playsound(name);
    };
    SoundEffectMgr.setSoundEffectOn = function (on) {
        SoundEffectMgr.soundEffectInstance.soundOn = on;
    };
    SoundEffectMgr.prototype.playsound = function (name) {
        if (this.soundOn) {
            var thesound = this.soundArray[name];
            if (null == thesound) {
                thesound = RES.getRes(name);
                this.soundArray[name] = thesound;
            }
            if (null != thesound) {
                thesound.play(0, 1);
            }
        }
    };
    return SoundEffectMgr;
}());
/*
 *
 *
 *
 */
SoundEffectMgr.soundEffectInstance = new SoundEffectMgr();
__reflect(SoundEffectMgr.prototype, "SoundEffectMgr");
//# sourceMappingURL=SoundEffectMgr.js.map