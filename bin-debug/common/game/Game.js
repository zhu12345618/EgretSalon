var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.isStart = false;
        _this.isStop = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveStage, _this);
        return _this;
    }
    /**
     * 虚拟函数 需要重写
     */
    Game.prototype.onAddtoStage = function (event) {
        EventDispatcher.getInstance().addEventListener(Events.GET_GAME_STATE, this.getGameState, this);
    };
    /**
     * 虚拟函数 需要重写
     */
    Game.prototype.onRemoveStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_GAME_STATE, this.getGameState, this);
    };
    /**
     * 初始化顶部
     */
    Game.prototype.initTop = function () {
        this._top = new Top();
        this.addChild(this._top);
    };
    /**
     * 初始化色宝的时间倒计时
     */
    Game.prototype.initTimer = function () {
        this._timer = new CountDownTimer();
        this._timer.x = 200;
        this._timer.y = 1000;
        this.addChild(this._timer);
    };
    /**
     * 获取游戏状态信息
     */
    Game.prototype.getGameState = function (event) {
        var gameStateInfo = event.data;
        switch (gameStateInfo.getStatus()) {
            case GAMESTATE.SHUFFLE:
                this.getGameStateShuffle();
                break;
            case GAMESTATE.START:
                this.getGameStateStart();
                break;
            case GAMESTATE.STOP:
                console.info(gameStateInfo, "gameStateInfo");
                this.getGameStateStop(gameStateInfo.getPoker());
                break;
            case GAMESTATE.PAYOUT:
                this.getGameStateResult(gameStateInfo.getResult());
                break;
            case GAMESTATE.OK:
                this.getGameStateOK();
                break;
            case GAMESTATE.INVALIED:
                this.getGameStateInvalid();
                break;
        }
        var stageEvent = egret.Event.create(egret.Event, Events.GET_GAME_STAGE);
        stageEvent.data = gameStateInfo.getStage();
        EventDispatcher.getInstance().dispatchEvent(stageEvent);
        var inningEvent = egret.Event.create(egret.Event, Events.GET_GAME_ROUND);
        inningEvent.data = gameStateInfo.getInning();
        EventDispatcher.getInstance().dispatchEvent(inningEvent);
    };
    /**
     * 洗牌
     */
    Game.prototype.getGameStateShuffle = function () {
        this.alertView("洗牌");
    };
    /**
     * 开始下注
     */
    Game.prototype.getGameStateStart = function () {
        if (!this.isStart) {
            this.isStart = true;
            this.isStop = false;
            Utils.alertView(Lang.getStr("TEXT_MESSAGE_1"));
            var event = egret.Event.create(egret.Event, Events.GAME_STATE_START);
            EventDispatcher.getInstance().dispatchEvent(event);
            var removeBetAreaAndBetAmountEvent = egret.Event.create(egret.Event, Events.REMOVE_BETAREA_AND_BETAMOUT);
            EventDispatcher.getInstance().dispatchEvent(removeBetAreaAndBetAmountEvent);
            var setBetBtnCanClickEvent = egret.Event.create(egret.Event, Events.SET_BET_BTN_CAN_CLICK);
            setBetBtnCanClickEvent.data = true;
            EventDispatcher.getInstance().dispatchEvent(setBetBtnCanClickEvent);
            var shrinkLiveVideo = egret.Event.create(egret.Event, Events.SHRINK_LIVEVIDEO);
            EventDispatcher.getInstance().dispatchEvent(shrinkLiveVideo);
            SoundEffectMgr.playSound("Betting_Start_mp3");
        }
        else {
            SoundEffectMgr.playSound("Countdown_mp3");
        }
    };
    /**
     * 停止下注
     */
    Game.prototype.getGameStateStop = function (poker) {
        if (!this.isStop) {
            this.isStart = false;
            this.isStop = true;
            Utils.alertView(Lang.getStr("TEXT_MESSAGE_2"));
            var event = egret.Event.create(egret.Event, Events.GAME_STATE_TOP);
            EventDispatcher.getInstance().dispatchEvent(event);
            var removeAllMaskEvent = egret.Event.create(egret.Event, Events.REMOVE_ALL_MASK);
            EventDispatcher.getInstance().dispatchEvent(removeAllMaskEvent);
            var setBetBtnCanClickEvent = egret.Event.create(egret.Event, Events.SET_BET_BTN_CAN_CLICK);
            setBetBtnCanClickEvent.data = false;
            EventDispatcher.getInstance().dispatchEvent(setBetBtnCanClickEvent);
            SoundEffectMgr.playSound("Betting_Stopped_mp3");
        }
        if (poker != "") {
            EventDispatcher.getInstance().sendDataEvent(Events.SHOW_POKER, poker);
        }
    };
    /**
     * 获取结果
     */
    Game.prototype.getGameStateResult = function (result) {
        // var event = egret.Event.create(egret.Event, Events.GET_GAME_RESULT);
        // event.data = result;
        // EventDispatcher.getInstance().dispatchEvent(event);
        SoundEffectMgr.playSound("Display_Result_mp3");
    };
    /**
     * 完成
     */
    Game.prototype.getGameStateOK = function () {
    };
    /**
     * 完成
     */
    Game.prototype.getGameStateInvalid = function () {
        this.alertView("无效");
    };
    /**
     * 弹出弹框
     */
    Game.prototype.alertView = function (msg) {
        Utils.alertView(msg);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map