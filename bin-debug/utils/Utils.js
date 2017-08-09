var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 工具类
 */
var Utils = (function () {
    function Utils() {
    }
    /**
     * 弹出一直存在的对话框
     */
    Utils.alertView = function (text) {
        var alertView = new AlertView();
        alertView.addBg(500, 200);
        alertView.addText(text, 0, 90);
        alertView.setRemoveTimer(2000);
        AlertZorderManager.getInstance().addChildToManager(alertView);
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map