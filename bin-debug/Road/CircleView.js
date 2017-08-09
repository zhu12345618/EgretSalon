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
var CircleView = (function (_super) {
    __extends(CircleView, _super);
    function CircleView() {
        var _this = _super.call(this) || this;
        _this.topLeftCorner = false;
        _this.bottomRightCorner = false;
        return _this;
    }
    Object.defineProperty(CircleView.prototype, "radius", {
        get: function () {
            return Math.min(this.height, this.width) * 0.45;
        },
        enumerable: true,
        configurable: true
    });
    //画圆环
    CircleView.prototype.addCircle = function (x, y, color) {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(2, color);
        if (this.ties == -1) {
            shp.graphics.beginFill(color, 2);
        }
        else {
            shp.graphics.beginFill(0, 0);
        }
        shp.graphics.drawCircle(x, y, this.radius);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    //画斜线
    CircleView.prototype.addObliqueLine = function (color) {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(1, color);
        shp.graphics.moveTo(0, this.width);
        shp.graphics.lineTo(this.width, 0);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    CircleView.prototype.addTieLabel = function (text) {
        var label = new eui.Label();
        label.text = text;
        label.size = this.width * 8 / 10;
        label.anchorOffsetX = this.width / 2;
        label.anchorOffsetY = label.size / 2;
        label.x = this.width / 2;
        label.y = this.height / 2;
        label.width = this.width;
        label.height = label.size;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalCenter = egret.VerticalAlign.MIDDLE;
        label.textColor = ColorType.color_green;
        this.addChild(label);
    };
    CircleView.prototype.customView = function (way, ties, width, height) {
        this.ties = ties;
        this.width = width;
        this.height = height;
        var oneMark = new eui.Image();
        var result = String.fromCharCode(way.charCodeAt(0) - 32);
        oneMark.texture = RES.getRes("BigRoad_" + result + "_png");
        oneMark.width = width;
        oneMark.height = height;
        this.addChild(oneMark);
        if (ties > 0) {
            this.addTieLabel(ties > 5 ? "5+" : ties.toString());
        }
    };
    CircleView.prototype.customViewOld = function (way, ties, width, height) {
        this.ties = ties;
        this.width = width;
        this.height = height;
        if (way >= "a" && way <= "d") {
            // 画庄  红
            this.addCircle(width / 2, width / 2, ColorType.color_red);
        }
        else if (way >= "e" && way <= "h") {
            //画闲   蓝
            this.addCircle(width / 2, width / 2, ColorType.color_blue);
        } //else if(way >= "i" && way <= "l") {
        //画和    数字
        if (ties > 0) {
            this.addTieLabel(ties > 5 ? "5+" : ties.toString());
        }
        var num = (way.charCodeAt(0) - 97) % 4;
        if (1 == num || 3 == num) {
            this.bottomRightCorner = true;
        }
        if (num > 1) {
            this.topLeftCorner = true;
        }
        if (this.topLeftCorner) {
            this.creatCircle(Math.PI / 4 * 5, ColorType.color_red);
        }
        if (this.bottomRightCorner) {
            this.creatCircle(Math.PI / 4, ColorType.color_blue);
        }
    };
    CircleView.prototype.customLineView = function (way, ties, width, height) {
        this.width = width;
        this.height = height;
        if (way >= "a" && way <= "d") {
            // 画庄  红
            this.addObliqueLine(ColorType.color_red);
        }
        else if (way >= "e" && way <= "h") {
            //画闲   蓝
            this.addObliqueLine(ColorType.color_blue);
        }
    };
    //画对子
    CircleView.prototype.creatCircle = function (angle, color) {
        var radius2 = this.height * 0.25;
        var x = this.width / 2 * (Math.cos(angle) + 1);
        var y = this.width / 2 * (Math.sin(angle) + 1);
        var shp = new egret.Shape();
        shp.graphics.lineStyle(1, 0xffffff);
        shp.graphics.beginFill(color, 5);
        shp.graphics.drawCircle(x, y, radius2);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    return CircleView;
}(egret.DisplayObjectContainer));
__reflect(CircleView.prototype, "CircleView");
var ColorType;
(function (ColorType) {
    ColorType[ColorType["color_green"] = 2607199] = "color_green";
    ColorType[ColorType["color_red"] = 15676946] = "color_red";
    ColorType[ColorType["color_blue"] = 3118585] = "color_blue";
    ColorType[ColorType["color_white"] = 16777215] = "color_white";
})(ColorType || (ColorType = {}));
//# sourceMappingURL=CircleView.js.map