var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SetScene = (function (_super) {
    __extends(SetScene, _super);
    function SetScene() {
        var _this = _super.call(this) || this;
        _this.width = 432;
        _this.height = 120;
        _this.init();
        return _this;
    }
    SetScene.prototype.init = function () {
        this.initBg();
        this.initLan();
        this.initSound();
    };
    SetScene.prototype.initBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.84);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    SetScene.prototype.initLan = function () {
        var lanLabel = new eui.Label("Language");
        lanLabel.x = 50;
        lanLabel.y = 20;
        lanLabel.size = 25;
        this.addChild(lanLabel);
        function setLanCallback(selected) {
            switch (selected) {
                case 0:
                    Lang.changeLang("EN");
                    break;
                case 1:
                    Lang.changeLang("ZH");
                    break;
                default:
                    break;
            }
        }
        this.lanSetButton = new SetButton("ENG", "简体", setLanCallback);
        this.lanSetButton.setCurrentSelected(1);
        this.lanSetButton.x = 100;
        this.lanSetButton.y = 20;
        this.addChild(this.lanSetButton);
    };
    SetScene.prototype.initSound = function () {
        var soundLabel = new eui.Label("Sounds");
        soundLabel.x = 50;
        soundLabel.y = 80;
        soundLabel.size = 25;
        this.addChild(soundLabel);
        function setSoundCallback(selected) {
            switch (selected) {
                case 0:
                    SoundEffectMgr.setSoundEffectOn(true);
                    break;
                case 1:
                    SoundEffectMgr.setSoundEffectOn(false);
                    break;
                default:
                    break;
            }
        }
        this.SoundSetButton = new SetButton("ON", "OFF", setSoundCallback);
        this.SoundSetButton.setCurrentSelected(0);
        this.SoundSetButton.x = 100;
        this.SoundSetButton.y = 80;
        this.addChild(this.SoundSetButton);
    };
    return SetScene;
}(eui.Component));
__reflect(SetScene.prototype, "SetScene");
//# sourceMappingURL=SetScene.js.map