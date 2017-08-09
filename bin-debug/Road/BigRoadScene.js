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
var BigRoadScene = (function (_super) {
    __extends(BigRoadScene, _super);
    function BigRoadScene(gridWidth, gridHeight, lineNum, columnNum) {
        if (columnNum === void 0) { columnNum = 6; }
        var _this = _super.call(this) || this;
        _this.gridWidth = 0;
        _this.gridHeight = 0;
        _this.lineNum = 0;
        _this.columnNum = 0;
        _this.roadView = new eui.Group();
        _this.bigRoad = new BigRoad();
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
    BigRoadScene.prototype.onAddedToStage = function () {
    };
    BigRoadScene.prototype.onRemovedFromStage = function () {
    };
    BigRoadScene.prototype.createSubView = function () {
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
    BigRoadScene.prototype.addWithString = function (aString) {
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
    BigRoadScene.prototype.addCircleView = function (road) {
        if (road.ties > 0 && this.roadView.numChildren > 0) {
            this.roadView.removeChildAt(this.roadView.numChildren - 1);
        }
        var circleView = new CircleView();
        circleView.x = this.gridWidth * road.currentX;
        circleView.y = this.gridHeight * road.currentY;
        circleView.width = this.gridWidth;
        circleView.height = this.gridHeight;
        circleView.customView(road.lastWay, road.ties, this.gridWidth, this.gridHeight);
        return circleView;
    };
    BigRoadScene.prototype.addNextString = function (way) {
        var next = new BigRoad();
        next = Global.deepCopy(this.bigRoad, next);
        var add = next.add(way);
        if (add > 0) {
            var circleView = this.addCircleView(next);
            egret.Tween.get(circleView, { loop: true }).to({ alpha: 0 }, 800, egret.Ease.quadInOut).to({ alpha: 1 }, 800, egret.Ease.quadInOut);
            egret.setTimeout(function () {
                this.roadView.removeChild(circleView);
            }, this, 2400);
            this.roadView.addChild(circleView);
        }
    };
    BigRoadScene.prototype.addWithOneCharacter = function (way) {
        var add = this.bigRoad.add(way);
        if (add > 0) {
            var circleView = this.addCircleView(this.bigRoad);
            this.roadView.addChild(circleView);
        }
    };
    BigRoadScene.prototype.clear = function () {
        this.roadView.removeChildren();
        this.bigRoad.clear();
    };
    BigRoadScene.prototype.moveAll = function () {
        this.roadView.x = this.bigRoad.currentX > this.lineNum - 2 ? (-(this.bigRoad.currentX - (this.lineNum - 2)) * this.gridWidth) : 0;
    };
    return BigRoadScene;
}(eui.Component));
__reflect(BigRoadScene.prototype, "BigRoadScene");
//# sourceMappingURL=BigRoadScene.js.map