var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏路单数据
 */
var GameTableHistory = (function () {
    function GameTableHistory() {
        this.tableID = 0; //桌号
        this.way = ""; //路单信息
        this.counts = ""; //不知道是啥
        this.poker = ""; //结果
        this.allWays = ""; ///全部路单
    }
    GameTableHistory.prototype.setTableID = function (tableID) {
        this.tableID = tableID;
    };
    GameTableHistory.prototype.getTableID = function () {
        return this.tableID;
    };
    GameTableHistory.prototype.setWay = function (way) {
        this.way = way;
        if (way.substring(0, 1) == "q") {
            this.allWays = "";
        }
        else {
            this.allWays = this.allWays + way;
        }
    };
    GameTableHistory.prototype.getWay = function () {
        return this.way;
    };
    GameTableHistory.prototype.getAllWays = function () {
        return this.allWays;
    };
    GameTableHistory.prototype.setCounts = function (counts) {
        this.counts = counts;
    };
    GameTableHistory.prototype.getCounts = function () {
        return this.counts;
    };
    GameTableHistory.prototype.setPoker = function (poker) {
        this.poker = poker;
    };
    GameTableHistory.prototype.getPoker = function () {
        return this.poker;
    };
    GameTableHistory.prototype.setInfo = function (tableHistory) {
        this.setTableID(tableHistory.tableID);
        this.setWay(tableHistory.way);
        this.setCounts(tableHistory.counts);
        this.setPoker(tableHistory.poker);
    };
    /**
     * 清空路单
     */
    GameTableHistory.prototype.clearWayBill = function () {
        this.allWays = "";
    };
    return GameTableHistory;
}());
__reflect(GameTableHistory.prototype, "GameTableHistory");
//# sourceMappingURL=GameTableHistory.js.map