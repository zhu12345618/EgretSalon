var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * socket工具类
 */
var SocketUtils = (function () {
    function SocketUtils() {
    }
    return SocketUtils;
}());
__reflect(SocketUtils.prototype, "SocketUtils");
var SocketState;
(function (SocketState) {
    SocketState[SocketState["closeBySelf"] = 1] = "closeBySelf";
    SocketState[SocketState["closeError"] = 2] = "closeError";
    SocketState[SocketState["error"] = 3] = "error";
})(SocketState || (SocketState = {}));
//# sourceMappingURL=SocketUtils.js.map