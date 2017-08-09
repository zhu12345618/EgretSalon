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
var GridScene = (function (_super) {
    __extends(GridScene, _super);
    function GridScene(gridWidth, gridHeight, lineNum, columnNum) {
        if (columnNum === void 0) { columnNum = 6; }
        var _this = _super.call(this) || this;
        _this.gridWidth = 0;
        _this.gridHeight = 0;
        _this.lineNum = 0;
        _this.columnNum = 0;
        _this.gridWidth = gridWidth;
        _this.gridHeight = gridHeight;
        _this.lineNum = lineNum;
        _this.columnNum = columnNum;
        _this.color = 0xaaaaaa;
        return _this;
    }
    GridScene.prototype.setDrawLine = function () {
        //画横线
        for (var i = 0; i <= this.columnNum; i++) {
            var shp = new egret.Shape();
            shp.graphics.lineStyle(1, this.color);
            shp.graphics.moveTo(0, this.gridHeight * i);
            shp.graphics.lineTo(this.gridWidth * this.lineNum, this.gridHeight * i);
            shp.graphics.endFill();
            this.addChild(shp);
        }
        //画竖线
        for (var i = 0; i <= this.lineNum; i++) {
            var shp = new egret.Shape();
            shp.graphics.lineStyle(1, this.color);
            shp.graphics.moveTo(this.gridWidth * i, 0);
            shp.graphics.lineTo(this.gridWidth * i, this.gridHeight * this.columnNum);
            shp.graphics.endFill();
            this.addChild(shp);
        }
    };
    return GridScene;
}(eui.Group));
__reflect(GridScene.prototype, "GridScene");
//# sourceMappingURL=GridScene.js.map