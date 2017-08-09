var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaccaratGame = (function (_super) {
    __extends(BaccaratGame, _super);
    function BaccaratGame() {
        var _this = _super.call(this) || this;
        _this.initBet();
        _this.initTimer();
        _this.initTop();
        _this.initSetScene();
        return _this;
    }
    /**
     * 虚拟函数 需要重写
     */
    BaccaratGame.prototype.onAddtoStage = function (event) {
        this.room = new BaccaratRooms(BaccaratGame.tableId);
        this.limitInfoLayer = new BaccaratLimitInfoLayer();
        this.limitInfoLayer.x = 568;
        this.limitInfoLayer.y = 58;
        _super.prototype.onAddtoStage.call(this, event);
        EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_INFO_BTN, this.geInfoBtnEvent, this);
        EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_ROOM_BTN, this.getRoomBtnEvent, this);
        EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_SET_BTN, this.getSetBtnEvent, this);
        EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
    };
    /**
     * 虚拟函数 需要重写
     */
    BaccaratGame.prototype.onRemoveStage = function (event) {
        _super.prototype.onRemoveStage.call(this, event);
        EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_INFO_BTN, this.geInfoBtnEvent, this);
        EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_ROOM_BTN, this.getRoomBtnEvent, this);
        EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_SET_BTN, this.getSetBtnEvent, this);
        EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
    };
    /**
     * 初始化赌桌
     */
    BaccaratGame.prototype.initBet = function () {
        this._bet = new BaccaratBet(BaccaratGame.tableId);
        this.addChild(this._bet);
    };
    /**
     * 初始化色宝的时间倒计时
     */
    BaccaratGame.prototype.initTimer = function () {
        this._timer = new CountDownTimer();
        this._timer.x = 980;
        this._timer.y = 80;
        this.addChild(this._timer);
    };
    //初始化设置界面
    BaccaratGame.prototype.initSetScene = function () {
        this.setScene = new SetScene();
        this.setScene.x = 568;
        this.setScene.y = 58;
    };
    /**
     * 获取结果
     */
    BaccaratGame.prototype.getGameStateResult = function (result) {
        _super.prototype.getGameStateResult.call(this, result);
        var alertView = new AlertView();
        alertView.addBg(500, 200);
        alertView.addText(Lang.getStr("RESULT"), 0, 65);
        var resultJson;
        switch (Game.gameType) {
            case ProtobufManager.GameType.Baccarat:
                resultJson = RES.getRes("baccaratResult_json");
                break;
            case ProtobufManager.GameType.LongHu:
                resultJson = RES.getRes("longhuResult_json");
                break;
        }
        alertView.addText(resultJson[result], 0, 105);
        alertView.setRemoveTimer(4000);
        AlertZorderManager.getInstance().addChild(alertView);
    };
    //获取换桌事件
    BaccaratGame.prototype.getRoomBtnEvent = function () {
        if (this.room.parent) {
            this.room.parent.removeChild(this.room);
        }
        else {
            this.addChild(this.room);
        }
    };
    //获取信息事件
    BaccaratGame.prototype.geInfoBtnEvent = function () {
        if (this.limitInfoLayer.parent) {
            this.limitInfoLayer.parent.removeChild(this.limitInfoLayer);
            EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_INFO_TEXTURE, "topInfo_png");
        }
        else {
            this.addChild(this.limitInfoLayer);
            EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_INFO_TEXTURE, "topInfoPressed_png");
        }
    };
    //获取设置事件
    BaccaratGame.prototype.getSetBtnEvent = function () {
        if (this.setScene.parent) {
            this.setScene.parent.removeChild(this.setScene);
            EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_SET_TEXTURE, "topSet_png");
        }
        else {
            this.addChild(this.setScene);
            EventDispatcher.getInstance().sendDataEvent(Events.CHANGE_TOP_SET_TEXTURE, "topSetPressed_png");
        }
    };
    //获取退出按钮事件
    BaccaratGame.prototype.getExitBtnEvent = function () {
        ViewZorderManager.getInstance().removeChildren();
        ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Baccarat));
        GameServerManager.getInstance().gameExit(ProtobufManager.GameType.Baccarat);
    };
    return BaccaratGame;
}(Game));
BaccaratGame.baccaratType = 111;
BaccaratGame.tableId = 0;
__reflect(BaccaratGame.prototype, "BaccaratGame");
//# sourceMappingURL=BaccaratGame.js.map