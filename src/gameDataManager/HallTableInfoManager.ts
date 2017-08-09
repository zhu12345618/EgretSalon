/**
 *  大厅状态数据管理
 */
class HallTableInfoManager {
    
    protected hallStateInfo:any=[];

    public static instance:HallTableInfoManager;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new HallTableInfoManager();
        }
        return this.instance;
    }
    
    /**
     * 设置大厅状态数据
     */
    public setHallStateInfo(lobbyTableInfo) {
        var gameType = lobbyTableInfo.gameType;
        var tableID = lobbyTableInfo.tableID;
        if(!this.hallStateInfo[gameType]) {
            this.hallStateInfo[gameType] = [];
        }
        if(!this.hallStateInfo[gameType][tableID]) {
            var hallTableInfo : HallTableInfo = new HallTableInfo();
            hallTableInfo.updateInfoByObject(lobbyTableInfo);
            this.hallStateInfo[gameType][tableID] = hallTableInfo;
            this.addTables(hallTableInfo);
        } else {
            this.hallStateInfo[gameType][tableID].updateInfoByObject(lobbyTableInfo);
            EventDispatcher.getInstance().sendDataEvent(Events.GET_HALL_STATE_INFO, this.hallStateInfo[gameType][tableID]);
        }
    }

    /**
     * 获取大厅状态数据
     */
    public getHallStateInfo(gameType) {
        return this.hallStateInfo[gameType];
    }

    //获取大厅的一桌的数据
    public getHallOneTableInfo(gameType, tableID) {
        return this.hallStateInfo[gameType][tableID];
    }

    /**
     * 清理大厅状态数据
     */
    public clearHallStateInfo() {
        this.hallStateInfo = [];
    }

    //发送增加新桌信息
    private addTables( hallTableInfo) {
        EventDispatcher.getInstance().sendDataEvent(Events.ADD_HALL_BACCARAT_WAY, hallTableInfo);
    }
}