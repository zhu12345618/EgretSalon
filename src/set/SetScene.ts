
class SetScene extends eui.Component {
    private lanSetButton : SetButton;
    private SoundSetButton : SetButton;
    constructor() {
        super();
        this.width = 432;
        this.height = 120;
        this.init();
    }

    private init() {
        this.initBg();
        this.initLan();
        this.initSound();
    }

    private initBg() {
        var bg : egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.84);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private initLan() {
        var lanLabel = new eui.Label("Language");
        lanLabel.x = 50;
        lanLabel.y = 20;
        lanLabel.size = 25;
        this.addChild(lanLabel);
        function setLanCallback(selected) {
            switch(selected) {
                case 0:
                    Lang.changeLang("EN");
                    break;
                case 1:
                    Lang.changeLang("ZH");
                    break;
                default :
                    break;
            }
        }
        this.lanSetButton = new SetButton("ENG", "简体", setLanCallback);
        this.lanSetButton.setCurrentSelected(1);
        this.lanSetButton.x = 100;
        this.lanSetButton.y = 20;
        this.addChild(this.lanSetButton);
    }

    private initSound() {
        var soundLabel = new eui.Label("Sounds");
        soundLabel.x = 50;
        soundLabel.y = 80;
        soundLabel.size = 25;
        this.addChild(soundLabel);

        function setSoundCallback(selected) {
            switch(selected) {
                case 0:
                    SoundEffectMgr.setSoundEffectOn(true);
                    break;
                case 1:
                    SoundEffectMgr.setSoundEffectOn(false);
                    break;
                default :
                    break;
            }
        }

        this.SoundSetButton = new SetButton("ON", "OFF", setSoundCallback);
        this.SoundSetButton.setCurrentSelected(0);
        this.SoundSetButton.x = 100;
        this.SoundSetButton.y = 80;
        this.addChild(this.SoundSetButton);
    }
}