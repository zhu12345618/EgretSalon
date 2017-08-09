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
var SmallRoadScene = (function (_super) {
    __extends(SmallRoadScene, _super);
    function SmallRoadScene(gridWidth, gridHeight, lineNum, columnNum) {
        if (columnNum === void 0) { columnNum = 6; }
        var _this = _super.call(this) || this;
        _this.gridWidth = 0;
        _this.gridHeight = 0;
        _this.lineNum = 0;
        _this.columnNum = 0;
        _this.ratio = 2;
        _this.roadView = new eui.Group();
        _this.bigRoad = new BigRoad();
        _this.smallRoad = new SmallRoad();
        _this.width = gridWidth * lineNum;
        _this.height = gridHeight * columnNum;
        _this.gridWidth = gridWidth;
        _this.gridHeight = gridHeight;
        _this.lineNum = lineNum;
        _this.columnNum = columnNum;
        _this.createSubView();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    ;
    SmallRoadScene.prototype.onAddedToStage = function () {
    };
    SmallRoadScene.prototype.onRemovedFromStage = function () {
    };
    SmallRoadScene.prototype.createSubView = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, this.width, this.height);
        bg.graphics.endFill();
        this.addChild(bg);
        this.addChild(this.roadView);
        var spMask = new egret.Rectangle(0, 0, this.gridWidth * this.lineNum, this.gridHeight * this.columnNum);
        this.mask = spMask;
        this.gridScene = new GridScene(this.gridWidth, this.gridHeight, this.lineNum, this.columnNum);
        this.gridScene.setDrawLine();
        this.addChild(this.gridScene);
    };
    //根据字符来决定
    SmallRoadScene.prototype.addWithString = function (aString) {
        for (var i = 0; i < aString.length; i++) {
            if (aString[i] == "q") {
                this.clear();
                break;
            }
            else {
                this.addWithOneCharacter(aString[i]);
            }
        }
        this.moveAll();
    };
    //设置图形和格子的比例
    SmallRoadScene.prototype.setRatio = function (ratio) {
        this.ratio = ratio;
    };
    SmallRoadScene.prototype.getNextCode = function (way) {
        var nextBig = new BigRoad();
        nextBig = Global.deepCopy(this.bigRoad, nextBig);
        var add = nextBig.add(way);
        var nextSmallRoad = new SmallRoad();
        nextSmallRoad = Global.deepCopy(this.smallRoad, nextSmallRoad);
        if (nextSmallRoad.addWithOne(nextBig.getSmallCode()) > 1) {
            if (nextSmallRoad.lastWay >= "a" && nextSmallRoad.lastWay <= "d") {
                return "a";
            }
            else if (nextSmallRoad.lastWay >= "e" && nextSmallRoad.lastWay <= "h") {
                return "e";
            }
        }
        return " ";
    };
    SmallRoadScene.prototype.addOneImage = function (road) {
        var oneMark = new eui.Image();
        oneMark.width = this.gridWidth / this.ratio;
        oneMark.height = this.gridHeight / this.ratio;
        oneMark.x = this.gridWidth / this.ratio * road.currentX;
        oneMark.y = this.gridHeight / this.ratio * road.currentY;
        var imageStr;
        if (road.lastWay >= "a" && road.lastWay <= "d") {
            // 画庄  红
            imageStr = "Bead_A_png";
        }
        else if (road.lastWay >= "e" && road.lastWay <= "h") {
            //画闲   蓝
            imageStr = "Bead_E_png";
        }
        oneMark.texture = RES.getRes(imageStr);
        return oneMark;
    };
    SmallRoadScene.prototype.addNextString = function (way) {
        var nextBig = new BigRoad();
        nextBig = Global.deepCopy(this.bigRoad, nextBig);
        var add = nextBig.add(way);
        var nextSmallRoad = new SmallRoad();
        nextSmallRoad = Global.deepCopy(this.smallRoad, nextSmallRoad);
        if (add > 1 && nextSmallRoad.addWithOne(nextBig.getSmallCode()) > 1) {
            var oneMark = this.addOneImage(nextSmallRoad);
            egret.Tween.get(oneMark, { loop: true }).to({ alpha: 0 }, 800, egret.Ease.quadInOut).to({ alpha: 1 }, 800, egret.Ease.quadInOut);
            egret.setTimeout(function () {
                this.roadView.removeChild(oneMark);
            }, this, 2400);
            this.roadView.addChild(oneMark);
        }
    };
    SmallRoadScene.prototype.addWithOneCharacter = function (way) {
        var add = this.bigRoad.add(way);
        if (add > 1) {
            var test = this.smallRoad.addWithOne(this.bigRoad.getSmallCode());
            if (test > 1) {
                var oneMark = this.addOneImage(this.smallRoad);
                this.roadView.addChild(oneMark);
            }
        }
    };
    SmallRoadScene.prototype.clear = function () {
        this.bigRoad.clear();
        this.smallRoad.clear();
        this.roadView.removeChildren();
    };
    SmallRoadScene.prototype.moveAll = function () {
        this.roadView.x = this.smallRoad.currentX > this.lineNum * this.ratio - 2 ?
            (-(this.smallRoad.currentX - (this.lineNum * this.ratio - 2)) * this.gridWidth / this.ratio) : 0;
    };
    return SmallRoadScene;
}(eui.Component));
__reflect(SmallRoadScene.prototype, "SmallRoadScene");
//# sourceMappingURL=SmallRoadScene.js.map