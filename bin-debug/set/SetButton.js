var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SetButton = (function (_super) {
    __extends(SetButton, _super);
    function SetButton(leftText, rightText, callback) {
        var _this = _super.call(this) || this;
        _this.currentSelected = 0;
        _this.callback = callback;
        _this.init(leftText, rightText);
        return _this;
    }
    SetButton.prototype.init = function (leftText, rightText) {
        this.leftLabel = new eui.Label(leftText);
        this.leftLabel.width = 200;
        this.leftLabel.textAlign = egret.HorizontalAlign.RIGHT;
        this.leftLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLeftLabel, this);
        this.addChild(this.leftLabel);
        var label = new eui.Label("|");
        label.x = 210;
        this.addChild(label);
        this.rightLabel = new eui.Label(rightText);
        this.rightLabel.x = 230;
        this.rightLabel.width = 200;
        this.rightLabel.textAlign = egret.HorizontalAlign.LEFT;
        this.rightLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRightLabel, this);
        this.addChild(this.rightLabel);
    };
    SetButton.prototype.onClickLeftLabel = function () {
        this.leftLabel.textColor = 0x19910d;
        this.rightLabel.textColor = 0xffffff;
        this.callback(0);
    };
    SetButton.prototype.onClickRightLabel = function () {
        this.leftLabel.textColor = 0xffffff;
        this.rightLabel.textColor = 0x19910d;
        this.callback(1);
    };
    SetButton.prototype.setCurrentSelected = function (currentSelected) {
        this.currentSelected = currentSelected;
        switch (this.currentSelected) {
            case 0:
                this.onClickLeftLabel();
                break;
            case 1:
                this.onClickRightLabel();
                break;
            default:
                break;
        }
    };
    return SetButton;
}(eui.Component));
__reflect(SetButton.prototype, "SetButton");
//# sourceMappingURL=SetButton.js.map