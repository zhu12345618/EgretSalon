var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录界面
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/loginScene/LoginSceneSkin.exml";
        RES.loadGroup("hallScene");
        _this.initENGAndZHLabel();
        _this.updateLanguage();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    LoginScene.prototype.onAddtoStage = function (event) {
        this.addEventToEditText();
        EventDispatcher.getInstance().addEventListener(Events.GET_LOGIN_CODE, this.onGetLoginCode, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    };
    LoginScene.prototype.onRemoveFromStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_LOGIN_CODE, this.onGetLoginCode, this);
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    };
    LoginScene.prototype.addEventToEditText = function () {
        this.userName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setUserNameEmpty, this);
        this.passWord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setPassWordEmpty, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.loginBtnDown, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.login, this);
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.loginCancel, this);
        this.freeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.enterFreeDown, this);
        this.freeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterFree, this);
        this.freeBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.freeCancel, this);
        this.ENGLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickENGLabel, this);
        this.ZHLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickZHLabel, this);
    };
    /**
     * 清空用户数据
     */
    LoginScene.prototype.setUserNameEmpty = function () {
        this.userName.text = "";
    };
    /**
     * 清空用户密码
     */
    LoginScene.prototype.setPassWordEmpty = function () {
        this.passWord.text = "";
    };
    /**
     * 按下登录
     */
    LoginScene.prototype.loginBtnDown = function (event) {
        event.target.scaleX = 0.9;
        event.target.scaleY = 0.9;
    };
    /**
     * 登录
     */
    LoginScene.prototype.login = function (event) {
        var userNameText = this.userName.text;
        var passWordText = this.passWord.text;
        event.target.scaleX = 1;
        event.target.scaleY = 1;
        if (this.userName.text == "") {
            Utils.alertView(Lang.getStr("TEXT_NO_NAME"));
            return;
        }
        if (this.passWord.text == "") {
            Utils.alertView(Lang.getStr("TEXT_NO_PWD"));
            return;
        }
        UserInfo.getInstance().setUserAndPwd(userNameText, passWordText);
        GameServerManager.getInstance().login(userNameText, passWordText);
    };
    /**
     * 登录取消
     */
    LoginScene.prototype.loginCancel = function (event) {
        event.target.scaleX = 1;
        event.target.scaleY = 1;
    };
    /**
     * 按下试玩
     */
    LoginScene.prototype.enterFreeDown = function (event) {
        event.target.scaleX = 0.9;
        event.target.scaleY = 0.9;
    };
    /**
     * 试玩
     */
    LoginScene.prototype.enterFree = function (event) {
        event.target.scaleX = 1;
        event.target.scaleY = 1;
    };
    /**
     * 取消试玩
     */
    LoginScene.prototype.freeCancel = function (event) {
        event.target.scaleX = 1;
        event.target.scaleY = 1;
    };
    /**
     * 进入大厅
     */
    LoginScene.prototype.enterHall = function () {
        this.removeSelf();
        var loadingView = new LoadingUI();
        ViewZorderManager.getInstance().addChild(loadingView);
        RES.loadGroup("hallScene");
    };
    /**
     * 从舞台中移除自己
     */
    LoginScene.prototype.removeSelf = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 获取登录码
     */
    LoginScene.prototype.onGetLoginCode = function (event) {
        var code = event.data;
        switch (code) {
            case LoginData.LOGINSUCCEED:
                this.enterHall();
                break;
            case LoginData.DATAERROR:
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_1"));
                break;
            case LoginData.USERNAMEERROR:
                console.log("账号错误");
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_2"));
                break;
            case LoginData.PASSWORDERROR:
                console.log("密码错误");
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_3"));
                break;
            case LoginData.PASSWORDERROR:
                console.log("此账号已锁定");
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_4"));
                break;
            case LoginData.PASSWORDERROR:
                console.log("此账号已登录");
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_5"));
                break;
            case LoginData.PASSWORDERROR:
                console.log("代理维护中");
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_6"));
                break;
            default:
                console.log("数据错误");
                Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_1"));
                break;
        }
    };
    /**
     * 更新语言
     */
    LoginScene.prototype.updateLanguage = function () {
        this.userName.text = Lang.getStr('TEXT_USERNAME');
        this.passWord.text = Lang.getStr('TEXT_PASSWORD');
        this.userName.prompt = Lang.getStr('TEXT_USERNAME');
        this.passWord.prompt = Lang.getStr('TEXT_PASSWORD');
        this.loginBtn.label = Lang.getStr('TEXT_LOGIN');
        this.freeBtn.label = Lang.getStr('TEXT_RESET');
    };
    LoginScene.prototype.initENGAndZHLabel = function () {
        this.ENGLabel.textColor = Lang.kind == "EN" ? 0x19910d : 0xffffff;
        this.ZHLabel.textColor = Lang.kind == "ZH" ? 0x19910d : 0xffffff;
    };
    LoginScene.prototype.onClickENGLabel = function () {
        this.ENGLabel.textColor = 0x19910d;
        this.ZHLabel.textColor = 0xffffff;
        Lang.changeLang("EN");
    };
    LoginScene.prototype.onClickZHLabel = function () {
        this.ZHLabel.textColor = 0x19910d;
        this.ENGLabel.textColor = 0xffffff;
        Lang.changeLang("ZH");
    };
    return LoginScene;
}(eui.Component));
__reflect(LoginScene.prototype, "LoginScene");
//# sourceMappingURL=LoginScene.js.map