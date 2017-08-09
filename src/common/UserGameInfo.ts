/**
 * 游戏状态信息
 */
class UserGameInfo {
    private name:string = "";
    private balance:number = 0;
    private home:number = 0;
    private vtable:number = 0;
    private vseat:number = 0;
    private winlose:number = 0;
    private totalbet:number = 0;
    private betInfo = [];

    constructor() {

    }

    public static instance : UserGameInfo;
    public static getInstance() {
        if(!this.instance) {
            this.instance = new UserGameInfo();
        }
        return this.instance;
    }

    /**
     * 设置用户游戏信息
     */
    public setUserGameInfo(userGameInfo) {
        this.name = userGameInfo.name;
        this.balance = userGameInfo.balance;
        this.home = userGameInfo.home;
        this.vtable = userGameInfo.vtable;
        this.vseat = userGameInfo.vseat;
        this.winlose = userGameInfo.winlose;
        this.totalbet = userGameInfo.totalbet;
        this.betInfo = userGameInfo.betInfo;
    }

    public setName(userName:string) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public setBalance(balance:number) {
        this.balance = balance;
    }

    public getBalance() {
        return this.balance;
    }

    public setTableId(tableId:number) {
        this.home = tableId;
    }

    public getTableId() {
        return this.home;
    }

    public setIsWin(winNum:number) {
        this.winlose = winNum;
    }

    public getIsWin() {
        return this.winlose;
    }
}