/**
 * 游戏路单数据
 */
class GameTableHistory {
    public tableID:number = 0;          //桌号
    public way : string = "";         //路单信息
    public counts : string = "";          //不知道是啥
    public poker:string = "";          //结果

    public allWays : string = "";           ///全部路单


    public setTableID(tableID) {
        this.tableID = tableID;
    }

    public getTableID() {
        return this.tableID;
    }

    public setWay(way:string) {
        this.way = way;
        if(way.substring(0, 1) == "q") {
            this.allWays = "";
        } else {
            this.allWays = this.allWays+way;
        }
    }

    public getWay() {
        return this.way;
    }

    public getAllWays() {
        return this.allWays;
    }

    public setCounts(counts) {
        this.counts = counts;
    }

    public getCounts() {
        return this.counts;
    }

    public setPoker(poker) {
        this.poker = poker;
    }

    public getPoker() {
        return this.poker;
    }

    public setInfo(tableHistory) {
        this.setTableID(tableHistory.tableID);
        this.setWay(tableHistory.way);
        this.setCounts(tableHistory.counts);
        this.setPoker(tableHistory.poker);
    }

    /**
     * 清空路单
     */
    public clearWayBill() {
        this.allWays = "";
    }
}