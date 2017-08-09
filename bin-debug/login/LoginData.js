/**
 * 登录需要的数据
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoginData = (function () {
    function LoginData() {
    }
    return LoginData;
}());
//登录相关的常量
LoginData.LOGINSUCCEED = 0; //登录成功错误码
LoginData.DATAERROR = 1; //数据错误错误码
LoginData.USERNAMEERROR = 2; //账号错误错误码
LoginData.PASSWORDERROR = 3; //密码发错误错误码
LoginData.USERNAMELOCKED = 4; //此账号已错定错误码
LoginData.USERNAMELOGED = 5; //此账号已登录错误码
LoginData.SERVERINMAINTENANCE = 6; //代理维护中错误码
__reflect(LoginData.prototype, "LoginData");
//# sourceMappingURL=LoginData.js.map