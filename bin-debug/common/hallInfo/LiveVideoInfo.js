var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 直播信息类
 */
var LiveVideoInfo = (function () {
    function LiveVideoInfo() {
        this.urlTable = [];
    }
    LiveVideoInfo.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LiveVideoInfo();
        }
        return this.instance;
    };
    /**
     * 设置url数组
     */
    LiveVideoInfo.prototype.setUrlTable = function (url) {
        this.urlTable = url.split("*");
    };
    /**
     * 获取url数组
     */
    LiveVideoInfo.prototype.getUrlTable = function () {
        return this.urlTable;
    };
    //获取视频
    LiveVideoInfo.prototype.getUrl = function (video, table, isHigh) {
        if (table === void 0) { table = 1; }
        if (isHigh === void 0) { isHigh = 2; }
        return this.urlTable[video] + "game" + table + "table" + isHigh;
    };
    return LiveVideoInfo;
}());
__reflect(LiveVideoInfo.prototype, "LiveVideoInfo");
var IsHighDefinition;
(function (IsHighDefinition) {
    IsHighDefinition[IsHighDefinition["Yes"] = 1] = "Yes";
    IsHighDefinition[IsHighDefinition["No"] = 2] = "No";
})(IsHighDefinition || (IsHighDefinition = {}));
//# sourceMappingURL=LiveVideoInfo.js.map