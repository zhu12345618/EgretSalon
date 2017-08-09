var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *  大厅状态数据管理
 */
var HallTableInfoManager = (function () {
    function HallTableInfoManager() {
        this.hallStateInfo = [];
    }
    HallTableInfoManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HallTableInfoManager();
        }
        return this.instance;
    };
    /**
     * 设置大厅状态数据
     */
    HallTableInfoManager.prototype.setHallStateInfo = function (lobbyTableInfo) {
        var gameType = lobbyTableInfo.gameType;
        var tableID = lobbyTableInfo.tableID;
        if (!this.hallStateInfo[gameType]) {
            this.hallStateInfo[gameType] = [];
        }
        if (!this.hallStateInfo[gameType][tableID]) {
            var hallTableInfo = new HallTableInfo();
            hallTableInfo.updateInfoByObject(lobbyTableInfo);
            this.hallStateInfo[gameType][tableID] = hallTableInfo;
            this.addTables(hallTableInfo);
        }
        else {
            this.hallStateInfo[gameType][tableID].updateInfoByObject(lobbyTableInfo);
            EventDispatcher.getInstance().sendDataEvent(Events.GET_HALL_STATE_INFO, this.hallStateInfo[gameType][tableID]);
        }
    };
    /**
     * 获取大厅状态数据
     */
    HallTableInfoManager.prototype.getHallStateInfo = function (gameType) {
        return this.hallStateInfo[gameType];
    };
    //获取大厅的一桌的数据
    HallTableInfoManager.prototype.getHallOneTableInfo = function (gameType, tableID) {
        return this.hallStateInfo[gameType][tableID];
    };
    /**
     * 清理大厅状态数据
     */
    HallTableInfoManager.prototype.clearHallStateInfo = function () {
        this.hallStateInfo = [];
    };
    //发送增加新桌信息
    HallTableInfoManager.prototype.addTables = function (hallTableInfo) {
        EventDispatcher.getInstance().sendDataEvent(Events.ADD_HALL_BACCARAT_WAY, hallTableInfo);
    };
    return HallTableInfoManager;
}());
__reflect(HallTableInfoManager.prototype, "HallTableInfoManager");
//# sourceMappingURL=HallTableInfoManager.js.map