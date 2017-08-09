var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 时间倒计时
 */
var CountDownTimer = (function (_super) {
    __extends(CountDownTimer, _super);
    function CountDownTimer() {
        var _this = _super.call(this) || this;
        _this.initTimerBg();
        _this.initTimerLabel();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveStage, _this);
        return _this;
    }
    CountDownTimer.prototype.onAddtoStage = function (event) {
        EventDispatcher.getInstance().addEventListener(Events.GET_GAME_STATE, this.getGameState, this);
    };
    CountDownTimer.prototype.onRemoveStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_GAME_STATE, this.getGameState, this);
    };
    /**
     * 初始化时间背景
     */
    CountDownTimer.prototype.initTimerBg = function () {
        this.timerBg = new eui.Image(RES.getRes("timerBg_png"));
        this.addChild(this.timerBg);
    };
    /**
     * 初始化时间
     */
    CountDownTimer.prototype.initTimerLabel = function () {
        this.timerLabel = new eui.Label("0");
        this.timerLabel.size = 50;
        this.timerLabel.horizontalCenter = 0;
        this.timerLabel.verticalCenter = 0;
        this.addChild(this.timerLabel);
    };
    /**
     * 获取游戏状态信息
     */
    CountDownTimer.prototype.getGameState = function (event) {
        var data = event.data;
        this.timerLabel.text = data.getTime().toString();
    };
    return CountDownTimer;
}(eui.Component));
__reflect(CountDownTimer.prototype, "CountDownTimer");
//# sourceMappingURL=CountDownTimer.js.map