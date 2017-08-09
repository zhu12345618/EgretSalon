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
var BigRoad = (function (_super) {
    __extends(BigRoad, _super);
    function BigRoad() {
        var _this = _super.call(this) || this;
        _this.visualist = [];
        return _this;
    }
    BigRoad.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.listClear();
    };
    BigRoad.prototype.listClear = function () {
        var count = this.visualist.length;
        for (var i = 0; i < count; i++) {
            this.visualist.pop();
        }
    };
    //画个单路
    BigRoad.prototype.add = function (way) {
        var lastAdd = _super.prototype.addWithOne.call(this, way);
        if (lastAdd > 1 && this.listY < 100) {
            if (this.visualist.length <= this.listX) {
                this.visualist.push(this.listY + 1);
            }
            else {
                this.visualist[this.listX] = this.listY + 1;
            }
        }
        return lastAdd;
    };
    //遍历visuallist
    BigRoad.prototype.printVisuallist = function () {
        for (var i = 0; i < this.visualist.length; i++) {
            egret.log("visulaist[" + i + "] :" + this.visualist[i]);
        }
    };
    /**
     * 取鸡眼路代码
     * 圈, a红,e蓝
     * @return
     */
    BigRoad.prototype.getJiyanCode = function () {
        if (this.listX >= 1) {
            if (this.listX > 1 && this.listY == 0) {
                if (this.isSnap(2)) {
                    return "a";
                }
                else {
                    return "e";
                }
            }
            return this.subCode(1);
        }
        return "";
    };
    /**
     * 取小圆路代码
     * 点, a红,e蓝
     * @return
     */
    BigRoad.prototype.getSmallCode = function () {
        if (this.listX >= 2) {
            if (this.listX > 2 && this.listY == 0) {
                if (this.isSnap(3)) {
                    return "a";
                }
                else {
                    return "e";
                }
            }
            return this.subCode(2);
        }
        return " ";
    };
    /**
     * 取蟑螂路代码
     * 杠, a红,e蓝
     * @return
     */
    BigRoad.prototype.getZhanglangCode = function () {
        if (this.listX >= 3) {
            if (this.listX > 3 && this.listY == 0) {
                if (this.isSnap(4)) {
                    return "a";
                }
                else {
                    return "e";
                }
            }
            return this.subCode(3);
        }
        return " ";
    };
    BigRoad.prototype.subCode = function (columOff) {
        if (this.listY > 0 && this.listY < 100) {
            if (this.visualist[this.listX - columOff] >= this.listY + 1) {
                return "a";
            }
            else {
                if (this.visualist[this.listX - columOff] < this.listY - 1 + 1) {
                    return "a";
                }
                else {
                    return "e";
                }
            }
        }
        return " ";
    };
    //对比相隔的两列是否对齐,相隔数:鸡眼2,小路3,甲由4
    BigRoad.prototype.isSnap = function (columnOff) {
        return this.visualist[this.listX - 1] == this.visualist[this.listX - columnOff];
    };
    return BigRoad;
}(SmallRoad));
__reflect(BigRoad.prototype, "BigRoad");
//# sourceMappingURL=BigRoad.js.map