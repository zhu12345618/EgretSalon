var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Lang = (function () {
    function Lang() {
    }
    Lang.setkind = function (kind) {
        Lang.kind = kind;
        setCookie("lANGUAGE", this.kind, 1);
    };
    Lang.init = function (kind) {
        // Lang.obj[kind] = RES.getRes(kind);
        this.obj = RES.getRes('Lang_json');
        this.setkind(kind);
    };
    //切换语言
    Lang.switchKind = function (kind) {
        // if (!Lang.obj[kind]) {
        // 	RES.getResAsync(kind, function (data, key) {
        // 		Lang.obj[kind] = data;
        // 		Lang.kind = kind;
        // 		EventPoster.getDispatcher().dispatchEventWith(MyEvent.LANG_CHANGE);
        // 		egret.log(Lang.getStr('login'));
        // 	}, this);
        // } else {
        // 	if (Lang.kind != kind) {
        // 		EventPoster.getDispatcher().dispatchEventWith(MyEvent.LANG_CHANGE);
        // 	}
        // }
    };
    Lang.changeLang = function (kind) {
        if (Lang.kind != kind) {
            this.setkind(kind);
            EventDispatcher.getInstance().dispatchEventWith(Events.CHANGE_LANGE);
        }
    };
    Lang.getStr = function (key) {
        //return Lang.Const[this.kind + key];
        return this.obj[this.kind][key];
    };
    return Lang;
}());
Lang.ZH = "ZH";
Lang.EN = "EN";
Lang.JA = "JA";
Lang.KO = "KR";
//当前语言类型
Lang.kind = "ZH";
Lang.obj = new Object();
__reflect(Lang.prototype, "Lang");
//# sourceMappingURL=Lang.js.map