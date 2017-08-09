var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 大厅选择游戏
 */
var SelectGameScene = (function (_super) {
    __extends(SelectGameScene, _super);
    function SelectGameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/hallScene/selectGame/SelectGameSceneSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        return _this;
    }
    SelectGameScene.prototype.onAddtoStage = function (event) {
        this.sicboEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterSicbo, this);
        this.rouletteEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoulette, this);
        this.dtEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterDragonTiger, this);
        this.baccaratEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBaccarat, this);
    };
    /**
     * 从舞台中移除自己
     */
    SelectGameScene.prototype.removeSelf = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**
     * 进入轮盘
     */
    SelectGameScene.prototype.enterSicbo = function () {
        this.removeSelf();
        ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.SicBo));
    };
    /**
     * 进入轮盘
     */
    SelectGameScene.prototype.enterRoulette = function () {
        this.removeSelf();
        ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Roulette));
    };
    /**
     * 进入百家乐
     */
    SelectGameScene.prototype.enterBaccarat = function () {
        this.removeSelf();
        ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.Baccarat));
    };
    /**
     * 进入龙虎
     */
    SelectGameScene.prototype.enterDragonTiger = function () {
        this.removeSelf();
        ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.LongHu));
    };
    /**
     * 进入番摊
     */
    SelectGameScene.prototype.enterFantan = function () {
        this.removeSelf();
        ViewZorderManager.getInstance().addChild(new BaccaratTableList(ProtobufManager.GameType.FanTan));
    };
    return SelectGameScene;
}(eui.Component));
__reflect(SelectGameScene.prototype, "SelectGameScene");
//# sourceMappingURL=SelectGameScene.js.map