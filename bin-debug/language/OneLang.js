var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OneLang = (function (_super) {
    __extends(OneLang, _super);
    function OneLang() {
        var _this = _super.call(this) || this;
        _this.Image = new eui.Image();
        _this.skinName = "resource/loginScene/OneLangSkin.exml";
        _this.customView();
        return _this;
    }
    OneLang.prototype.dataChanged = function () {
        this.Image.texture = RES.getRes("lang_" + this.data + "_png");
    };
    OneLang.prototype.customView = function () {
        this.height = 83;
        this.width = 83;
        this.addChild(this.Image);
    };
    return OneLang;
}(eui.ItemRenderer));
__reflect(OneLang.prototype, "OneLang");
//# sourceMappingURL=OneLang.js.map