var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏状态信息
 */
var UserGameInfo = (function () {
    function UserGameInfo() {
        this.name = "";
        this.balance = 0;
        this.home = 0;
        this.vtable = 0;
        this.vseat = 0;
        this.winlose = 0;
        this.totalbet = 0;
        this.betInfo = [];
    }
    UserGameInfo.getInstance = function () {
        if (!this.instance) {
            this.instance = new UserGameInfo();
        }
        return this.instance;
    };
    /**
     * 设置用户游戏信息
     */
    UserGameInfo.prototype.setUserGameInfo = function (userGameInfo) {
        this.name = userGameInfo.name;
        this.balance = userGameInfo.balance;
        this.home = userGameInfo.home;
        this.vtable = userGameInfo.vtable;
        this.vseat = userGameInfo.vseat;
        this.winlose = userGameInfo.winlose;
        this.totalbet = userGameInfo.totalbet;
        this.betInfo = userGameInfo.betInfo;
    };
    UserGameInfo.prototype.setName = function (userName) {
        this.name = name;
    };
    UserGameInfo.prototype.getName = function () {
        return this.name;
    };
    UserGameInfo.prototype.setBalance = function (balance) {
        this.balance = balance;
    };
    UserGameInfo.prototype.getBalance = function () {
        return this.balance;
    };
    UserGameInfo.prototype.setTableId = function (tableId) {
        this.home = tableId;
    };
    UserGameInfo.prototype.getTableId = function () {
        return this.home;
    };
    UserGameInfo.prototype.setIsWin = function (winNum) {
        this.winlose = winNum;
    };
    UserGameInfo.prototype.getIsWin = function () {
        return this.winlose;
    };
    return UserGameInfo;
}());
__reflect(UserGameInfo.prototype, "UserGameInfo");
//# sourceMappingURL=UserGameInfo.js.map