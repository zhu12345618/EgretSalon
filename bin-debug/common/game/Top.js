var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Top = (function (_super) {
    __extends(Top, _super);
    function Top() {
        var _this = _super.call(this) || this;
        _this.userName = "";
        _this.balanceNum = 0;
        _this.isStop = false;
        _this.skinName = "resource/common/top/TopSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    Top.prototype.onAddtoStage = function (event) {
        this.setUserGameInfo();
        this.updateLanguage();
        this.roomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRoomBtn, this);
        this.topInfoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTopInfoBtn, this);
        this.topVideoRefreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRefreshVideoBtn, this);
        this.topSetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSetBtn, this);
        this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickExitBtn, this);
        EventDispatcher.getInstance().addEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
        EventDispatcher.getInstance().addEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_TOP_INFO_TEXTURE, this.setInfoTexture, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_TOP_SET_TEXTURE, this.setSetTexture, this);
    };
    Top.prototype.onRemoveFromStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_HALL_USER_INFO, this.getUserInfo, this);
        EventDispatcher.getInstance().removeEventListener(Events.GET_USER_GAME_INFO, this.getUserInfo, this);
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_TOP_INFO_TEXTURE, this.setInfoTexture, this);
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_TOP_SET_TEXTURE, this.setSetTexture, this);
    };
    /**
     * 获取用户游戏信息
     */
    Top.prototype.getUserInfo = function (event) {
        var hallUserInfo = event.data;
        this.setUserName(hallUserInfo.getName());
        this.setBalanceNum(hallUserInfo.getBalance());
    };
    /**
     * 设置用户游戏信息
     */
    Top.prototype.setUserGameInfo = function () {
        var hallUserInfo = HallUserInfo.getInstance();
        var userName = hallUserInfo.getName();
        this.userName = userName;
        this.userNameLabel.text = userName;
        var balanceNum = hallUserInfo.getBalance();
        this.balanceNum = balanceNum;
        this.balanceNumLabel.text = balanceNum.toString();
        ;
    };
    /**
     * 设置用户名
     */
    Top.prototype.setUserName = function (userName) {
        this.userName = userName;
        this.userNameLabel.text = userName;
    };
    /**
     * 设置余额
     */
    Top.prototype.setBalanceNum = function (balanceNum) {
        this.balanceNum = balanceNum;
        this.balanceNumLabel.text = balanceNum.toString();
    };
    /**
     * 更新语言
     */
    Top.prototype.updateLanguage = function () {
        // this.userNameText.text = Lang.getStr('TEXT_USERNAME')+":";
        // this.balanceNumText.text = Lang.getStr('TEXT_BALANCE')+":";
    };
    //换桌按钮
    Top.prototype.onClickRoomBtn = function () {
        EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_ROOM_BTN);
    };
    //信息按钮
    Top.prototype.onClickTopInfoBtn = function () {
        EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_INFO_BTN);
    };
    //视频刷新
    Top.prototype.onClickRefreshVideoBtn = function () {
        EventDispatcher.getInstance().sendNormalEvent(Events.UPDATE_LIVEVIDEO);
    };
    //设置
    Top.prototype.onClickSetBtn = function (event) {
        EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_SET_BTN);
    };
    //退出游戏
    Top.prototype.onClickExitBtn = function (event) {
        EventDispatcher.getInstance().sendNormalEvent(Events.ONCLICK_TOP_EXIT_BTN);
    };
    Top.prototype.setInfoTexture = function (event) {
        this.topInfoBtn.source = event.data;
    };
    Top.prototype.setSetTexture = function (event) {
        this.topSetBtn.source = event.data;
    };
    return Top;
}(eui.Component));
__reflect(Top.prototype, "Top");
//# sourceMappingURL=Top.js.map