/**
 * 大厅信息
 */
class HallTableInfo {

    public gameType:number = 0;          //游戏种类
    public tableID:number = 0;          //桌号
    public stage:number = 0;           //场
    public inning:number = 0;           //次
    public status:number = 0;           //状态
    public time:number = 0;           //倒计时
    public ways = "";          //路单
    public allWays = "";
    public counts:string = "";           //结果
    public isopen:boolean = true;          //是否开桌
    public dealer:string = "";          //荷官
    public limit:string = "";          //限红
    public platform : number = 0;

    public wayArray = [];

    public setGameType(gameType) {
        this.gameType = gameType;
    }

    public getGameType() {
        return this.gameType;
    }

    public setTableId(tableID) {
        this.tableID = tableID;
    }

    public getTableId() {
        return this.tableID;
    }

    public setStage(stage) {
        this.stage = stage;
    }

    public getStage() {
        return this.stage;
    }

    public setInning(inning) {
        this.inning = inning;
    }

    public getInning() {
        return this.inning;
    }

    public setStatus(status) {
        this.status = status;
    }

    public getStatus() {
        return this.status;
    }

    public setTime(time) {
        this.time = time;
    }

    public getTime() {
        return this.time;
    }

    public setWays(ways:string) {
        this.ways = ways;
        if(ways.substring(0, 1) == "q") {
            this.allWays = "";
        } else {
            this.allWays = this.allWays+ways;
        }
    }

    public getWays() {
        return this.ways;
    }

    public setCounts(counts) {
        this.counts = counts;
    }

    public getCounts() {
        return this.counts;
    }

    public setIssOpen(isopen) {
        this.isopen = isopen;
    }

    public getIsOpen() {
        return this.isopen;
    }

    public setDealer(dealer) {
        this.dealer = dealer;
    }

    public getDealer() {
        return this.dealer;
    }

    public setLimit(limit) {
        this.limit = limit;
    }

    public getLimit() {
        return this.limit;
    }

    public updateInfo(stage:number,inning:number,status:number,time:number,ways:string,counts:string,isopen:boolean,dealer:string,limit:string,platform:number) {
        
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
    }

    public updateInfoByObject(lobbyTableInfo) {
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
    }
}