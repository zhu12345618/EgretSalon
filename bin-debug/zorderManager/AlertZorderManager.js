var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹出层管理器
 */
var AlertZorderManager = (function (_super) {
    __extends(AlertZorderManager, _super);
    function AlertZorderManager() {
        var _this = _super.call(this) || this;
        _this.width = GameConfig.width;
        _this.height = GameConfig.height;
        _this.addInvisibleBg();
        return _this;
    }
    AlertZorderManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new AlertZorderManager();
        }
        return this.instance;
    };
    /**
     * 增加透明背景
     */
    AlertZorderManager.prototype.addInvisibleBg = function () {
        this.invisibleBg = new eui.Image(RES.getRes("blackBackground_png"));
        this.invisibleBg.alpha = 0.5;
        this.invisibleBg.width = GameConfig.width;
        this.invisibleBg.height = GameConfig.height;
    };
    /**
     * 重写addChild
     */
    AlertZorderManager.prototype.addChildToManager = function (child) {
        this.addChild(child);
    };
    /**
     * 重写removeChild
     */
    AlertZorderManager.prototype.removeChildToManager = function (child) {
        this.removeChild(child);
    };
    return AlertZorderManager;
}(eui.Component));
__reflect(AlertZorderManager.prototype, "AlertZorderManager");
//# sourceMappingURL=AlertZorderManager.js.map