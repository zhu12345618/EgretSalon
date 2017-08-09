//自定义按钮
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(texture, text) {
        if (texture === void 0) { texture = ""; }
        if (text === void 0) { text = ""; }
        var _this = _super.call(this) || this;
        _this.init();
        if (texture != "") {
            _this.setNormalTexture(texture);
        }
        if (text != "") {
            _this.setLabel(text);
        }
        return _this;
    }
    Button.prototype.init = function () {
        this.normalTexture = new eui.Image();
        this.addChild(this.normalTexture);
        this.label = new eui.Label();
        this.addChild(this.label);
    };
    Button.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        this.normalTexture.width = this.width;
        this.normalTexture.height = this.height;
    };
    Button.prototype.setNormalTexture = function (texture) {
        this.normalTexture.texture = RES.getRes(texture);
        this.normalTexture.width = this.width;
        this.normalTexture.height = this.height;
        this.normalTexture.anchorOffsetX = this.width * 0.5;
        this.normalTexture.anchorOffsetY = this.height * 0.5;
        this.normalTexture.x = this.width * 0.5;
        this.normalTexture.y = this.height * 0.5;
    };
    Button.prototype.setScale9Rect = function (rect) {
        this.normalTexture.scale9Grid = rect;
    };
    Button.prototype.setLabel = function (text, color) {
        if (color === void 0) { color = 0xffffff; }
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.label.width = this.width;
        this.label.height = this.height;
        this.label.anchorOffsetX = this.width / 2;
        this.label.anchorOffsetY = this.height / 2;
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.label.textColor = color;
        this.label.text = text;
    };
    Button.prototype.setLabelPosition = function (x, y) {
        this.label.x = x;
        this.label.y = y;
    };
    Button.prototype.setLabelSize = function (size) {
        this.label.size = size;
    };
    return Button;
}(eui.Component));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map