var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager() {
    }
    UIManager.init = function (stage) {
        this.stage = stage;
        this.addAlerZorderManager();
        this.addViewZorderManager();
    };
    /**
     * 添加界面层
     */
    UIManager.addViewZorderManager = function () {
        this.stage.addChild(ViewZorderManager.getInstance());
        this.stage.setChildIndex(ViewZorderManager.getInstance(), 1);
    };
    /**
     * 添加弹出层
     */
    UIManager.addAlerZorderManager = function () {
        this.stage.addChild(AlertZorderManager.getInstance());
        this.stage.setChildIndex(AlertZorderManager.getInstance(), 2);
    };
    UIManager.getStage = function () {
        return this.stage;
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map