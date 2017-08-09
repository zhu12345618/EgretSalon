var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaccaratLimitInfoLayer = (function (_super) {
    __extends(BaccaratLimitInfoLayer, _super);
    function BaccaratLimitInfoLayer() {
        var _this = _super.call(this) || this;
        _this.width = 432;
        _this.height = 215;
        _this.init();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    BaccaratLimitInfoLayer.prototype.onAddtoStage = function () {
        this.setLabelText();
        this.updateLanguage();
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    };
    BaccaratLimitInfoLayer.prototype.onRemoveFromStage = function () {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    };
    BaccaratLimitInfoLayer.prototype.init = function () {
        this.initBg();
        this.initPreLabel();
        this.initLabel();
    };
    BaccaratLimitInfoLayer.prototype.initBg = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.84);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    BaccaratLimitInfoLayer.prototype.initPreLabel = function () {
        this.maxBetPreLabel = new eui.Label();
        this.maxBetPreLabel.x = 110;
        this.maxBetPreLabel.y = 20;
        this.maxBetPreLabel.textColor = 0xa89256;
        this.maxBetPreLabel.size = 20;
        this.addChild(this.maxBetPreLabel);
        this.minBetPreLabel = new eui.Label();
        this.minBetPreLabel.x = 110;
        this.minBetPreLabel.y = 50;
        this.minBetPreLabel.textColor = 0xa89256;
        this.minBetPreLabel.size = 20;
        this.addChild(this.minBetPreLabel);
        this.tieMaxBetPreLabel = new eui.Label();
        this.tieMaxBetPreLabel.x = 110;
        this.tieMaxBetPreLabel.y = 80;
        this.tieMaxBetPreLabel.textColor = 0xa89256;
        this.tieMaxBetPreLabel.size = 20;
        this.addChild(this.tieMaxBetPreLabel);
        this.tieMinBetPreLabel = new eui.Label();
        this.tieMinBetPreLabel.x = 110;
        this.tieMinBetPreLabel.y = 110;
        this.tieMinBetPreLabel.textColor = 0xa89256;
        this.tieMinBetPreLabel.size = 20;
        this.addChild(this.tieMinBetPreLabel);
        this.pairMaxBetPreLabel = new eui.Label();
        this.pairMaxBetPreLabel.x = 110;
        this.pairMaxBetPreLabel.y = 140;
        this.pairMaxBetPreLabel.textColor = 0xa89256;
        this.pairMaxBetPreLabel.size = 20;
        this.addChild(this.pairMaxBetPreLabel);
        this.pairMinBetPreLabel = new eui.Label();
        this.pairMinBetPreLabel.x = 110;
        this.pairMinBetPreLabel.y = 170;
        this.pairMinBetPreLabel.textColor = 0xa89256;
        this.pairMinBetPreLabel.size = 20;
        this.addChild(this.pairMinBetPreLabel);
    };
    BaccaratLimitInfoLayer.prototype.initLabel = function () {
        this.maxBetLabel = new eui.Label();
        this.maxBetLabel.x = 250;
        this.maxBetLabel.y = 20;
        this.maxBetLabel.size = 20;
        this.addChild(this.maxBetLabel);
        this.minBetLabel = new eui.Label();
        this.minBetLabel.x = 250;
        this.minBetLabel.y = 50;
        this.minBetLabel.size = 20;
        this.addChild(this.minBetLabel);
        this.tieMaxBetLabel = new eui.Label();
        this.tieMaxBetLabel.x = 250;
        this.tieMaxBetLabel.y = 80;
        this.tieMaxBetLabel.size = 20;
        this.addChild(this.tieMaxBetLabel);
        this.tieMinBetLabel = new eui.Label();
        this.tieMinBetLabel.x = 250;
        this.tieMinBetLabel.y = 110;
        this.tieMinBetLabel.size = 20;
        this.addChild(this.tieMinBetLabel);
        this.pairMaxBetLabel = new eui.Label();
        this.pairMaxBetLabel.x = 250;
        this.pairMaxBetLabel.y = 140;
        this.pairMaxBetLabel.size = 20;
        this.addChild(this.pairMaxBetLabel);
        this.pairMinBetLabel = new eui.Label();
        this.pairMinBetLabel.x = 250;
        this.pairMinBetLabel.y = 170;
        this.pairMinBetLabel.size = 20;
        this.addChild(this.pairMinBetLabel);
    };
    BaccaratLimitInfoLayer.prototype.setLabelText = function () {
        this.maxBetLabel.text = HallUserInfo.getInstance().getOtherMaxBetLimit() + "";
        this.minBetLabel.text = HallUserInfo.getInstance().getOtherMinBetLimit() + "";
        this.tieMaxBetLabel.text = HallUserInfo.getInstance().getOtherMaxBetLimit() + "";
        this.tieMinBetLabel.text = HallUserInfo.getInstance().getOtherMinBetLimit() + "";
        this.pairMaxBetLabel.text = HallUserInfo.getInstance().getOtherMaxBetLimit() + "";
        this.pairMinBetLabel.text = HallUserInfo.getInstance().getOtherMinBetLimit() + "";
    };
    BaccaratLimitInfoLayer.prototype.updateLanguage = function () {
        this.maxBetPreLabel.text = Lang.getStr('MAX_BET');
        this.minBetPreLabel.text = Lang.getStr('MIN_BET');
        this.tieMaxBetPreLabel.text = Lang.getStr('TIE_BET_MAX');
        this.tieMinBetPreLabel.text = Lang.getStr('TIE_BET_MIN');
        this.pairMaxBetPreLabel.text = Lang.getStr('PAIR_BET_MAX');
        this.pairMinBetPreLabel.text = Lang.getStr('PAIR_BET_MIN');
    };
    return BaccaratLimitInfoLayer;
}(eui.Component));
__reflect(BaccaratLimitInfoLayer.prototype, "BaccaratLimitInfoLayer");
//# sourceMappingURL=BaccaratLimitInfoLayer.js.map