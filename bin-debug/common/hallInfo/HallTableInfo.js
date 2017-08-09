var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 大厅信息
 */
var HallTableInfo = (function () {
    function HallTableInfo() {
        this.gameType = 0; //游戏种类
        this.tableID = 0; //桌号
        this.stage = 0; //场
        this.inning = 0; //次
        this.status = 0; //状态
        this.time = 0; //倒计时
        this.ways = ""; //路单
        this.allWays = "";
        this.counts = ""; //结果
        this.isopen = true; //是否开桌
        this.dealer = ""; //荷官
        this.limit = ""; //限红
        this.platform = 0;
        this.wayArray = [];
    }
    HallTableInfo.prototype.setGameType = function (gameType) {
        this.gameType = gameType;
    };
    HallTableInfo.prototype.getGameType = function () {
        return this.gameType;
    };
    HallTableInfo.prototype.setTableId = function (tableID) {
        this.tableID = tableID;
    };
    HallTableInfo.prototype.getTableId = function () {
        return this.tableID;
    };
    HallTableInfo.prototype.setStage = function (stage) {
        this.stage = stage;
    };
    HallTableInfo.prototype.getStage = function () {
        return this.stage;
    };
    HallTableInfo.prototype.setInning = function (inning) {
        this.inning = inning;
    };
    HallTableInfo.prototype.getInning = function () {
        return this.inning;
    };
    HallTableInfo.prototype.setStatus = function (status) {
        this.status = status;
    };
    HallTableInfo.prototype.getStatus = function () {
        return this.status;
    };
    HallTableInfo.prototype.setTime = function (time) {
        this.time = time;
    };
    HallTableInfo.prototype.getTime = function () {
        return this.time;
    };
    HallTableInfo.prototype.setWays = function (ways) {
        this.ways = ways;
        if (ways.substring(0, 1) == "q") {
            this.allWays = "";
        }
        else {
            this.allWays = this.allWays + ways;
        }
    };
    HallTableInfo.prototype.getWays = function () {
        return this.ways;
    };
    HallTableInfo.prototype.setCounts = function (counts) {
        this.counts = counts;
    };
    HallTableInfo.prototype.getCounts = function () {
        return this.counts;
    };
    HallTableInfo.prototype.setIssOpen = function (isopen) {
        this.isopen = isopen;
    };
    HallTableInfo.prototype.getIsOpen = function () {
        return this.isopen;
    };
    HallTableInfo.prototype.setDealer = function (dealer) {
        this.dealer = dealer;
    };
    HallTableInfo.prototype.getDealer = function () {
        return this.dealer;
    };
    HallTableInfo.prototype.setLimit = function (limit) {
        this.limit = limit;
    };
    HallTableInfo.prototype.getLimit = function () {
        return this.limit;
    };
    HallTableInfo.prototype.updateInfo = function (stage, inning, status, time, ways, counts, isopen, dealer, limit, platform) {
        this.stage = stage;
        this.inning = inning;
        this.status = status;
        this.time = time;
        this.setWays(ways);
        this.counts = counts;
        this.isopen = isopen;
        this.dealer = dealer;
        this.limit = limit;
        this.platform = platform;
    };
    HallTableInfo.prototype.updateInfoByObject = function (lobbyTableInfo) {
        this.gameType = lobbyTableInfo.gameType;
        this.tableID = lobbyTableInfo.tableID;
        this.stage = lobbyTableInfo.stage;
        this.inning = lobbyTableInfo.inning;
        this.status = lobbyTableInfo.status;
        this.time = lobbyTableInfo.time;
        this.ways = lobbyTableInfo.ways;
        this.setWays(lobbyTableInfo.ways);
        this.counts = lobbyTableInfo.counts;
        this.isopen = lobbyTableInfo.isopen;
        this.dealer = lobbyTableInfo.dealer;
        this.limit = lobbyTableInfo.limit;
        this.platform = lobbyTableInfo.platform;
    };
    return HallTableInfo;
}());
__reflect(HallTableInfo.prototype, "HallTableInfo");
//# sourceMappingURL=HallTableInfo.js.map