var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var MarkRoadScene = (function (_super) {
    __extends(MarkRoadScene, _super);
    function MarkRoadScene(gridWidth, gridHeight, lineNum, columnNum) {
        var _this = _super.call(this) || this;
        _this.gridWidth = 0;
        _this.gridHeight = 0;
        _this.lineNum = 0;
        _this.columnNum = 0;
        _this.markRoad = new MarkRoad();
        _this.roadView = new eui.Group();
        _this.labelArr = [];
        _this.width = gridWidth * lineNum;
        _this.height = gridHeight * columnNum;
        _this.gridWidth = gridWidth;
        _this.gridHeight = gridHeight;
        _this.lineNum = lineNum;
        _this.columnNum = columnNum;
        _this.initScene();
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddtoStage, _this);
        return _this;
    }
    ;
    MarkRoadScene.prototype.onAddtoStage = function () {
        EventDispatcher.getInstance().addEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    };
    MarkRoadScene.prototype.onRemoveFromStage = function () {
        EventDispatcher.getInstance().removeEventListener(Events.CHANGE_LANGE, this.updateLanguage, this);
    };
    MarkRoadScene.prototype.initScene = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
        this.addChild(this.roadView);
        var spMask = new egret.Rectangle(0, 0, this.gridWidth * this.lineNum, this.gridHeight * this.columnNum);
        this.mask = spMask;
        this.gridScene = new GridScene(this.gridWidth, this.gridHeight, this.lineNum, this.columnNum);
        ;
        this.gridScene.setDrawLine();
        this.addChild(this.gridScene);
    };
    /**
     * 设置游戏类型
     */
    MarkRoadScene.prototype.setGameType = function (gameType) {
        this.gameType = gameType;
    };
    MarkRoadScene.prototype.getGameType = function () {
        return this.gameType;
    };
    //根据字符来决定
    MarkRoadScene.prototype.addWithString = function (aString) {
        for (var i = 0; i < aString.length; i++) {
            if (aString[i] == "q") {
                this.clear();
                break;
            }
            else {
                this.addOneMark(aString[i]);
                ;
            }
        }
        this.moveAll();
    };
    MarkRoadScene.prototype.addOneMark = function (markResult) {
        this.markRoad.addOne();
        this.addWithOneCharacter(markResult, this.getCurrentRoadX(), this.getCurrentRoadY());
    };
    MarkRoadScene.prototype.addNextString = function (way) {
        var next = new MarkRoad();
        next = Global.deepCopy(this.markRoad, next);
        next.addOne();
        var oneMark = this.addWithOneCharacter(way, next.currentX, next.currentY);
        egret.Tween.get(oneMark, { loop: true }).to({ alpha: 0 }, 800, egret.Ease.quadInOut).to({ alpha: 1 }, 800, egret.Ease.quadInOut);
        egret.setTimeout(function () {
            this.roadView.removeChild(oneMark);
        }, this, 2400);
        this.roadView.addChild(oneMark);
    };
    MarkRoadScene.prototype.addWithOneCharacter = function (aCharacter, currentX, currentY) {
        var group = new eui.Group();
        group.x = currentX * this.gridWidth;
        group.y = currentY * this.gridHeight;
        var oneMark = new eui.Image();
        var result = String.fromCharCode(aCharacter.charCodeAt(0) - 32);
        oneMark.texture = RES.getRes("Bead_" + result + "_png");
        oneMark.width = this.gridWidth * 9 / 10;
        oneMark.height = this.gridHeight * 9 / 10;
        oneMark.anchorOffsetX = oneMark.width / 2;
        oneMark.anchorOffsetY = oneMark.height / 2;
        oneMark.x = this.gridWidth / 2;
        oneMark.y = this.gridHeight / 2;
        group.addChild(oneMark);
        var label = new eui.Label(Lang.getStr(this.getTextByResult(result)));
        label.size = this.gridWidth * 7 / 10;
        label.width = this.gridWidth;
        label.height = this.gridHeight;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        group.addChild(label);
        this.labelArr.push({ result: result, label: label });
        this.roadView.addChild(group);
        return group;
    };
    //更新所有路单的语言
    MarkRoadScene.prototype.updateLanguage = function () {
        for (var i = 0; i < this.labelArr.length; i++) {
            var element = this.labelArr[i];
            element.label.text = Lang.getStr(this.getTextByResult(element.result));
        }
    };
    MarkRoadScene.prototype.getTextByResult = function (result) {
        var num = result.charCodeAt(0) - 65;
        function baccarat() {
            if (num <= 3) {
                return "TEXT_BANKER_ICON";
            }
            else if (num > 3 && num <= 7) {
                return "TEXT_PLAYER_ICON";
            }
            else {
                return "TEXT_TIE_ICON";
            }
        }
        function longhu() {
            if (num <= 3) {
                return "TEXT_TIGER_ICON";
            }
            else if (num > 3 && num <= 7) {
                return "TEXT_DRAGON_ICON";
            }
            else {
                return "TEXT_TIE_ICON";
            }
        }
        switch (this.getGameType()) {
            case ProtobufManager.GameType.Baccarat:
                return baccarat();
            case ProtobufManager.GameType.LongHu:
                return longhu();
        }
    };
    /**
     * 用于问路
     */
    MarkRoadScene.prototype.getCurrentRoadX = function () {
        return this.markRoad.currentX;
    };
    MarkRoadScene.prototype.getCurrentRoadY = function () {
        return this.markRoad.currentY;
    };
    MarkRoadScene.prototype.clear = function () {
        this.roadView.removeChildren();
        this.markRoad.clear();
    };
    MarkRoadScene.prototype.moveAll = function () {
        this.roadView.x = this.markRoad.currentX > this.lineNum - 2 ? (-(this.markRoad.currentX - (this.lineNum - 2)) * this.gridWidth) : 0;
    };
    return MarkRoadScene;
}(eui.Component));
__reflect(MarkRoadScene.prototype, "MarkRoadScene");
//# sourceMappingURL=MarkRoadScene.js.map