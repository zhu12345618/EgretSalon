/**
 * 问路界面
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaccaratAskRoadLayer = (function (_super) {
    __extends(BaccaratAskRoadLayer, _super);
    function BaccaratAskRoadLayer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BaccaratAskRoadLayer.prototype.init = function () {
        function initGroup(result) {
            var group = new eui.Group();
            var bg = new eui.Image();
            group.addChild(bg);
            var text = "";
            if (result == "a") {
                bg.texture = RES.getRes("askRoadBankerBg_png");
                text = "TEXT_BANKER_ICON";
            }
            else {
                bg.texture = RES.getRes("askRoadPlayerBg_png");
                text = "TEXT_PLAYER_ICON";
            }
            var label = new eui.Label(Lang.getStr(text));
            label.name = "label";
            label.size = 20;
            label.x = 9;
            label.y = 5;
            group.addChild(label);
            var jyImage = new eui.Image();
            jyImage.name = "jy";
            jyImage.x = 7;
            jyImage.y = 30;
            group.addChild(jyImage);
            var smallImage = new eui.Image();
            smallImage.name = "small";
            smallImage.x = 7;
            smallImage.y = 60;
            group.addChild(smallImage);
            var zlImage = new eui.Image();
            zlImage.name = "zl";
            zlImage.x = 7;
            zlImage.y = 90;
            group.addChild(zlImage);
            return group;
        }
        this.bankerGroup = initGroup("a");
        this.bankerLabel = this.bankerGroup.getChildByName("label");
        this.bankerJy = this.bankerGroup.getChildByName("jy");
        this.bankerSmall = this.bankerGroup.getChildByName("small");
        this.bankerZl = this.bankerGroup.getChildByName("zl");
        this.addChild(this.bankerGroup);
        this.playerGroup = initGroup("e");
        this.playerGroup.y = 121;
        this.playerLabel = this.playerGroup.getChildByName("label");
        this.playerJy = this.playerGroup.getChildByName("jy");
        this.playerSmall = this.playerGroup.getChildByName("small");
        this.playerZl = this.playerGroup.getChildByName("zl");
        this.addChild(this.playerGroup);
    };
    BaccaratAskRoadLayer.prototype.setResult = function (result) {
        var jy = result[0];
        var small = result[1];
        var zl = result[2];
        console.info(jy, small, zl);
        switch (jy) {
            case "a":
                this.bankerJy.texture = RES.getRes("BigRoad_A_png");
                this.playerJy.texture = RES.getRes("BigRoad_E_png");
                break;
            case "e":
                this.bankerJy.texture = RES.getRes("BigRoad_E_png");
                this.playerJy.texture = RES.getRes("BigRoad_A_png");
                break;
        }
        switch (small) {
            case "a":
                this.bankerSmall.texture = RES.getRes("Bead_A_png");
                this.playerSmall.texture = RES.getRes("Bead_E_png");
                break;
            case "e":
                this.bankerSmall.texture = RES.getRes("Bead_E_png");
                this.playerSmall.texture = RES.getRes("Bead_A_png");
                break;
        }
        switch (zl) {
            case "a":
                this.bankerZl.texture = RES.getRes("Cockcroach_A_png");
                this.playerZl.texture = RES.getRes("Cockcroach_E_png");
                break;
            case "e":
                this.bankerZl.texture = RES.getRes("Cockcroach_E_png");
                this.playerZl.texture = RES.getRes("Cockcroach_A_png");
                break;
        }
    };
    return BaccaratAskRoadLayer;
}(eui.Component));
__reflect(BaccaratAskRoadLayer.prototype, "BaccaratAskRoadLayer");
//# sourceMappingURL=BaccaratAskRoadLayer.js.map