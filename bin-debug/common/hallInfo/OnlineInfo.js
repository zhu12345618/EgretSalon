var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 在线人数信息类
 */
var OnlineInfo = (function () {
    function OnlineInfo() {
        this.inlineNum = 0;
    }
    OnlineInfo.getInstance = function () {
        if (this.instance == null) {
            this.instance = new OnlineInfo();
        }
        return this.instance;
    };
    OnlineInfo.prototype.setOnlineNum = function (inlineNum) {
        this.inlineNum = inlineNum;
    };
    OnlineInfo.prototype.getOnlineNum = function () {
        return this.inlineNum;
    };
    return OnlineInfo;
}());
__reflect(OnlineInfo.prototype, "OnlineInfo");
//# sourceMappingURL=OnlineInfo.js.map