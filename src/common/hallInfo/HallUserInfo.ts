/**
 * 大厅玩家信息类
 */
class HallUserInfo {

    public static instance:HallUserInfo;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new HallUserInfo();
        }
        return this.instance;
    }

    public name:string = "";          //用户名
    private passWord:string = "";
    public nick:string = "";          //昵称
    public balance:number = 0;           //余额
    public videoChips:string = "";           //一般游戏筹码
    public rouletteChips : string = "";         //轮盘游戏筹码
    public limits : number = 0;
    public rouletteMinBetLimit : number = 0;        //轮盘限红
    public rouletteMaxBetLimit : number = 0;        //轮盘限红
    public otherMinBetLimit:number = 0;           //最小限红
    public otherMaxBetLimit:number = 0;           //最大限红
    public otherChipTable:number[] = [];          //用到的筹码
    public otherAllChipTable:number[] = [];           //拥有的筹码
    public rouletteChipTable:number[] = [];          //用到的筹码
    public rouletteAllChipTable:number[] = [];           //拥有的筹码
    public moneysort:string = "";          //币种
    public isTip:boolean = false;          //消费开关
    public isChat:boolean = false;          //聊天开关
    public uid : number = 0;
    
    
    public getName() {
        return this.name;
    }

     public getNick() {
        return this.nick;
    }

    public getBalance() {
        return this.balance;
    }

    public getOtherMinBetLimit() {
        return this.otherMinBetLimit;
    }

    public getOtherMaxBetLimit() {
        return this.otherMaxBetLimit;
    }

    public getOtherChipTable() {
        return this.otherChipTable;
    }

    public getOtherAllChipTable() {
        return this.otherAllChipTable;
    }

    public getRouletteMinBetLimit() {
        return this.otherMinBetLimit;
    }

    public getouletteMaxBetLimit() {
        return this.otherMaxBetLimit;
    }

    public getouletteChipTable() {
        return this.otherChipTable;
    }

    public getouletteAllChipTable() {
        return this.otherAllChipTable;
    }

    public getMoneysort() {
        return this.moneysort;
    }

    public getTip() {
        return this.isTip;
    }

     public getChat() {
        return this.isChat;
    }
    

    /**
     * 设置用户名和密码
     */
    public setUserAndPwd(name:string, passWord:string) {
        this.name = name;
        this.passWord = passWord;
    }
    
    //设置用户信息
    public setInfoByObject(userInfo) {
        this.setInfo(userInfo.name, userInfo.nick, userInfo.balance, userInfo.videoChips, 
        userInfo.rouletteChips, userInfo.limits, userInfo.moneysort, userInfo.isTip, userInfo.isChat, userInfo.uid);
    }

    /**
     * 设置信息
     */
    public setInfo(name:string, nick:string, balance:number, videoChips:string, rouletteChips:string, limits : number, moneysort:string, isTip:boolean, isChat:boolean, uid : number) {
        this.name = name;
        this.nick = nick;
        this.balance = balance;

        var otherLimitChipsObject =  this.parsebetLimitAndChip(videoChips);
        this.otherMinBetLimit = otherLimitChipsObject.minBetLimit;
        this.otherMaxBetLimit = otherLimitChipsObject.maxBetLimit;
        this.otherChipTable = otherLimitChipsObject.chipTable;
        this.otherAllChipTable = otherLimitChipsObject.allChipTable;

        var rouletteLimitChipsObject =  this.parsebetLimitAndChip(rouletteChips);
        this.rouletteMinBetLimit = rouletteLimitChipsObject.minBetLimit;
        this.rouletteMaxBetLimit = rouletteLimitChipsObject.maxBetLimit;
        this.rouletteChipTable = rouletteLimitChipsObject.chipTable;
        this.rouletteAllChipTable = rouletteLimitChipsObject.allChipTable;

        this.moneysort = moneysort;
        this.isTip = isTip;
        this.isChat = isChat;
        this.uid = uid;
    }

    /**
     * 解析限红和筹码
     */
    public parsebetLimitAndChip(betLimitAndChip:string) {
        var betLimitAndChipArray = betLimitAndChip.split(":");

        var minBetLimit:number = Number(betLimitAndChipArray[0]);

        var maxBetLimit:number = Number(betLimitAndChipArray[1]);

        var chipStringTable:string[] = betLimitAndChipArray[2].split(",");
        var chipTable = this.setChip(chipStringTable);

        var allChipStringTable:string[] = betLimitAndChipArray[3].split(",");
        var allChipTable = this.setChip(allChipStringTable);
        return {minBetLimit : minBetLimit, maxBetLimit : maxBetLimit, chipTable : chipTable, allChipTable : allChipTable};
    }

    public setChip(chipStringTable:string[]) {
        var chipTable = [];
        for(var i = 0; i < chipStringTable.length; i++) {
            chipTable[i] = Number(chipStringTable[i]);
        }
        return chipTable;
    }
}