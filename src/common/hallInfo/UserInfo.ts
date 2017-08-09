/**
 * 玩家信息类
 */
class UserInfo {

    public static instance:UserInfo;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new UserInfo();
        }
        return this.instance;
    }

    public userName:string = "";          //用户名
    public passWord:string = "";
    public balance:number = 0;           //余额
    public betLimitAndChip:string[] = [];           //限红和筹码数组
    public minBetLimit:number = 0;           //最小限红
    public maxBetLimit:number = 0;           //最大限红
    public chipTable:number[] = [10, 20, 50, 60, 100];          //用到的筹码
    public allChipTable:number[] = [10, 20, 50, 80, 100, 200, 400, 500, 800, 1000];           //拥有的筹码
    public currency:string = "";          //币种
    public tips:number = 0;          //消费开关
    public chat:number = 0;          //聊天开关
    public nickName:string = "";          //昵称

    public getUserName() {
        return this.userName;
    }

    public getBalance() {
        return this.balance;
    }

    public getMinBetLimit() {
        return this.minBetLimit;
    }

    public getMaxBetLimit() {
        return this.maxBetLimit;
    }

    public getChipTable() {
        return this.chipTable;
    }

    public getCurrency() {
        return this.currency;
    }

    public getTips() {
        return this.tips;
    }

     public getChat() {
        return this.chat;
    }

     public getNickName() {
        return this.nickName;
    }

    /**
     * 设置用户名和密码
     */
    public setUserAndPwd(userName:string, passWord:string) {
        this.userName = userName;
        this.passWord = passWord;
    }

    /**
     * 设置信息
     */
    public setInfo(userName:string, balance:number, betLimitAndChip:string, currency:string, tips:number, chat:number, nickName:string) {
        this.userName = userName;
        this.balance = balance;
        this.parsebetLimitAndChip(betLimitAndChip);
        this.currency = currency;
        this.tips = tips;
        this.chat = chat;
        this.nickName = nickName;

        console.log("setInfo" + this.userName);
    }

    /**
     * 解析限红和筹码
     */
    public parsebetLimitAndChip(betLimitAndChip:string) {
        var betLimitAndChipString:string = betLimitAndChip.split("|")[1];
        this.betLimitAndChip = betLimitAndChipString.split(":");

        var minBetLimit:number = parseFloat(this.betLimitAndChip[0]);
        this.setMinBetLimit(minBetLimit);

        var maxBetLimit:number = parseFloat(this.betLimitAndChip[1]);
        this.setMaxBetLimit(maxBetLimit);

        var chipStringTable:string[] = this.betLimitAndChip[2].split(",");
        this.setChip(chipStringTable);

        var allChipStringTable:string[] = this.betLimitAndChip[3].split(",");
        this.setAllChip(allChipStringTable);
    }

    /**
     * 将服务器返回的字符串解析出最小限红
     */
    public setMinBetLimit(minBetLimit:number) {
        this.minBetLimit = minBetLimit;
    }
    /**
     * 将服务器返回的字符串解析出最大限红
     */
    public setMaxBetLimit(maxBetLimit) {
        this.maxBetLimit = maxBetLimit;
    }

    public setChip(chipStringTable:string[]) {
        this.chipTable = [];
        for(var i = 0; i < chipStringTable.length; i++) {
            this.chipTable[i] = parseFloat(chipStringTable[i]);
        }
    }

    public setAllChip(allChipStringTable:string[]) {
        this.allChipTable = [];
        for(var i = 0; i < allChipStringTable.length; i++) {
            this.allChipTable[i] = parseFloat(allChipStringTable[i]);
        }
    }
}