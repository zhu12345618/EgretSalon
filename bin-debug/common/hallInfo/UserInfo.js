var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家信息类
 */
var UserInfo = (function () {
    function UserInfo() {
        this.userName = ""; //用户名
        this.passWord = "";
        this.balance = 0; //余额
        this.betLimitAndChip = []; //限红和筹码数组
        this.minBetLimit = 0; //最小限红
        this.maxBetLimit = 0; //最大限红
        this.chipTable = [10, 20, 50, 60, 100]; //用到的筹码
        this.allChipTable = [10, 20, 50, 80, 100, 200, 400, 500, 800, 1000]; //拥有的筹码
        this.currency = ""; //币种
        this.tips = 0; //消费开关
        this.chat = 0; //聊天开关
        this.nickName = ""; //昵称
    }
    UserInfo.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UserInfo();
        }
        return this.instance;
    };
    UserInfo.prototype.getUserName = function () {
        return this.userName;
    };
    UserInfo.prototype.getBalance = function () {
        return this.balance;
    };
    UserInfo.prototype.getMinBetLimit = function () {
        return this.minBetLimit;
    };
    UserInfo.prototype.getMaxBetLimit = function () {
        return this.maxBetLimit;
    };
    UserInfo.prototype.getChipTable = function () {
        return this.chipTable;
    };
    UserInfo.prototype.getCurrency = function () {
        return this.currency;
    };
    UserInfo.prototype.getTips = function () {
        return this.tips;
    };
    UserInfo.prototype.getChat = function () {
        return this.chat;
    };
    UserInfo.prototype.getNickName = function () {
        return this.nickName;
    };
    /**
     * 设置用户名和密码
     */
    UserInfo.prototype.setUserAndPwd = function (userName, passWord) {
        this.userName = userName;
        this.passWord = passWord;
    };
    /**
     * 设置信息
     */
    UserInfo.prototype.setInfo = function (userName, balance, betLimitAndChip, currency, tips, chat, nickName) {
        this.userName = userName;
        this.balance = balance;
        this.parsebetLimitAndChip(betLimitAndChip);
        this.currency = currency;
        this.tips = tips;
        this.chat = chat;
        this.nickName = nickName;
        console.log("setInfo" + this.userName);
    };
    /**
     * 解析限红和筹码
     */
    UserInfo.prototype.parsebetLimitAndChip = function (betLimitAndChip) {
        var betLimitAndChipString = betLimitAndChip.split("|")[1];
        this.betLimitAndChip = betLimitAndChipString.split(":");
        var minBetLimit = parseFloat(this.betLimitAndChip[0]);
        this.setMinBetLimit(minBetLimit);
        var maxBetLimit = parseFloat(this.betLimitAndChip[1]);
        this.setMaxBetLimit(maxBetLimit);
        var chipStringTable = this.betLimitAndChip[2].split(",");
        this.setChip(chipStringTable);
        var allChipStringTable = this.betLimitAndChip[3].split(",");
        this.setAllChip(allChipStringTable);
    };
    /**
     * 将服务器返回的字符串解析出最小限红
     */
    UserInfo.prototype.setMinBetLimit = function (minBetLimit) {
        this.minBetLimit = minBetLimit;
    };
    /**
     * 将服务器返回的字符串解析出最大限红
     */
    UserInfo.prototype.setMaxBetLimit = function (maxBetLimit) {
        this.maxBetLimit = maxBetLimit;
    };
    UserInfo.prototype.setChip = function (chipStringTable) {
        this.chipTable = [];
        for (var i = 0; i < chipStringTable.length; i++) {
            this.chipTable[i] = parseFloat(chipStringTable[i]);
        }
    };
    UserInfo.prototype.setAllChip = function (allChipStringTable) {
        this.allChipTable = [];
        for (var i = 0; i < allChipStringTable.length; i++) {
            this.allChipTable[i] = parseFloat(allChipStringTable[i]);
        }
    };
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
//# sourceMappingURL=UserInfo.js.map