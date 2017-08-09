var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 界面层管理器
 */
var ViewZorderManager = (function (_super) {
    __extends(ViewZorderManager, _super);
    function ViewZorderManager() {
        var _this = _super.call(this) || this;
        _this.width = GameConfig.width;
        _this.height = GameConfig.height;
        return _this;
    }
    ViewZorderManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new ViewZorderManager();
        }
        return this.instance;
    };
    return ViewZorderManager;
}(eui.Group));
__reflect(ViewZorderManager.prototype, "ViewZorderManager");
//# sourceMappingURL=ViewZorderManager.js.map