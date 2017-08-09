var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertView = (function (_super) {
    __extends(AlertView, _super);
    function AlertView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
        return _this;
    }
    AlertView.prototype.removeFromStage = function () {
        if (this.removeTimer) {
            this.removeTimer.stop();
        }
    };
    AlertView.prototype.onAddToStage = function () {
        this.anchorOffsetX = this.width * 0.5;
        ;
        this.anchorOffsetY = this.height * 0.5;
        this.x = GameConfig.width / 2;
        this.y = GameConfig.height / 2;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
    };
    /**
     * 初始化背景
     */
    AlertView.prototype.addBg = function (width, height) {
        this.width = width;
        this.height = height;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.5);
        bg.graphics.drawRoundRect(0, 0, this.width, this.height, 20);
        bg.graphics.endFill();
        this.addChild(bg);
    };
    /**
     * 添加文字
     */
    AlertView.prototype.addText = function (text, x, y) {
        var label = new eui.Label();
        label.text = text;
        label.x = x;
        label.y = y;
        label.width = this.width;
        label.textAlign = "center";
        this.addChild(label);
    };
    /**
     * 设置自动消失timer
     */
    AlertView.prototype.setRemoveTimer = function (time) {
        console.log("setRemoveTimer");
        this.removeTimer = new egret.Timer(time);
        this.removeTimer.addEventListener(egret.TimerEvent.TIMER, this.removeSelf, this);
        this.removeTimer.start();
    };
    /**
     * 关闭自己
     */
    AlertView.prototype.removeSelf = function () {
        if (AlertZorderManager.getInstance() == this.parent) {
            AlertZorderManager.getInstance().removeChildToManager(this);
        }
    };
    return AlertView;
}(eui.Component));
__reflect(AlertView.prototype, "AlertView");
//# sourceMappingURL=AlertView.js.map