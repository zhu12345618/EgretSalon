var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅场景类
 */
var HallScene = (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/hallScene/HallSceneSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    HallScene.prototype.onAddtoStage = function (event) {
        EventDispatcher.getInstance().addEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
    };
    HallScene.prototype.onRemoveFromStage = function () {
        EventDispatcher.getInstance().removeEventListener(Events.ONCLICK_TOP_EXIT_BTN, this.getExitBtnEvent, this);
    };
    /**
     * 关闭大厅
     */
    HallScene.prototype.closeHall = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    //获取退出按钮事件
    HallScene.prototype.getExitBtnEvent = function () {
        GameServerManager.getInstance().lobbyLogout();
    };
    return HallScene;
}(eui.Component));
__reflect(HallScene.prototype, "HallScene");
//# sourceMappingURL=HallScene.js.map