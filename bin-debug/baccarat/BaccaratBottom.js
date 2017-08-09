/**
 * 百家乐底部
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaccaratBottom = (function (_super) {
    __extends(BaccaratBottom, _super);
    function BaccaratBottom() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BaccaratBottom.prototype.init = function () {
        this.initBg();
        this.initUserInfoGroup();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    BaccaratBottom.prototype.onAddtoStage = function (event) {
        EventDispatcher.getInstance().addEventListener(Events.UPDATE_VIRTUAL_TABLE, this.updateUserInfoGroup, this);
    };
    BaccaratBottom.prototype.onRemoveFromStage = function (event) {
        EventDispatcher.getInstance().removeEventListener(Events.UPDATE_VIRTUAL_TABLE, this.updateUserInfoGroup, this);
    };
    BaccaratBottom.prototype.initBg = function () {
        var bottomTexture = RES.getRes("baccaratBottomBg_png");
        var bottomBg = new eui.Image(bottomTexture);
        bottomBg.x = 10;
        bottomBg.width = 1116;
        bottomBg.height = 57;
        bottomBg.scale9Grid = new egret.Rectangle(135, 15, 15, 15);
        this.addChild(bottomBg);
    };
    BaccaratBottom.prototype.initUserInfoGroup = function () {
        this.userInfoGroup = new eui.Group();
        this.userInfoGroup.x = 130;
        this.addChild(this.userInfoGroup);
    };
    //更新虚拟桌
    BaccaratBottom.prototype.updateUserInfoGroup = function (event) {
        var table = event.data;
        this.userInfoGroup.removeChildren();
        function drawRect(x, y, width, height, color, alpha) {
            var rect = new egret.Shape();
            rect.graphics.beginFill(color, 0.1);
            rect.graphics.drawRect(x, y, width, height);
            rect.graphics.endFill();
            return rect;
        }
        function addLabel(y, width, height, text, color) {
            if (color === void 0) { color = 0xd8be72; }
            var label = new eui.Label(text);
            label.width = width;
            label.height = height / 2;
            label.anchorOffsetX = width / 2;
            label.anchorOffsetY = label.height / 2;
            label.textAlign = egret.HorizontalAlign.CENTER;
            label.verticalAlign = egret.VerticalAlign.MIDDLE;
            label.x = width / 2;
            label.y = y;
            label.textColor = color;
            label.size = 20;
            return label;
        }
        function addGroupBg(width, height) {
            var rect = new egret.Shape();
            rect.graphics.beginFill(0xf7d880, 0.21);
            rect.graphics.drawRect(0, 0, width, height);
            rect.graphics.endFill();
            return rect;
        }
        var grap = 10;
        var maxSeatNum = table.maxSeatNum;
        var width = (877 - 5 * grap) / maxSeatNum;
        var height = 56;
        for (var i = 0; i < maxSeatNum; i++) {
            var seat = table.seats[i + 1];
            if (seat.isSeat) {
                var group = new eui.Group();
                group.width = width;
                group.height = height;
                group.x = (seat.seatID - 1) * (width + grap);
                var isSelf = HallUserInfo.getInstance().getName() == seat.uname;
                var bgColor = isSelf ? 0xf7d880 : 0x827b00;
                var bgAlpha = isSelf ? 0.21 : 0.1;
                var color = isSelf ? 0xffecb6 : 0xd8be72;
                var name = isSelf ? seat.uname : this.textAbbreviation(seat.uname);
                var rect = drawRect(0, 0, width, height, bgColor, bgAlpha);
                var nameLabel = addLabel(height / 4, width, height, name, 0xffffff);
                var balanceLabel = addLabel(height * 3 / 4, width, height, seat.balance, color);
                group.addChild(rect);
                group.addChild(nameLabel);
                group.addChild(balanceLabel);
                this.userInfoGroup.addChild(group);
            }
        }
    };
    //将文本省略化
    BaccaratBottom.prototype.textAbbreviation = function (text) {
        var abbrText = text.substr(text.length - 2, text.length);
        return "***" + abbrText;
    };
    return BaccaratBottom;
}(eui.Component));
__reflect(BaccaratBottom.prototype, "BaccaratBottom");
//# sourceMappingURL=BaccaratBottom.js.map