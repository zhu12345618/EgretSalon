/**
 * 登录界面
 */
class LoginScene extends eui.Component{

    private userName:eui.EditableText;
    private passWord:eui.EditableText;

    private loginBtn:eui.Button;
    private freeBtn:eui.Button;

    private ENGLabel : eui.Label;
    private ZHLabel : eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/loginScene/LoginSceneSkin.exml";
        RES.loadGroup("hallScene");
        this.initENGAndZHLabel();
        this.updateLanguage();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

    private onAddtoStage(event:egret.Event) {
        this.addEventToEditText();

        EventDispatcher.getInstance().addEventListener(Events.GET_LOGIN_CODE, this.onGetLoginCode, this);
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
	}

    private onRemoveFromStage(event:egret.Event) {
        EventDispatcher.getInstance().removeEventListener(Events.GET_LOGIN_CODE, this.onGetLoginCode, this);
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
	}

    private addEventToEditText() {
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
    }

    /**
     * 清空用户数据
     */
    private setUserNameEmpty() {
        this.userName.text = "";
    }

    /**
     * 清空用户密码
     */
    private setPassWordEmpty() {
        this.passWord.text = "";
    }
    
    /**
     * 按下登录
     */
    private loginBtnDown(event:egret.Event) {
        event.target.scaleX = 0.9;
        event.target.scaleY = 0.9;
    }

    /**
     * 登录
     */
    private login(event:egret.Event) {
        var userNameText = this.userName.text;
        var passWordText = this.passWord.text;
        event.target.scaleX = 1;
        event.target.scaleY = 1;

        if(this.userName.text == "") {
            Utils.alertView(Lang.getStr("TEXT_NO_NAME"));
            return ;
        }

        if(this.passWord.text == "") {
            Utils.alertView(Lang.getStr("TEXT_NO_PWD"));
            return ;
        }

        UserInfo.getInstance().setUserAndPwd(userNameText, passWordText);
        GameServerManager.getInstance().login(userNameText, passWordText);
    }
    /**
     * 登录取消
     */
    private loginCancel(event:egret.Event) {
        event.target.scaleX = 1;
        event.target.scaleY = 1;
    }

    /**
     * 按下试玩
     */
    private enterFreeDown(event) {
        event.target.scaleX = 0.9;
        event.target.scaleY = 0.9;
    }

    /**
     * 试玩
     */
    private enterFree(event) {
        event.target.scaleX = 1;
        event.target.scaleY = 1;
    }

    /**
     * 取消试玩
     */
    private freeCancel(event) {
        event.target.scaleX = 1;
        event.target.scaleY = 1;
    }

    /**
     * 进入大厅
     */
    public enterHall() {
        this.removeSelf();
        var loadingView = new LoadingUI();
        ViewZorderManager.getInstance().addChild(loadingView);
        RES.loadGroup("hallScene");
    }

    /**
     * 从舞台中移除自己
     */
    public removeSelf() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    /**
     * 获取登录码
     */
    private onGetLoginCode(event:egret.Event) {
        var code = event.data;

        switch(code) {
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
        default :
            console.log("数据错误");
            Utils.alertView(Lang.getStr("TEXT_LOGIN_RESULT_1"));
            break;
        }
        
    }

    /**
     * 更新语言
     */
    private updateLanguage() {
        this.userName.text = Lang.getStr('TEXT_USERNAME');
        this.passWord.text = Lang.getStr('TEXT_PASSWORD');
        this.userName.prompt = Lang.getStr('TEXT_USERNAME');
        this.passWord.prompt = Lang.getStr('TEXT_PASSWORD');

        this.loginBtn.label = Lang.getStr('TEXT_LOGIN');
        this.freeBtn.label = Lang.getStr('TEXT_RESET');
    }

    private initENGAndZHLabel() {
        this.ENGLabel.textColor = Lang.kind == "EN" ? 0x19910d : 0xffffff;
        this.ZHLabel.textColor = Lang.kind == "ZH" ? 0x19910d : 0xffffff;
    }

    private onClickENGLabel() {
        this.ENGLabel.textColor = 0x19910d;
        this.ZHLabel.textColor = 0xffffff;
        Lang.changeLang("EN");
    }

    private onClickZHLabel() {
        this.ZHLabel.textColor = 0x19910d;
        this.ENGLabel.textColor = 0xffffff;
        Lang.changeLang("ZH");
    }
}