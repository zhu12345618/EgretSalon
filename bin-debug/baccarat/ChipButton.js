var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChipButton = (function (_super) {
    __extends(ChipButton, _super);
    function ChipButton() {
        var _this = _super.call(this) || this;
        _this.setSize(96, 96);
        _this.setAddPressedTexture("chipAddPressed_png", 146, 146);
        return _this;
    }
    ChipButton.prototype.setButton = function (display, chip) {
        this.setNormalTexture(display);
        this.setLabel(chip);
        this.setOnClickCallback(function () {
            EventDispatcher.getInstance().sendDataEvent(Events.GET_CURRENT_BET_CHIP_NUM, chip);
        });
    };
    return ChipButton;
}(RadioButton));
__reflect(ChipButton.prototype, "ChipButton");
//# sourceMappingURL=ChipButton.js.map