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
var ZlRoadScene = (function (_super) {
    __extends(ZlRoadScene, _super);
    function ZlRoadScene(gridWidth, gridHeight, lineNum, columnNum) {
        if (columnNum === void 0) { columnNum = 6; }
        var _this = _super.call(this) || this;
        _this.gridWidth = 0;
        _this.gridHeight = 0;
        _this.lineNum = 0;
        _this.columnNum = 0;
        _this.ratio = 2;
        _this.roadView = new eui.Group();
        _this.bigRoad = new BigRoad();
        _this.zlRoad = new SmallRoad();
        _this.width = gridWidth * lineNum;
        _this.height = gridHeight * columnNum;
        _this.gridWidth = gridWidth;
        _this.gridHeight = gridHeight;
        _this.lineNum = lineNum;
        _this.columnNum = columnNum;
        _this.createSubView();
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }
    ;
    ZlRoadScene.prototype.onAddedToStage = function () {
    };
    ZlRoadScene.prototype.onRemovedFromStage = function () {
    };
    ZlRoadScene.prototype.createSubView = function () {
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
    ZlRoadScene.prototype.addWithString = function (aString) {
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
    ZlRoadScene.prototype.setRatio = function (ratio) {
        this.ratio = ratio;
    };
    ZlRoadScene.prototype.getNextCode = function (way) {
        var nextBig = new BigRoad();
        nextBig = Global.deepCopy(this.bigRoad, nextBig);
        var add = nextBig.add(way);
        var nextZlRoad = new SmallRoad();
        nextZlRoad = Global.deepCopy(this.zlRoad, nextZlRoad);
        if (nextZlRoad.addWithOne(nextBig.getZhanglangCode()) > 1) {
            if (nextZlRoad.lastWay >= "a" && nextZlRoad.lastWay <= "d") {
                return "a";
            }
            else if (nextZlRoad.lastWay >= "e" && nextZlRoad.lastWay <= "h") {
                return "e";
            }
        }
        return " ";
    };
    ZlRoadScene.prototype.addOneImage = function (road) {
        var oneMark = new eui.Image();
        oneMark.width = this.gridWidth / this.ratio;
        oneMark.height = this.gridHeight / this.ratio;
        oneMark.x = this.gridWidth / this.ratio * road.currentX;
        oneMark.y = this.gridHeight / this.ratio * road.currentY;
        var imageStr;
        if (road.lastWay >= "a" && road.lastWay <= "d") {
            // 画庄  红
            imageStr = "Cockcroach_A_png";
        }
        else if (road.lastWay >= "e" && road.lastWay <= "h") {
            //画闲   蓝
            imageStr = "Cockcroach_E_png";
        }
        oneMark.texture = RES.getRes(imageStr);
        return oneMark;
    };
    ZlRoadScene.prototype.addNextString = function (way) {
        var nextBig = new BigRoad();
        nextBig = Global.deepCopy(this.bigRoad, nextBig);
        var add = nextBig.add(way);
        var nextZlRoad = new SmallRoad();
        nextZlRoad = Global.deepCopy(this.zlRoad, nextZlRoad);
        if (add > 1 && nextZlRoad.addWithOne(nextBig.getZhanglangCode()) > 1) {
            var oneMark = this.addOneImage(nextZlRoad);
            egret.Tween.get(oneMark, { loop: true }).to({ alpha: 0 }, 800, egret.Ease.quadInOut).to({ alpha: 1 }, 800, egret.Ease.quadInOut);
            egret.setTimeout(function () {
                this.roadView.removeChild(oneMark);
            }, this, 2400);
            this.roadView.addChild(oneMark);
        }
    };
    ZlRoadScene.prototype.addWithOneCharacter = function (way) {
        var add = this.bigRoad.add(way);
        if (add > 1) {
            if (this.zlRoad.addWithOne(this.bigRoad.getZhanglangCode()) > 1) {
                var oneMark = this.addOneImage(this.zlRoad);
                this.roadView.addChild(oneMark);
            }
        }
    };
    ZlRoadScene.prototype.clear = function () {
        this.bigRoad.clear();
        this.zlRoad.clear();
        this.roadView.removeChildren();
    };
    ZlRoadScene.prototype.moveAll = function () {
        this.roadView.x = this.zlRoad.currentX > this.lineNum * this.ratio - 2 ?
            (-(this.zlRoad.currentX - this.lineNum * this.ratio + 2) * this.gridWidth / this.ratio) : 0;
    };
    return ZlRoadScene;
}(eui.Component));
__reflect(ZlRoadScene.prototype, "ZlRoadScene");
//# sourceMappingURL=ZlRoadScene.js.map