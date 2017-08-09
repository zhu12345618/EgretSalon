var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏状态信息
 */
var GameStateInfo = (function () {
    function GameStateInfo() {
        this.tableID = 0;
        this.stage = 0;
        this.inning = 0;
        this.status = 0;
        this.time = 0;
        this.poker = "";
        this.result = "";
        this.betinfo = [];
        this.vbetinfo = [];
    }
    GameStateInfo.getInstance = function () {
        if (!this.instance) {
            this.instance = new GameStateInfo();
        }
        return this.instance;
    };
    /**
     * 设置游戏状态信息
     */
    GameStateInfo.prototype.setGameStateInfo = function (gameTableStatus) {
        this.tableID = gameTableStatus.tableID;
        this.stage = gameTableStatus.stage;
        this.inning = gameTableStatus.inning;
        this.status = gameTableStatus.status;
        this.time = gameTableStatus.time;
        this.poker = gameTableStatus.poker;
        this.result = gameTableStatus.result;
        this.betinfo = gameTableStatus.betinfo;
        this.vbetinfo = gameTableStatus.vbetinfo;
    };
    GameStateInfo.prototype.setTableID = function (tableID) {
        this.tableID = tableID;
    };
    GameStateInfo.prototype.getTableID = function () {
        return this.tableID;
    };
    GameStateInfo.prototype.setStage = function (stage) {
        this.stage = stage;
    };
    GameStateInfo.prototype.getStage = function () {
        return this.stage;
    };
    GameStateInfo.prototype.setInning = function (inning) {
        this.inning = inning;
    };
    GameStateInfo.prototype.getInning = function () {
        return this.inning;
    };
    GameStateInfo.prototype.setStatus = function (status) {
        this.status = status;
    };
    GameStateInfo.prototype.getStatus = function () {
        return this.status;
    };
    GameStateInfo.prototype.setTime = function (time) {
        this.time = time;
    };
    GameStateInfo.prototype.getTime = function () {
        return this.time;
    };
    GameStateInfo.prototype.setResult = function (result) {
        this.result = result;
    };
    GameStateInfo.prototype.getResult = function () {
        return this.result;
    };
    GameStateInfo.prototype.setPoker = function (poker) {
        this.poker = poker;
    };
    GameStateInfo.prototype.getPoker = function () {
        return this.poker;
    };
    GameStateInfo.prototype.setBetinfo = function (betinfo) {
        this.betinfo = betinfo;
    };
    GameStateInfo.prototype.getBetinfo = function () {
        return this.betinfo;
    };
    GameStateInfo.prototype.setVbetinfo = function (vbetinfo) {
        this.vbetinfo = vbetinfo;
    };
    GameStateInfo.prototype.getVbetinfo = function () {
        return this.vbetinfo;
    };
    return GameStateInfo;
}());
__reflect(GameStateInfo.prototype, "GameStateInfo");
/**
 * 游戏状态枚举
 */
var GAMESTATE;
(function (GAMESTATE) {
    GAMESTATE[GAMESTATE["SHUFFLE"] = 0] = "SHUFFLE";
    GAMESTATE[GAMESTATE["START"] = 1] = "START";
    GAMESTATE[GAMESTATE["STOP"] = 2] = "STOP";
    GAMESTATE[GAMESTATE["PAYOUT"] = 3] = "PAYOUT";
    GAMESTATE[GAMESTATE["OK"] = 4] = "OK";
    GAMESTATE[GAMESTATE["INVALIED"] = 5] = "INVALIED"; //无效
})(GAMESTATE || (GAMESTATE = {}));
var GAMEID;
(function (GAMEID) {
    GAMEID[GAMEID["Roulette"] = 15] = "Roulette";
})(GAMEID || (GAMEID = {}));
//# sourceMappingURL=GameStateInfo.js.map