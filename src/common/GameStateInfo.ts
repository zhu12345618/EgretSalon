/**
 * 游戏状态信息
 */
class GameStateInfo {
    public tableID:number = 0;
    public stage:number = 0;
    public inning:number = 0;
    public status:number = 0;
    public time:number = 0;
    public poker:string = "";
    public result:string = "";
    public betinfo = [];
    public vbetinfo = [];

    constructor() {

    }

    public static instance : GameStateInfo;
    public static getInstance() {
        if(!this.instance) {
            this.instance = new GameStateInfo();
        }
        return this.instance;
    }

    /**
     * 设置游戏状态信息
     */
    public setGameStateInfo(gameTableStatus) {
        this.tableID = gameTableStatus.tableID;
        this.stage = gameTableStatus.stage;
        this.inning = gameTableStatus.inning;
        this.status = gameTableStatus.status;
        this.time = gameTableStatus.time;
        this.poker = gameTableStatus.poker;
        this.result = gameTableStatus.result;
        this.betinfo = gameTableStatus.betinfo;
        this.vbetinfo = gameTableStatus.vbetinfo;
    }

    public setTableID(tableID:number) {
        this.tableID = tableID;
    }

    public getTableID() {
        return this.tableID;
    }

    public setStage(stage:number) {
        this.stage = stage;
    }

    public getStage() {
        return this.stage;
    }

    public setInning(inning:number) {
        this.inning = inning;
    }

    public getInning() {
        return this.inning;
    }

    public setStatus(status:number) {
        this.status = status;
    }

    public getStatus() {
        return this.status;
    }

    public setTime(time:number) {
        this.time = time;
    }

    public getTime() {
        return this.time;
    }

    public setResult(result:string) {
        this.result = result;
    }

    public getResult() {
        return this.result;
    }

    public setPoker(poker:string) {
        this.poker = poker;
    }

    public getPoker() {
        return this.poker;
    }

    public setBetinfo(betinfo) {
        this.betinfo = betinfo;
    }

    public getBetinfo() {
        return this.betinfo;
    }

    public setVbetinfo(vbetinfo) {
        this.vbetinfo = vbetinfo;
    }

    public getVbetinfo() {
        return this.vbetinfo;
    }
}

/**
 * 游戏状态枚举
 */
enum GAMESTATE {
    SHUFFLE = 0,        //洗牌
    START = 1,          //开始
    STOP = 2,           //结束
    PAYOUT = 3,         //结算
    OK = 4,         //完成
    INVALIED = 5            //无效
}

enum GAMEID{
    Roulette = 15
}