var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 大厅玩家信息类
 */
var HallUserInfo = (function () {
    function HallUserInfo() {
        this.name = ""; //用户名
        this.passWord = "";
        this.nick = ""; //昵称
        this.balance = 0; //余额
        this.videoChips = ""; //一般游戏筹码
        this.rouletteChips = ""; //轮盘游戏筹码
        this.limits = 0;
        this.rouletteMinBetLimit = 0; //轮盘限红
        this.rouletteMaxBetLimit = 0; //轮盘限红
        this.otherMinBetLimit = 0; //最小限红
        this.otherMaxBetLimit = 0; //最大限红
        this.otherChipTable = []; //用到的筹码
        this.otherAllChipTable = []; //拥有的筹码
        this.rouletteChipTable = []; //用到的筹码
        this.rouletteAllChipTable = []; //拥有的筹码
        this.moneysort = ""; //币种
        this.isTip = false; //消费开关
        this.isChat = false; //聊天开关
        this.uid = 0;
    }
    HallUserInfo.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HallUserInfo();
        }
        return this.instance;
    };
    HallUserInfo.prototype.getName = function () {
        return this.name;
    };
    HallUserInfo.prototype.getNick = function () {
        return this.nick;
    };
    HallUserInfo.prototype.getBalance = function () {
        return this.balance;
    };
    HallUserInfo.prototype.getOtherMinBetLimit = function () {
        return this.otherMinBetLimit;
    };
    HallUserInfo.prototype.getOtherMaxBetLimit = function () {
        return this.otherMaxBetLimit;
    };
    HallUserInfo.prototype.getOtherChipTable = function () {
        return this.otherChipTable;
    };
    HallUserInfo.prototype.getOtherAllChipTable = function () {
        return this.otherAllChipTable;
    };
    HallUserInfo.prototype.getRouletteMinBetLimit = function () {
        return this.otherMinBetLimit;
    };
    HallUserInfo.prototype.getouletteMaxBetLimit = function () {
        return this.otherMaxBetLimit;
    };
    HallUserInfo.prototype.getouletteChipTable = function () {
        return this.otherChipTable;
    };
    HallUserInfo.prototype.getouletteAllChipTable = function () {
        return this.otherAllChipTable;
    };
    HallUserInfo.prototype.getMoneysort = function () {
        return this.moneysort;
    };
    HallUserInfo.prototype.getTip = function () {
        return this.isTip;
    };
    HallUserInfo.prototype.getChat = function () {
        return this.isChat;
    };
    /**
     * 设置用户名和密码
     */
    HallUserInfo.prototype.setUserAndPwd = function (name, passWord) {
        this.name = name;
        this.passWord = passWord;
    };
    //设置用户信息
    HallUserInfo.prototype.setInfoByObject = function (userInfo) {
        this.setInfo(userInfo.name, userInfo.nick, userInfo.balance, userInfo.videoChips, userInfo.rouletteChips, userInfo.limits, userInfo.moneysort, userInfo.isTip, userInfo.isChat, userInfo.uid);
    };
    /**
     * 设置信息
     */
    HallUserInfo.prototype.setInfo = function (name, nick, balance, videoChips, rouletteChips, limits, moneysort, isTip, isChat, uid) {
        this.name = name;
        this.nick = nick;
        this.balance = balance;
        var otherLimitChipsObject = this.parsebetLimitAndChip(videoChips);
        this.otherMinBetLimit = otherLimitChipsObject.minBetLimit;
        this.otherMaxBetLimit = otherLimitChipsObject.maxBetLimit;
        this.otherChipTable = otherLimitChipsObject.chipTable;
        this.otherAllChipTable = otherLimitChipsObject.allChipTable;
        var rouletteLimitChipsObject = this.parsebetLimitAndChip(rouletteChips);
        this.rouletteMinBetLimit = rouletteLimitChipsObject.minBetLimit;
        this.rouletteMaxBetLimit = rouletteLimitChipsObject.maxBetLimit;
        this.rouletteChipTable = rouletteLimitChipsObject.chipTable;
        this.rouletteAllChipTable = rouletteLimitChipsObject.allChipTable;
        this.moneysort = moneysort;
        this.isTip = isTip;
        this.isChat = isChat;
        this.uid = uid;
    };
    /**
     * 解析限红和筹码
     */
    HallUserInfo.prototype.parsebetLimitAndChip = function (betLimitAndChip) {
        var betLimitAndChipArray = betLimitAndChip.split(":");
        var minBetLimit = Number(betLimitAndChipArray[0]);
        var maxBetLimit = Number(betLimitAndChipArray[1]);
        var chipStringTable = betLimitAndChipArray[2].split(",");
        var chipTable = this.setChip(chipStringTable);
        var allChipStringTable = betLimitAndChipArray[3].split(",");
        var allChipTable = this.setChip(allChipStringTable);
        return { minBetLimit: minBetLimit, maxBetLimit: maxBetLimit, chipTable: chipTable, allChipTable: allChipTable };
    };
    HallUserInfo.prototype.setChip = function (chipStringTable) {
        var chipTable = [];
        for (var i = 0; i < chipStringTable.length; i++) {
            chipTable[i] = Number(chipStringTable[i]);
        }
        return chipTable;
    };
    return HallUserInfo;
}());
__reflect(HallUserInfo.prototype, "HallUserInfo");
//# sourceMappingURL=HallUserInfo.js.map