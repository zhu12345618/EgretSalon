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
var WaitingDataZorderManager = (function (_super) {
    __extends(WaitingDataZorderManager, _super);
    function WaitingDataZorderManager() {
        var _this = _super.call(this) || this;
        _this.width = GameConfig.width;
        _this.height = GameConfig.height;
        _this.addInvisibleBg();
        return _this;
    }
    WaitingDataZorderManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new WaitingDataZorderManager();
        }
        return this.instance;
    };
    /**
    * 增加透明背景
    */
    WaitingDataZorderManager.prototype.addInvisibleBg = function () {
        this.bg = new eui.Image(RES.getRes("blackBackground_png"));
        this.bg.alpha = 0.5;
        this.bg.width = GameConfig.width;
        this.bg.height = GameConfig.height;
    };
    /**
     * 重写addChild
     */
    WaitingDataZorderManager.prototype.addChildToManager = function (child) {
        if (!this.parent) {
            UIManager.getStage().addChild(this);
            this.parent.setChildIndex(this, 3);
            this.visible = false;
            egret.setTimeout(function () {
                this.visible = true;
            }, this, 200);
        }
        if (!this.bg.parent) {
            this.addChild(this.bg);
        }
        this.addChild(child);
    };
    /**
     * 重写removeChild
     */
    WaitingDataZorderManager.prototype.removeChildToManager = function (child) {
        this.removeChild(child);
        if (this.numChildren == 1) {
            this.removeChild(this.bg);
            this.parent.removeChild(this);
        }
    };
    /**
     * 添加等待数据界面
     */
    WaitingDataZorderManager.prototype.addWaitingDataLayer = function () {
        if (!this.getChildByName("waiting")) {
            var waiting = new eui.Image(RES.getRes("loading_png"));
            waiting.name = "waiting";
            waiting.anchorOffsetX = 92 / 2;
            waiting.anchorOffsetY = 92 / 2;
            egret.Tween.get(waiting, { loop: true }).to({ rotation: -360 }, 1500);
            this.addChildToManager(waiting);
            waiting.x = this.width / 2;
            waiting.y = this.height / 2;
        }
    };
    /**
     * 移除等待数据界面
     */
    WaitingDataZorderManager.prototype.removeWaitingDataLayer = function () {
        var waiting = this.getChildByName("waiting");
        if (waiting && waiting.parent) {
            this.removeChildToManager(waiting);
        }
    };
    return WaitingDataZorderManager;
}(egret.DisplayObjectContainer));
__reflect(WaitingDataZorderManager.prototype, "WaitingDataZorderManager");
//# sourceMappingURL=WaitingDataZorderManager.js.map